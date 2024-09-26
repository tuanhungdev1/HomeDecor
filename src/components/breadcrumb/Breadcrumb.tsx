import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

export interface BreadcrumbPath {
  id: number;
  titile: string;
  path: string;
}

interface BreadcrumbProps {
  breadcrumbList: BreadcrumbPath[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumbList }) => {
  return (
    breadcrumbList.length > 0 && (
      <div className="flex items-center gap-2 text-lg text-gray-500 transition-all duration-200">
        {breadcrumbList.map((item, index) => {
          if (index === breadcrumbList.length - 1) {
            return (
              <span key={index} className="text-black">
                {item.titile}
              </span>
            );
          } else {
            return (
              <Link
                to={item.path}
                key={index}
                className="flex items-center gap-2 transition duration-300 hover:text-black"
              >
                <span>{item.titile}</span>
                <span>
                  <IoIosArrowForward />
                </span>
              </Link>
            );
          }
        })}
      </div>
    )
  );
};

export default Breadcrumb;
