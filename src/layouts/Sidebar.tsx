import { Overlay } from "@/components/overlay";
import { Search } from "@/components/searchBox";
import { Logo } from "@/components/shared";
import { menuItems } from "@/constants";
import useBodyOverflow from "@/hooks/useBodyOverflow";
import { IoCloseOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";

import { SlSocialYoutube } from "react-icons/sl";
import { RiFacebookCircleLine } from "react-icons/ri";
import { Button } from "@/components/button";

interface SidebarProps {
  onClose: () => void;
  open: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const location = useLocation();
  useBodyOverflow(open);
  return (
    <>
      <div
        className={`fixed lg:hidden left-0 top-0 bottom-0 z-50 w-[80vw] sm:w-[400px] bg-white transition duration-300 ease-in-out ${
          open ? "translate-x-[0] no-scrollbar" : "-translate-x-[100%]"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between w-full px-6 py-5">
            <Logo className="" />
            <IoCloseOutline
              onClick={onClose}
              className="text-3xl cursor-pointer"
            />
          </div>

          <div className="px-6">
            <Search />
          </div>
          <div className="relative flex flex-col flex-1 px-6 mt-2">
            {menuItems.map((item) => (
              <Link
                to={item.url}
                key={item.id}
                onClick={onClose}
                className={`py-4 text-base border-b-[1px] cursor-pointer transition-all duration-100  ${
                  item.url === location.pathname
                    ? "font-medium cursor-defaul pointer-events-none"
                    : "text-gray-500"
                }`}
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div className="items-center px-6 py-2">
            <div className="flex flex-col gap-4">
              <Link to={"/auth/sign-in"}>
                <Button variant="outline" size="lg" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to={"/auth/sign-up"}>
                <Button variant="default" size="lg" className="w-full">
                  Sign Up
                </Button>
              </Link>
            </div>
            <div className="flex gap-4 py-4 text-3xl">
              <FaInstagram className="transition cursor-pointer hover:text-pink-500" />

              <RiFacebookCircleLine className="transition cursor-pointer hover:text-blue-500" />

              <SlSocialYoutube className="transition cursor-pointer hover:text-red-500" />
            </div>
          </div>
        </div>
      </div>
      {open && <Overlay onClick={onClose} />}
    </>
  );
};

export default Sidebar;
