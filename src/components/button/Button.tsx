import { cn } from "@/utils/cn";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      isLoading,
      variant = "default",
      size = "md",
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          "flex items-center justify-center font-medium rounded-lg transition-colors",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-black text-white hover:bg-gray-800": variant === "default",
            "border border-black text-black hover:bg-gray-100":
              variant === "outline",
            "text-black hover:bg-gray-100": variant === "ghost",
            "h-8 px-3 text-sm": size === "sm",
            "h-10 px-4": size === "md",
            "h-12 px-6 text-lg": size === "lg",
            "pointer-events-none": isLoading,
          },
          className
        )}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-current rounded-full border-t-transparent animate-spin" />
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
