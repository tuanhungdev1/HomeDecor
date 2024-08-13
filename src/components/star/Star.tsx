import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
interface StarProps {
  filled: boolean;
  halfFilled: boolean;
}

const Star: React.FC<StarProps> = ({ filled, halfFilled }) => {
  if (filled) {
    return <FaStar className="text-xl text-secondary-orange" />;
  } else if (halfFilled) {
    return <FaStarHalfAlt className="text-xl text-secondary-orange" />;
  } else {
    return <FaRegStar className="text-xl text-secondary-orange" />;
  }
};

export default Star;
