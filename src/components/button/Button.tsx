import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  className = "",
  disabled = false,
  children,
}) => {
  return (
    <button
      type={type}
      className={`w-full bg-black text-white p-3 font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
