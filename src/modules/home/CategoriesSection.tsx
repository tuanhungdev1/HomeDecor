import { LinkTo } from "@/components/linkTo";
import { Heading } from "@/components/typography";

const CategoriesSection = () => {
  return (
    <section className="grid grid-cols-1 grid-rows-4 gap-5 mt-14 md:grid-rows-2 h-[800px] md:h-[500px] lg:h-[600px] xl:[1200px] md:grid-cols-2">
      <div className="relative row-span-2 bg-secondary-gray">
        <div className="absolute flex flex-col gap-2 top-6 left-7">
          <Heading className="xl:text-4xl">Living Room</Heading>

          <LinkTo url="/" className="flex items-center gap-2 text-lg ">
            Shop Now
          </LinkTo>
        </div>
        <img
          src="/public/category1.png"
          alt=""
          className="object-contain w-full h-full"
        />
      </div>
      <div className="relative row-span-1 bg-secondary-gray">
        <div className="absolute flex flex-col gap-3 bottom-7 left-7">
          <Heading className="text-[30px] xl:text-[40px]">Bedroom</Heading>
          <LinkTo url="/" className="flex items-center gap-2 text-lg ">
            Shop Now
          </LinkTo>
        </div>
        <img
          src="/public/category2.png"
          alt=""
          className="object-contain w-full h-full"
        />
      </div>
      <div className="relative row-span-1 bg-secondary-gray">
        <div className="absolute flex flex-col gap-3 bottom-7 left-7">
          <Heading className="text-[30px] xl:text-[40px]">Kitchen</Heading>
          <LinkTo url="/" className="flex items-center gap-2 text-lg ">
            Shop Now
          </LinkTo>
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
