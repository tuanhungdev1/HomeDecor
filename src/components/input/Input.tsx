import React from "react";
import { useField } from "formik";
import { cn } from "@/utils/cn";
import { ErrorMessage } from "../errorMessage";

type InputVariant = "outline" | "filled" | "underline";
type InputSize = "sm" | "md" | "lg";
type InputColor = "primary" | "secondary" | "success" | "warning" | "error";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  icon?: React.ReactNode;
  width?: string;
  variant?: InputVariant;
  sizeInput?: InputSize;
  color?: InputColor;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      icon,
      width,
      variant = "outline",
      sizeInput = "md",
      color = "primary",
      ...props
    },
    ref
  ) => {
    const [field, meta] = useField(props.name);
    const hasError = meta.touched && meta.error;

    return (
      <div className={cn("relative", width)}>
        {label && (
          <label
            htmlFor={props.id || props.name}
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            {...field}
            {...props}
            className={cn(
              "w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:border-none",
              // Variant styles
              variant === "filled" &&
                "bg-gray-100 border-transparent focus:bg-white",
              variant === "underline" &&
                "border-b border-gray-300 rounded-none px-0",
              variant === "outline" && "bg-white border-gray-600 border-[2px]",
              // Size styles
              sizeInput === "sm" && "py-1 px-2 text-sm",
              sizeInput === "lg" && "py-3 px-4 text-lg",
              sizeInput === "md" && "py-2 px-3 text-base",
              // Color styles based on error state
              hasError
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : color === "secondary" &&
                    "focus:border-purple-500 focus:ring-purple-500",
              color === "success" &&
                "focus:border-green-500 focus:ring-green-500",
              color === "warning" &&
                "focus:border-yellow-500 focus:ring-yellow-500",
              color === "error" && "focus:border-red-500 focus:ring-red-500",
              color === "primary" &&
                !hasError &&
                "focus:border-blue-500 focus:ring-blue-500",
              {
                "pl-14": icon,
                "bg-gray-100 text-gray-500": props.disabled,
              },
              className
            )}
          />
        </div>
        {hasError && <ErrorMessage message={meta.error!} />}
      </div>
    );
  }
);

export default Input;
