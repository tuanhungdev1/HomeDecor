import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  className = "",
  disabled = false,
  children,
  onClick,
  isLoading = false,
}) => {
  return (
    <button
      type={type}
      className={`w-full flex items-center ${
        isLoading ? "pointer-events-none bg-gray-800" : ""
      } justify-center bg-black text-white h-[50px] p-3 font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {isLoading ? (
        <div className="bg-transparent w-[25px] h-[25px] border-[3px] border-t-transparent animate-spin rounded-full"></div>
      ) : (
        <span>{children}</span>
      )}
    </button>
  );
};

export default Button;
