import { BsFilterRight } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
const FilterProduct = () => {
  return (
    <section className="mt-10">
      {/* Left side */}
      <div>
        <div className="flex items-center justify-between gap-2 text-xl border-t-[2px] border-b-[2px] py-3 font-medium cursor-pointer">
          <div className="flex gap-2">
            <BsFilterRight className="text-3xl" />
            <span>Filter</span>
          </div>
          <div>
            <IoIosArrowDown className="text-2xl" />
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div>
        <div></div>
      </div>
    </section>
  );
};

export default FilterProduct;
