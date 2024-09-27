import React, { useEffect } from "react";
import { DropdownMenu } from "@/components/dropdownMenu";
import { IoCloseOutline } from "react-icons/io5";

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
    <div
      className={`fixed top-0 bottom-0 left-0 transition-all ease-in-out duration-200 right-0 z-50 w-screen h-screen bg-white ${
        isOpen ? "translate-x-0" : "translate-x-[100%]"
      }`}
    >
      <div className="relative flex items-center justify-between px-4 py-5 text-2xl font-medium text-gray-800">
        <IoCloseOutline className="text-3xl cursor-pointer" onClick={onClose} />
        <span className="absolute -translate-x-1/2 left-1/2">
          Sort & Filter
        </span>
      </div>

      {/* Filter */}
      <DropdownMenu />
    </div>
  );
};

export default SidebarFilter;
