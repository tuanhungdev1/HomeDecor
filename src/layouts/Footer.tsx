import { Logo } from "@/components/shared";
import { menuItems } from "@/constants";
import { SocialItemList } from "@/constants/socialItem";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex flex-col px-5 py-16 text-white select-none bg-primary">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10 lg:justify-between lg:flex-row lg:items-center">
          <div className="flex flex-col items-center lg:flex-row lg:gap-5">
            <Logo className="text-4xl lg:text-4xl" />
            <div className="h-[1px] w-10 bg-gray-500 mt-5 lg:hidden"></div>
            <div className="h-[20px] w-[1px] bg-gray-500 hidden lg:block"></div>
            <span className="mt-5 text-sm text-gray-300 md:text-base lg:mt-0">
              Gift & Decoration Store
            </span>
          </div>
          <ul className="flex flex-col items-center gap-9 lg:flex-row">
            {menuItems.map((item) => (
              <Link key={item.id} to={item.url}>
                <li className="text-sm text-gray-300 transition-all cursor-pointer md:text-base hover:text-white hover:font-medium">
                  {item.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="w-full h-[1px] bg-gray-500 mt-10 lg:mt-14"></div>
        <div className="mt-8 lg:flex lg:flex-row-reverse lg:justify-between">
          <div className="flex items-center justify-center gap-6">
            {SocialItemList.map((item) => (
              <Link
                to={item.url}
                key={item.id}
                className="text-3xl text-gray-300 transition-all hover:text-white"
              >
                {item.icon("")}
              </Link>
            ))}
          </div>
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center">
            <div className="flex justify-center gap-6 mt-8 text-sm font-medium md:text-base lg:mt-0">
              <span>Privacy Policy</span>
              <span>Terms of Use</span>
            </div>
            <span className="text-sm text-gray-300 md:text-base ">
              Copyright &copy; {new Date().getFullYear()} HomeDecor. All right
              reserved
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
