import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { DropdownItem } from "../dropdownItem";
import { RangePrice } from "../rangePrice";

export interface DropdownItemType {
  id: number;
  title: string;
  value: string;
}

interface DropdownMenuProps {
  title: string;
  dropdownList: DropdownItemType[];
  shape?: "square" | "circle";
  isScroll?: boolean;
  maxHeight?: number;
  children?: React.ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  title,
  dropdownList,
  shape = "square",
  isScroll = false,
  maxHeight = 500,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<DropdownItemType[]>([]);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  const handleSelectedValue = (
    item: DropdownItemType,
    shape: "square" | "circle"
  ) => {
    if (shape === "circle") {
      const isExistItem = selectedValue.some(
        (dropdownItem) => dropdownItem.id === item.id
      );

      if (isExistItem) {
        setSelectedValue([]);
      } else {
        setSelectedValue([item]);
      }
    } else if (shape === "square") {
      const isExistItem = selectedValue.some(
        (dropdownItem) => dropdownItem.id === item.id
      );

      if (isExistItem) {
        setSelectedValue([
          ...selectedValue.filter(
            (dropdownItem) => dropdownItem.id !== item.id
          ),
        ]);
      } else {
        setSelectedValue([...selectedValue, item]);
      }
    }
  };

  const handleOpenDropdownMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="select-none border-b-[2px] text-base">
      <div
        className="flex items-center justify-between px-4 py-5 transition-all duration-200 cursor-pointer hover:bg-secondary-gray"
        onClick={handleOpenDropdownMenu}
      >
        <div className={`flex flex-col overflow-hidden`}>
          <span className="flex items-center gap-1">
            {title}{" "}
            {`${selectedValue.length > 0 ? `(${selectedValue.length})` : ""}`}
            {selectedValue.length > 0 && (
              <span className="w-[8px] h-[8px] rounded-full bg-green-600"></span>
            )}
          </span>
          <span
            className={`text-sm transition-all duration-200 text-green-600 ${
              selectedValue.length > 0
                ? "opacity-100 visible"
                : "opacity-0 invisible"
            }`}
          >
            {selectedValue.map((item) => item.title).join(", ")}
          </span>
        </div>
        <IoIosArrowDown
          className={`text-xl transition-all ease-in-out duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      <div
        className={`w-full px-3 overflow-hidden transition-all  duration-300 ease-in-out ${
          isScroll && isOpen ? "overflow-y-auto" : ""
        }`}
        style={{
          height: isOpen ? `${contentHeight}px` : "0px",
          maxHeight: isScroll ? `${maxHeight}px` : "none",
        }}
      >
        <div ref={contentRef} className="py-6">
          {title === "Price" && (
            <div className="mb-6">
              <RangePrice />
            </div>
          )}
          <div className="flex flex-col gap-4 text-base">
            {dropdownList.map((item) => (
              <DropdownItem
                dropdownItem={item}
                key={item.id}
                onSelected={handleSelectedValue}
                shape={shape}
                selectedValue={selectedValue}
                numberStar={
                  title === "Customer Rating"
                    ? Number.parseInt(item.title.split(" ")[0])
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
