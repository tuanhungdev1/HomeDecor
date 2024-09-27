import { Logo } from "@/components/shared";
import { menuItems } from "@/constants";
import { IoCloseOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  onClose: () => void;
  open: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const location = useLocation();

  console.log(open);
  return (
    <div
      className={`fixed lg:hidden left-0 top-0 bottom-0 z-50 w-screen bg-white transition duration-300 ease-in-out ${
        open ? "translate-x-[0]" : "-translate-x-[100%]"
      }`}
    >
      <div className="relative w-full">
        <IoCloseOutline
          onClick={onClose}
          className="absolute text-3xl cursor-pointer top-[20px] right-[40px]"
        />
      </div>
      <div className="relative flex flex-col mt-16 last:border-b-[2px] border-b-[2px]">
        {menuItems.map((item) => (
          <Link
            to={item.url}
            key={item.id}
            onClick={onClose}
            className={`px-4 py-4 text-lg cursor-pointer transition-all duration-100  border-t-[2px] ${
              item.url === location.pathname
                ? "bg-gray-100 font-medium"
                : "text-gray-400 hover:bg-gray-100"
            }`}
          >
            {item.title}
          </Link>
        ))}
      </div>
      <div className="absolute -translate-x-1/2 bottom-5 left-1/2">
        <Logo className="text-3xl " />
      </div>
    </div>
  );
};

export default Sidebar;
