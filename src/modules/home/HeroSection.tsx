import { ImageSlide } from "@/components/imageSlide";
import { Heading } from "@/layouts/typography";

const HeroSection = () => {
  return (
    <section>
      <ImageSlide />
      <div>
        <div className="flex flex-col justify-between gap-8 mt-8 md:items-center md:flex-row">
          <div className="items-start flex-1 ">
            <div className="flex justify-start">
              <Heading className="text-5xl xl:text-6xl">
                Simply Unique
                <span className="text-5xl font-medium text-gray-500 xl:text-6xl">
                  /
                </span>
              </Heading>
            </div>
            <div className="flex items-center mt-2">
              <Heading className="text-5xl xl:text-6xl">Simply Better</Heading>
              <span className="text-5xl font-medium text-gray-500">.</span>
            </div>
          </div>

          <div className="flex items-center justify-center flex-1 gap-1">
            <span className="text-base text-gray-400 xl:text-xl">
              <span className="font-medium text-primary">HomeDecor. </span>
              is a gift & decorations store based in HCMC, Vietnam. Est since
              2019.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
