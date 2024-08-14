import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";

interface LinkToProps {
  children: React.ReactNode;
  className?: string;
  url: string;
}

const LinkTo: React.FC<LinkToProps> = ({ children, className, url }) => {
  return (
    <Link
      to={url}
      className={`flex w-max items-center text-sm gap-1  group/arrow relative `}
    >
      <span className={`${className}`}>{children}</span>
      <span className="transition-all duration-300 group-hover/arrow:translate-x-1 ">
        <IoArrowForward className="text-lg" />
      </span>
      <div className="absolute h-[2px] bg-primary -bottom-[2px] w-full"></div>
    </Link>
  );
};

export default LinkTo;
