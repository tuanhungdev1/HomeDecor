import { cn } from "@/utils/cn";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { RiSubtractLine } from "react-icons/ri";

interface QuantitySelectorProps {
  initialNumber?: number;
  variant?: "outline" | "filled";
  className?: string;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  initialNumber,
  variant = "outline",
  className,
}) => {
  const [quantity, setQuantity] = useState(initialNumber ?? 1);

  const increment = () => setQuantity((prev) => prev + 1);

  const decrement = () => setQuantity((prev) => Math.max(prev - 1, 1));

  return (
    <div
      className={cn(
        "items-center w-min flex rounded-md overflow-hidden",
        {
          "border-[2px] border-gray-400": variant === "outline",
          "bg-slate-100": variant === "filled",
        },
        className
      )}
    >
      <div
        onClick={decrement}
        className={cn(
          "w-[30px] h-[30px] xl:w-[40px] xl:h-[40px] flex items-center justify-center cursor-pointer  transition-all duration-200 ",
          {
            "hover:bg-gray-100": variant === "outline",
            "hover:bg-slate-200": variant === "filled",
          }
        )}
      >
        <GoPlus />
      </div>
      <span className="w-8 text-center xl:">{quantity}</span>
      <div
        onClick={increment}
        className={cn(
          "w-[30px] h-[30px] xl:w-[40px] xl:h-[40px] flex items-center justify-center cursor-pointer  transition-all duration-200 ",
          {
            "hover:bg-gray-100": variant === "outline",
            "hover:bg-slate-200": variant === "filled",
          }
        )}
      >
        <RiSubtractLine />
      </div>
    </div>
  );
};

export default QuantitySelector;
