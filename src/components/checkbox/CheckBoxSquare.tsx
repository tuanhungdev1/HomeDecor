import { TbSquareRounded } from "react-icons/tb";
import { BsCheckLg } from "react-icons/bs";

interface CheckBoxSquareProps {
  isSelected: boolean;
}

const CheckBoxSquare: React.FC<CheckBoxSquareProps> = ({ isSelected }) => {
  return (
    <div className="text-[15px] relative">
      <TbSquareRounded className="text-[25px]" />
      <BsCheckLg
        className={`absolute top-1/2 left-1/2 transition-all duration-200 -translate-x-1/2 -translate-y-1/2 ${
          isSelected ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />
    </div>
  );
};

export default CheckBoxSquare;
