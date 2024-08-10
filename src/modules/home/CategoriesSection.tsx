import { Heading } from "@/layouts/typography";
import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";

const CategoriesSection = () => {
  return (
    <section className="grid grid-cols-1 grid-rows-4 gap-5 mt-14 md:grid-rows-2 h-[800px] md:h-[500px] lg:h-[600px] xl:[1200px] md:grid-cols-2">
      <div className="relative row-span-2 bg-secondary-gray">
        <div className="absolute flex flex-col top-6 left-7 ">
          <Heading className="xl:text-4xl">Living Room</Heading>
          <Link to={"/"} className="mt-3">
            <span className="flex items-center gap-2 text-lg font-normal underline xl:text-xl">
              Shop Now{" "}
              <span>
                <IoArrowForward />
              </span>
            </span>
          </Link>
        </div>
        <img
          src="/public/category1.png"
          alt=""
          className="object-contain w-full h-full"
        />
      </div>
      <div className="relative row-span-1 bg-secondary-gray">
        <div className="absolute flex flex-col bottom-7 left-7">
          <Heading className="text-[30px] xl:text-[40px]">Bedroom</Heading>
          <Link to={"/"} className="mt-1 xl:mt-4">
            <span className="flex items-center gap-2 text-lg font-normal underline xl:text-xl">
              Shop Now{" "}
              <span>
                <IoArrowForward />
              </span>
            </span>
          </Link>
        </div>
        <img
          src="/public/category2.png"
          alt=""
          className="object-contain w-full h-full"
        />
      </div>
      <div className="relative row-span-1 bg-secondary-gray">
        <div className="absolute flex flex-col bottom-7 left-7">
          <Heading className="text-[30px] xl:text-[40px]">Kitchen</Heading>
          <Link to={"/"} className="mt-1 xl:mt-4">
            <span className="flex items-center gap-2 text-lg font-normal underline xl:text-xl ">
              Shop Now{" "}
              <span>
                <IoArrowForward />
              </span>
            </span>
          </Link>
        </div>
        <img
          src="/public/category3.png"
          alt=""
          className="object-contain w-full h-full"
        />
      </div>
    </section>
  );
};

export default CategoriesSection;
