import React from "react";
import { cn } from "@/utils/cn";
import { IoClose } from "react-icons/io5";
import { ToolTip } from "../tooltip";

interface UploadAvatarUserProps {
  icon?: React.ReactNode;
  text?: React.ReactNode;
  className?: string;
  preview?: string;
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleResetUpload: () => void;
}

const UploadAvatarUser: React.FC<UploadAvatarUserProps> = ({
  icon,
  text,
  className,
  preview,
  handleFileSelect,
  handleResetUpload,
}) => {
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
            onChange={handleFileSelect}
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
        <div className="relative w-full h-full rounded-full group">
          <img
            src={preview}
            alt="Avatar preview"
            className="object-cover w-full h-full rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center transition-all duration-200 bg-black bg-opacity-0 rounded-full group-hover:bg-opacity-40">
            <ToolTip content="Remove Image">
              <button
                onClick={handleResetUpload}
                className="p-2 text-white transition-opacity duration-200 transform scale-95 bg-red-500 rounded-full opacity-0 top-2 group-hover:opacity-100 hover:bg-red-600 group-hover:scale-100"
                title="Remove avatar"
              >
                <IoClose size={20} />
              </button>
            </ToolTip>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadAvatarUser;
