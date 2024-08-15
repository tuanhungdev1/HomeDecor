import { Heading } from "@/components/typography";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";

const BannerSection = () => {
  return (
    <div className="relative left-[50%] right-[50%] mx-[-50vw] w-screen max-w-[100vw] overflow-hidden select-none">
      <section className="relative flex flex-col w-full mt-10 mb-5 lg:flex-row">
        <div className="h-[450px] md:h-[500px] lg:flex-1 flex lg:h-[600px]">
          <img
            src="/public/banner1.png"
            alt="banner"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="h-[450px] lg:flex-1 md:h-[600px] lg:h-[600px] bg-secondary-gray flex justify-center gap-5 flex-col">
          <div className="flex flex-col gap-6 px-10 xl:px-16 lg:px-10 md:px-20">
            <span className="text-xl font-semibold md:text-4xl lg:text-2xl xl:text-4xl text-secondary-blue">
              SALE UP TO 35% OFF
            </span>
            <Heading className="text-[40px] xl:text-[50px] md:text-[60px] 2xl:text-[70px] lg:text-[50px] leading-[1.2]">
              HUNDREDS of New lower prices!
            </Heading>
            <span className="text-lg text-gray-600 md:text-xl lg:text-lg xl:text-xl">
              It’s more affordable than ever to give every room in your home a
              stylish makeover
            </span>

            <Link
              to={"/"}
              className="flex items-center gap-2 text-lg font-medium underline md:text-2xl"
            >
              <span>Shop Now</span>
              <span>
                <HiArrowRight />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BannerSection;
