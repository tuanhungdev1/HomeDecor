import { ActiveLink, Logo } from "@/components/shared";
import { menuItems } from "@/constants/menuItem";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { Button } from "@/components/button";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { SearchBox } from "@/components/searchBox";
import { dropdownMenu } from "@/constants/dropdownMenu";
import Sidebar from "./Sidebar";
import SidebarCart from "./SidebarCart";
import useToggle from "@/hooks/useToggle";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { isAuthenticated } from "@/utils/authHelper";

const Header = () => {
  const isAuth = isAuthenticated();
  const navigate = useNavigate();
  const location = useLocation();
  const { handleLogout, handleReset } = useAuth();

  const { isToggled: isOpenSidebarCart, toggle: handleSetOpenSidebarCart } =
    useToggle(false);

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleOpenSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const [isVisible, setIsVisible] = useState(false);

  const handleVisibleSearchBox = () => {
    setIsVisible(!isVisible);
  };

  const handleLogoutClick = async () => {
    const toastId = toast.loading("Logging out. Please wait..");
    try {
      await handleLogout();
      toast.dismiss(toastId);
      toast.success("Logged out successfully!", {
        duration: 4000,
      });
      handleReset();
      navigate(`/auth/sign-in?redirect=${location.pathname}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.dismiss(toastId);
      toast.error(error.message || "An error occurred during logout");
    }
  };

  return (
    <section className="mt-4 mb-4">
      <nav className="h-[60px] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="cursor-pointer lg:hidden" onClick={handleOpenSidebar}>
            <IoMenu className="text-4xl" />
          </div>
          <Logo className="text-xl lg:text-3xl" isLogo={true} />
        </div>

        <div className="hidden lg:flex ">
          <ul className="flex gap-6 text-lg font-normal xl:text-lg xl:gap-10">
            {menuItems.map((item) => (
              <ActiveLink key={item.id} itemLink={item} />
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
            {isAuth && (
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
                  <div
                    className="p-1 transition duration-150 cursor-pointer hover:text-black"
                    onClick={handleLogoutClick}
                  >
                    Logout
                  </div>
                </div>
              </div>
            )}
          </div>

          {!isAuth ? (
            <div className="flex items-center gap-2">
              <Link to={"/auth/sign-up"}>
                <Button variant="outline">Sign Up</Button>
              </Link>

              <Link to={"/auth/sign-in"}>
                <Button>Sign In</Button>
              </Link>
            </div>
          ) : (
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleSetOpenSidebarCart}
            >
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
      <Toaster />
      <SidebarCart
        isOpen={isOpenSidebarCart}
        onClose={handleSetOpenSidebarCart}
      />
    </section>
  );
};

export default Header;
