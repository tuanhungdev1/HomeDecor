import { CheckBoxCircle, CheckBoxSquare } from "../checkbox";
import { DropdownItemType } from "../dropdownMenu/DropdownMenu";

interface DropdownItemProps {
  dropdownItem: DropdownItemType;
  selectedValue: DropdownItemType[];
  onSelected: (item: DropdownItemType, shape: "square" | "circle") => void;
  shape?: "square" | "circle";
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  dropdownItem,
  selectedValue,
  onSelected,
  shape = "square",
}) => {
  if (shape === "circle")
    return (
      <div
        key={dropdownItem.id}
        onClick={() => onSelected(dropdownItem, "circle")}
        className={`transition-all duration-200 flex gap-3 items-center cursor-pointer hover:text-green-700 ${
          dropdownItem.id === selectedValue[0].id ? "text-green-700" : ""
        }`}
      >
        <CheckBoxCircle isSelected={dropdownItem.id === selectedValue[0].id} />
        {dropdownItem.title}
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
        {dropdownItem.title}
      </div>
    );
};

export default DropdownItem;
