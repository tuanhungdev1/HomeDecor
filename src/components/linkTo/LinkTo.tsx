import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";

interface LinkToProps {
  children: React.ReactNode;
  className?: string;
  url: string;
  colorLine?: string;
}

const LinkTo: React.FC<LinkToProps> = ({
  children,
  className,
  url,
  colorLine,
}) => {
  return (
    <Link
      to={"/shop" || url}
      className={`flex w-max items-center text-sm gap-1  group/arrow relative `}
    >
      <span className={`${className} text-[16px] font-medium`}>{children}</span>
      <span className="transition-all duration-300 group-hover/arrow:translate-x-1 ">
        <IoArrowForward className="text-base 2xl:text-xl" />
      </span>
      <div
        className={`absolute h-[2px] ${
          colorLine ? colorLine : "bg-primary"
        } -bottom-[2px] w-full`}
      ></div>
    </Link>
  );
};

export default LinkTo;
