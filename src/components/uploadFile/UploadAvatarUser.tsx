import { cn } from "@/utils/cn";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast, Toaster } from "react-hot-toast";
import { ToolTip } from "../tooltip";

interface UploadAvatarUserProps {
  icon?: React.ReactNode;
  text?: React.ReactNode;
  className?: string;
  onFileChange?: (file: File | null) => void;
  currentAvatar?: string;
}

const UploadAvatarUser: React.FC<UploadAvatarUserProps> = ({
  icon,
  text,
  className,
  onFileChange,
  currentAvatar,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(currentAvatar || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size should be less than 2MB");
        return;
      }

      setSelectedFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreview(fileUrl);
      onFileChange?.(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreview(currentAvatar || null);
    onFileChange?.(null);
    if (preview && preview !== currentAvatar) {
      URL.revokeObjectURL(preview);
    }
    toast.success("Avatar removed successfully");
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden aspect-square rounded-full",
        "border-2 border-dashed border-gray-300 hover:border-gray-400",
        "transition-all duration-200",
        className
      )}
    >
      {!preview ? (
        // Upload State
        <div className="absolute flex items-center justify-center w-full h-full rounded-full">
          <input
            type="file"
            name="avatar"
            id="avatar"
            accept="image/*"
            className="absolute z-10 w-full h-full rounded-full opacity-0 cursor-pointer"
            onChange={handleFileChange}
          />
          <div className="flex flex-col items-center gap-2">
            <div className="text-4xl text-gray-500">{icon}</div>
            {text && (
              <span className="text-sm text-center text-gray-500">{text}</span>
            )}
          </div>
        </div>
      ) : (
        // Preview State
        selectedFile && (
          <div className="relative w-full h-full rounded-full group">
            {/* Avatar Preview */}
            <img
              src={preview}
              alt="Avatar preview"
              className="object-cover w-full h-full rounded-full"
            />

            {/* Hover Overlay with Delete Icon */}
            <div className="absolute inset-0 flex items-center justify-center transition-all duration-200 bg-black bg-opacity-0 rounded-full group-hover:bg-opacity-40">
              {/* Delete Button - Only shows on hover */}
              <ToolTip content="Remove Image">
                <button
                  onClick={handleRemoveFile}
                  className="p-2 text-white transition-opacity duration-200 transform scale-95 bg-red-500 rounded-full opacity-0 top-2 group-hover:opacity-100 hover:bg-red-600 group-hover:scale-100"
                  title="Remove avatar"
                >
                  <IoClose size={20} />
                </button>
              </ToolTip>
            </div>
          </div>
        )
      )}
      <Toaster />
    </div>
  );
};

export default UploadAvatarUser;
