import { useState } from "react";
import { BsFilterRight } from "react-icons/bs";
import SidebarFilter from "./SidebarFilter";
import { ProductCardList } from "@/components/productCardList";
import { productSellerList } from "@/data/productSellerList";
import { DropdownMenu } from "@/components/dropdownMenu";
import {
  dropdownList,
  dropdownListCategory,
  dropdownListMaterial,
  dropdownListPrice,
  dropdownListRating,
} from "@/constants/dataFilter";
import { Button } from "@/components/button";
import { Pagination } from "@/components/pagination";

const FilterProduct = () => {
  const [openSidebarFilter, setOpenSidebarFilter] = useState(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPage = 30;

  const handleSetPageNumberChange = (num: number) => {
    setCurrentPage(num);
  };

  const handleOpenSidebarFilter = () => {
    setOpenSidebarFilter(!openSidebarFilter);
  };

  return (
    <section>
      <div className="mt-10">
        <div
          onClick={handleOpenSidebarFilter}
          className="flex lg:hidden items-center text-gray-600 justify-between gap-2 text-base border-t-[2px] border-b-[2px] py-4 font-medium cursor-pointer transition-all duration-200 hover:text-gray-800"
        >
          <div className="flex items-center gap-1">
            <BsFilterRight className="text-xl" />
            <span>Sort & Filter</span>
          </div>
          <div>20 Results</div>
        </div>
      </div>
      <div className="items-start mt-10 lg:flex lg:gap-5">
        {/* Left side */}
        <div className="w-[300px] hidden lg:block">
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

          <div className="flex items-center gap-2 py-4">
            <Button
              size="lg"
              variant="ghost"
              className="text-sm underline cursor-pointer shrink-0"
            >
              Clear All
            </Button>
            <Button
              size="lg"
              className="w-full text-white bg-green-600 hover:bg-green-700 hover:border-green-700"
            >
              See Results
            </Button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-col flex-1 -mt-5">
          <div>
            <ProductCardList
              productList={productSellerList}
              productCount={12}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
            />
          </div>

          <div className="items-center justify-center hidden px-2 mt-8 md:flex">
            <Pagination
              currentPage={currentPage}
              totalPage={totalPage}
              onChangePageNumber={handleSetPageNumberChange}
            />
          </div>

          <div className="flex items-center justify-center px-2 mt-8 md:hidden">
            <Pagination
              currentPage={currentPage}
              totalPage={totalPage}
              onChangePageNumber={handleSetPageNumberChange}
            />
          </div>
        </div>
      </div>
      <SidebarFilter
        isOpen={openSidebarFilter}
        onClose={handleOpenSidebarFilter}
      />
    </section>
  );
};

export default FilterProduct;
