import { CheckBoxCircle, CheckBoxSquare } from "../checkbox";
import { DropdownItemType } from "../dropdownMenu/DropdownMenu";
import { Rate } from "../rate";

interface DropdownItemProps {
  dropdownItem: DropdownItemType;
  selectedValue: DropdownItemType[];
  onSelected: (item: DropdownItemType, shape: "square" | "circle") => void;
  shape?: "square" | "circle";
  numberStar?: number;
  children?: React.ReactNode;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  dropdownItem,
  selectedValue,
  onSelected,
  shape = "square",
  numberStar,
}) => {
  if (shape === "circle")
    return (
      <div
        key={dropdownItem.id}
        onClick={() => onSelected(dropdownItem, "circle")}
        className={`transition-all duration-200 flex gap-3 items-center cursor-pointer hover:text-green-700 ${
          selectedValue.length > 0 && dropdownItem.id === selectedValue[0].id
            ? "text-green-700"
            : ""
        }`}
      >
        <CheckBoxCircle
          isSelected={
            selectedValue.length > 0 &&
            selectedValue.some((item) => item.id === dropdownItem.id)
          }
        />
        {numberStar && <Rate numberRate={numberStar} />}

        {!numberStar
          ? dropdownItem.title
          : ` ${dropdownItem.title.split(" ").slice(2).join(" ")}`}
      </div>
    );
  else if (shape === "square")
    return (
      <div
        key={dropdownItem.id}
        onClick={() => onSelected(dropdownItem, "square")}
        className={`transition-all duration-200 flex gap-3 items-center cursor-pointer hover:text-green-700 ${
          selectedValue.length > 0 &&
          selectedValue.some((item) => item.id === dropdownItem.id)
            ? "text-green-700"
            : ""
        }`}
      >
        <CheckBoxSquare
          isSelected={selectedValue.some((item) => item.id === dropdownItem.id)}
        />
        {numberStar &&
          <Rate numberRate={numberStar} /> +
            `${dropdownItem.title.split(" ").slice(2).join(" ")}`}
        {!numberStar && dropdownItem.title}
      </div>
    );
};

export default DropdownItem;
