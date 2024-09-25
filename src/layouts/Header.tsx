import { ActiveLink, Logo } from "@/components/shared";
import { menuItems } from "@/constants/menuItem";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";

import { useSelector } from "react-redux";
import { selectAuthUser } from "@/stores/authSlice/authSlice";
import { Button } from "@/components/button";
import { Link, NavLink } from "react-router-dom";
import { SearchBox } from "@/components/searchBox";
import { dropdownMenu } from "@/constants/dropdownMenu";
import Sidebar from "./Sidebar";

const Header = () => {
  const authUser = useSelector(selectAuthUser);

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleOpenSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const [isVisible, setIsVisible] = useState(false);

  const handleVisibleSearchBox = () => {
    setIsVisible(!isVisible);
  };

  const [activeLinkId, setActiveLinkId] = useState<string>(
    menuItems[0].id ?? "/home"
  );

  const handleSelectedLinkIdClick = (id: string) => {
    setActiveLinkId(id);
  };

  console.log(authUser);
  return (
    <section className="mt-4 mb-4">
      <nav className="h-[60px] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="cursor-pointer lg:hidden" onClick={handleOpenSidebar}>
            <IoMenu className="text-4xl" />
          </div>
          <Logo className="text-xl lg:text-3xl" />
        </div>

        <div className="hidden lg:flex ">
          <ul className="flex gap-6 text-lg font-normal xl:text-lg xl:gap-10">
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

        <div className="flex flex-row-reverse items-center gap-2 md:gap-6 sm:flex sm:flex-row">
          <div className="flex items-center gap-2">
            <div
              className="relative cursor-pointer"
              onClick={handleVisibleSearchBox}
            >
              <img
                src={"/public/magnifying-glass.png"}
                alt="Search Icon"
                className="w-[40px]"
              />
            </div>
            {authUser && (
              <div className="relative cursor-pointer group/dropdowmenu">
                <img
                  src={"/public/user.png"}
                  alt="User Logo"
                  className="w-[30px]"
                />
                <div className="absolute invisible group-hover/dropdowmenu:visible flex right-0 z-20 gap-2 text-gray-400 flex-col bg-gray-100 top-auto px-3 py-2 rounded w-[200px] shadow-xl">
                  {dropdownMenu.map((item) => (
                    <NavLink
                      to={item.path}
                      key={item.id}
                      className={
                        "p-1 cursor-pointer hover:text-black transition duration-150"
                      }
                    >
                      {item.title}
                    </NavLink>
                  ))}
                  <div className="p-1 transition duration-150 cursor-pointer hover:text-black">
                    Logout
                  </div>
                </div>
              </div>
            )}
          </div>

          {!authUser ? (
            <div className="flex items-center gap-4">
              <Link to={"/auth/sign-up"}>
                <Button className="">Sign Up</Button>
              </Link>

              <Link to={"/auth/sign-in"}>
                <Button className="">Sign In</Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2 cursor-pointer">
              <div>
                <img
                  src={"/public/cart.png"}
                  alt="Cart Logo"
                  className="w-[40px]"
                />
              </div>
              <span className="flex items-center justify-center w-8 h-8 text-base font-semibold text-white rounded-full bg-primary ">
                9
              </span>
            </div>
          )}
        </div>
      </nav>

      {isVisible && <SearchBox onClose={handleVisibleSearchBox} />}

      <Sidebar onClose={handleOpenSidebar} open={openSidebar} />
    </section>
  );
};

export default Header;
