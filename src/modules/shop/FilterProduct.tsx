import { useState } from "react";
import { BsFilterRight } from "react-icons/bs";
import SidebarFilter from "./SidebarFilter";

const FilterProduct = () => {
  const [openSidebarFilter, setOpenSidebarFilter] = useState(false);

  const handleOpenSidebarFilter = () => {
    setOpenSidebarFilter(!openSidebarFilter);
  };

  return (
    <section className="mt-10">
      {/* Left side */}
      <div>
        <div
          onClick={handleOpenSidebarFilter}
          className="flex items-center text-gray-600 justify-between gap-2 text-base border-t-[2px] border-b-[2px] py-4 font-medium cursor-pointer transition-all duration-200 hover:text-gray-800"
        >
          <div className="flex items-center gap-1">
            <BsFilterRight className="text-xl" />
            <span>Sort & Filter</span>
          </div>
          <div>20 Results</div>
        </div>
      </div>

      {/* Right Side */}
      <div>
        <div></div>
      </div>

      <SidebarFilter
        isOpen={openSidebarFilter}
        onClose={handleOpenSidebarFilter}
      />
    </section>
  );
};

export default FilterProduct;
