import { ActiveLink, Logo } from "@/components/shared";
import { menuItems } from "@/constants/menuItem";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";

const Header = () => {
  const [activeLinkId, setActiveLinkId] = useState<string>(
    menuItems[0].id ?? "/home"
  );

  const handleSelectedLinkIdClick = (id: string) => {
    setActiveLinkId(id);
  };
  return (
    <section className="mt-4 mb-4">
      <nav className="h-[60px] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="cursor-pointer lg:hidden">
            <IoMenu className="text-4xl" />
          </div>
          <Logo className="text-xl lg:text-3xl xl:text-4xl" />
        </div>

        <div className="hidden lg:flex ">
          <ul className="flex gap-6 text-lg font-normal xl:text-xl xl:gap-10">
            {menuItems.map((item) => (
              <ActiveLink
                key={item.id}
                itemLink={item}
                currenLink={activeLinkId}
                onSelectedLink={handleSelectedLinkIdClick}
              />
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-6">
          <div className="items-center hidden gap-2 lg:flex">
            <div></div>
            <div className="cursor-pointer">
              <IoSearchOutline className="text-4xl xl:text-5xl" />
            </div>
            <div>
              {/* <Avatar name="Join" alt="avatar" to="/" /> */}
              <HiOutlineUserCircle className="text-4xl xl:text-5xl" />
            </div>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <div>
              <IoCartOutline className="text-4xl xl:text-5xl" />
            </div>
            <span className="flex items-center justify-center w-8 h-8 text-lg font-semibold text-white rounded-full bg-primary xl:w-10 xl:h-10 xl:text-2xl">
              9
            </span>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Header;
