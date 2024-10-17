import { useState, useCallback } from "react";
import { userService } from "@/services/userService";
import { getUserId } from "@/utils/authHelper";

interface UploadOptions {
  maxSize?: number;
  allowedFormats?: string[];
  apiUrl?: string;
}

interface UploadHookReturn {
  selectedFiles: File[];
  previewUrls: string[];
  uploadSingleFile: (file: File) => Promise<void>;
  uploadMultipleFiles: (files: File[]) => Promise<void>;
  isValidFile: (file: File) => boolean;
  uploadStatus: string;
  resetUpload: () => void;
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const useFileUpload = (options: UploadOptions): UploadHookReturn => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const isValidFile = useCallback(
    (file: File): boolean => {
      if (options.maxSize && file.size > options.maxSize) {
        setUploadStatus(`File ${file.name} vượt quá kích thước cho phép.`);
        return false;
      }
      if (
        options.allowedFormats &&
        !options.allowedFormats.includes(file.type)
      ) {
        setUploadStatus(`File ${file.name} không đúng định dạng cho phép.`);
        return false;
      }
      return true;
    },
    [options.maxSize, options.allowedFormats]
  );

  const uploadFile = async (formData: FormData) => {
    try {
      const userId = getUserId();
      if (!userId) {
        throw Error("Không tìm thấy USER ID");
      }
      const response = await userService.uploadFileUserAvatar(userId, formData);
      setUploadStatus("Upload thành công");
      console.log(response.data);
    } catch (error) {
      setUploadStatus("Upload thất bại");
      console.error("Lỗi khi upload:", error);
    }
  };

  const uploadSingleFile = async (file: File) => {
    if (!isValidFile(file)) return;

    const formData = new FormData();
    formData.append("file", file);
    await uploadFile(formData);
  };

  const uploadMultipleFiles = async (files: File[]) => {
    const validFiles = files.filter(isValidFile);
    if (validFiles.length === 0) {
      setUploadStatus("Không có file hợp lệ để upload");
      return;
    }

    const formData = new FormData();
    validFiles.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });
    await uploadFile(formData);
  };

  const resetUpload = useCallback(() => {
    setSelectedFiles([]);
    setPreviewUrls([]);

    setUploadStatus("");
  }, []);

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);
      const validFiles = files.filter(isValidFile);

      setSelectedFiles(validFiles);

      // Create preview URLs for images
      const newPreviewUrls = validFiles.map((file) => {
        if (file.type.startsWith("image/")) {
          return URL.createObjectURL(file);
        }
        return "";
      });

      setPreviewUrls((prevUrls) => {
        // Revoke old URLs to avoid memory leaks
        prevUrls.forEach((url) => URL.revokeObjectURL(url));
        return newPreviewUrls;
      });
    },
    [isValidFile]
  );

  return {
    selectedFiles,
    previewUrls,
    uploadSingleFile,
    uploadMultipleFiles,
    isValidFile,

    uploadStatus,
    resetUpload,
    handleFileSelect,
  };
};

export default useFileUpload;
