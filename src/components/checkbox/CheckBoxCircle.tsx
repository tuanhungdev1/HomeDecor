import { GoCircle } from "react-icons/go";

interface CheckBoxCricleProps {
  isSelected: boolean;
}

const CheckBoxCircle: React.FC<CheckBoxCricleProps> = ({ isSelected }) => {
  return (
    <div className="text-[25px] relative">
      <GoCircle className="" />
      <div
        className={`w-[15px] transition-all duration-200 h-[15px] absolute bg-green-600 top-1/2 rounded-full left-1/2 -translate-x-1/2 -translate-y-1/2 ${
          isSelected ? "visible opacity-100" : "invisible opacity-0"
        }`}
      ></div>
    </div>
  );
};

export default CheckBoxCircle;
