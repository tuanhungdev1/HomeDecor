import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface DropdownItem {
  id: number;
  title: string;
  value: string;
}

const dropdownList: DropdownItem[] = [
  {
    id: 1,
    title: "Recommended",
    value: "recommended",
  },
  {
    id: 2,
    title: "Customer Rating",
    value: "rating",
  },
  {
    id: 3,
    title: "Price (Low to High)",
    value: "asc",
  },
  {
    id: 4,
    title: "Price (High to Low)",
    value: "desc",
  },
];

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<DropdownItem | null>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  const handleSelectedValue = (item: DropdownItem) => {
    setSelectedValue(item);
  };

  const handleOpenDropdownMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="px-4 select-none py-3 border-t-[2px] border-b-[2px] text-lg">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={handleOpenDropdownMenu}
      >
        <div className="flex flex-col">
          <span>Sort by</span>
          <span className="text-base text-green-600">
            {selectedValue?.title}
          </span>
        </div>
        <IoIosArrowDown
          className={`text-xl transition-all ease-in-out duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      <div
        className={`w-full overflow-hidden transition-all  duration-300 ease-in-out `}
        style={{ height: isOpen ? `${contentHeight}px` : "0px" }}
      >
        <div ref={contentRef} className="py-4">
          <div className="flex flex-col gap-2 text-lg">
            {dropdownList.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectedValue(item)}
                className={`transition-all duration-200 cursor-pointer hover:text-green-700 ${
                  item.id === selectedValue?.id ? "text-green-700" : ""
                }`}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
