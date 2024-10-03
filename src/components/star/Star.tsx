import { cn } from "@/utils/cn";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
interface StarProps {
  filled: boolean;
  halfFilled: boolean;
  size?: "default" | "small";
  color?: string;
}

const Star: React.FC<StarProps> = ({
  filled,
  halfFilled,
  size = "default",
  color = "text-secondary-orange",
}) => {
  if (filled) {
    return (
      <FaStar
        className={cn(
          {
            "text-xl": size === "default",
            "text-sm": size === "small",
          },
          color
        )}
      />
    );
  } else if (halfFilled) {
    return (
      <FaStarHalfAlt
        className={cn(
          {
            "text-xl": size === "default",
            "text-sm": size === "small",
          },
          color
        )}
      />
    );
  } else {
    return (
      <FaRegStar
        className={cn(
          {
            "text-xl": size === "default",
            "text-sm": size === "small",
          },
          color
        )}
      />
    );
  }
};

export default Star;
