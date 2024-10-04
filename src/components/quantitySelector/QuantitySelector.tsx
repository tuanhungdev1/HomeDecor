import { cn } from "@/utils/cn";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { RiSubtractLine } from "react-icons/ri";

interface QuantitySelectorProps {
  initialNumber?: number;
  variant?: "outline" | "filled";
  className?: string;
  size?: "sm" | "md" | "lg";
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  initialNumber,
  variant = "outline",
  className,
  size = "sm", // default là sm
}) => {
  const [quantity, setQuantity] = useState(initialNumber ?? 1);

  const increment = () => setQuantity((prev) => prev + 1);

  const decrement = () => setQuantity((prev) => Math.max(prev - 1, 1));

  // Kích thước tương ứng với các biến size (sm, md, lg)
  const sizeClasses = {
    sm: "w-[30px] h-[30px] text-sm", // Small size
    md: "w-[40px] h-[40px] text-base", // Medium size
    lg: "w-[50px] h-[50px] text-lg", // Large size
  };

  return (
    <div
      className={cn(
        "items-center flex rounded-md overflow-hidden select-none w-min",
        {
          "border-[2px] border-gray-400": variant === "outline",
          "bg-slate-100": variant === "filled",
        },
        className
      )}
    >
      {/* Nút giảm số lượng */}
      <div
        onClick={decrement}
        className={cn(
          "flex items-center justify-center cursor-pointer transition-all duration-200",
          {
            "hover:bg-gray-100": variant === "outline",
            "hover:bg-slate-200": variant === "filled",
          },
          sizeClasses[size] // Áp dụng kích thước dựa trên size prop
        )}
      >
        <RiSubtractLine />
      </div>

      {/* Hiển thị số lượng */}
      <span
        className={cn(
          "text-center flex items-center justify-center",
          sizeClasses[size]
        )}
      >
        {quantity}
      </span>

      {/* Nút tăng số lượng */}
      <div
        onClick={increment}
        className={cn(
          "flex items-center justify-center cursor-pointer transition-all duration-200",
          {
            "hover:bg-gray-100": variant === "outline",
            "hover:bg-slate-200": variant === "filled",
          },
          sizeClasses[size] // Áp dụng kích thước dựa trên size prop
        )}
      >
        <GoPlus />
      </div>
    </div>
  );
};

export default QuantitySelector;
