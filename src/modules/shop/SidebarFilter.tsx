import React, { useEffect } from "react";
import { DropdownMenu } from "@/components/dropdownMenu";
import { IoCloseOutline } from "react-icons/io5";
import {
  dropdownList,
  dropdownListCategory,
  dropdownListMaterial,
  dropdownListPrice,
  dropdownListRating,
} from "@/constants/dataFilter";
import { ApplyButton } from "@/components/button";

interface SidebarFilterProp {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarFilter: React.FC<SidebarFilterProp> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div>
      <div
        className={`fixed top-0 bottom-0 bg-black z-50 transition-all duration-200 ease-in-out left-0 right-0 w-screen h-screen ${
          isOpen ? "opacity-50 z-40 visible" : "invisible opacity-0"
        }`}
        onClick={onClose}
      ></div>
      <div>
        <div
          className={`fixed top-0 bottom-0 flex flex-col  transition-all ease-in-out duration-300 right-0 z-[1000] w-[350px] md:w-[400px] lg:w-[50vw] xl:w-[30vw] 2xl:w-[25vw] h-screen bg-white ${
            isOpen ? "translate-x-0" : "translate-x-[100%]"
          }`}
        >
          <div className="relative border-b-[2px] flex items-center justify-between px-4 py-5 text-2xl font-medium text-gray-800">
            <IoCloseOutline
              className="text-3xl cursor-pointer"
              onClick={onClose}
            />
            <span className="absolute -translate-x-1/2 left-1/2">
              Sort & Filter
            </span>
          </div>

          <div className="flex-1 overflow-y-auto scroll-smooth">
            {/* Filter Sort */}
            <DropdownMenu
              title="Sort by"
              dropdownList={dropdownList}
              shape="circle"
            />
            {/* Price */}
            <DropdownMenu
              title="Price"
              dropdownList={dropdownListPrice}
              shape="circle"
            />

            {/* Category */}
            <DropdownMenu
              title="Category"
              dropdownList={dropdownListCategory}
              shape="square"
            />
            {/* Rating */}
            <DropdownMenu
              title="Customer Rating"
              dropdownList={dropdownListRating}
              shape="circle"
            />

            {/* Material */}
            <DropdownMenu
              title="Frame Material"
              dropdownList={dropdownListMaterial}
              shape="circle"
            />
          </div>
          <div className="flex items-center gap-4 px-4 py-4 border-t-[2px]">
            <span className="text-sm underline cursor-pointer shrink-0">
              Clear All
            </span>
            <ApplyButton
              className="text-white bg-green-600 hover:bg-green-700 hover:border-green-700"
              title="See Results"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarFilter;
