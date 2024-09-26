import Breadcrumb, { BreadcrumbPath } from "../breadcrumb/Breadcrumb";
import { Heading } from "../typography";

interface BannerProps {
  title: string;
  subTitle: string;
  breadcrumb: BreadcrumbPath[];
}

const Banner: React.FC<BannerProps> = ({ title, subTitle, breadcrumb }) => {
  return (
    <div className="relative select-none">
      <img
        src={"/public/Paste Image.png"}
        alt="Banner Image"
        className="object-cover object-center w-full h-[400px]"
      />
      <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center gap-5 px-5 bg-transparent lg:gap-10">
        <Breadcrumb breadcrumbList={breadcrumb} />
        <Heading className="xl:text-5xl">{title}</Heading>
        <p>{subTitle}</p>
      </div>
    </div>
  );
};

export default Banner;
