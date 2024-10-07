import { cn } from "@/utils/cn";
import { useState } from "react";
import { BlurImage } from "../blurImage";
import { IoClose } from "react-icons/io5";

interface UploadFileProps {
  icon?: React.ReactNode;
  text?: string;
  className?: string;
  onFileChange?: (file: File | null) => void;
}

const UploadFile: React.FC<UploadFileProps> = ({
  icon,
  text,
  className,
  onFileChange,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreview(fileUrl);
      onFileChange?.(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreview(null);
    onFileChange?.(null);

    if (preview) {
      URL.revokeObjectURL(preview);
    }
  };
  return (
    <>
      <div
        className={cn(
          "relative overflow-hidden flex hover:bg-slate-50 transition-all duration-200 items-center justify-center w-full h-full  border-gray-600",
          className
        )}
      >
        {!selectedFile ? (
          <>
            <input
              type="file"
              name="file"
              id="file"
              onChange={handleFileChange}
              accept=".jepg, .jpg, .png, .webp, .svg"
              className="absolute inset-0 z-50 w-full h-full rounded-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center gap-4">
              <div className="text-[90px]">{icon}</div>
              <span className="text-sm text-center">{text}</span>
            </div>
          </>
        ) : (
          <div className="relative w-full h-full">
            <BlurImage src={preview!} alt="Image Upload" />
            <button
              onClick={handleRemoveFile}
              className="absolute p-1 text-white bg-red-500 rounded-full top-2 right-2 hover:bg-red-600"
            >
              <IoClose size={20} />
            </button>
            
          </div>
        )}
      </div>
    </>
  );
};

export default UploadFile;
