import { ActiveLink, Logo } from "@/components/shared";
import { menuItems } from "@/constants/menuItem";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";

import { IoSearchOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { selectAuthUser } from "@/stores/authSlice/authSlice";
import { Button } from "@/components/button";
import { Link } from "react-router-dom";
import { Avatar } from "@/components/avatar";

const Header = () => {
  const authUser = useSelector(selectAuthUser);

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
          <div className="cursor-pointer lg:hidden">
            <IoMenu className="text-4xl" />
          </div>
          <Logo className="text-xl lg:text-3xl xl:text-4xl" />
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

        <div className="flex items-center gap-6">
          <div className="items-center hidden gap-2 lg:flex">
            <div></div>
            <div className="cursor-pointer">
              <IoSearchOutline className="text-4xl" />
            </div>
            {authUser && (
              <div>
                <Avatar
                  name={authUser.displayName ?? authUser.email}
                  alt={authUser.displayName ?? authUser.email}
                  to="/"
                  src={authUser.profilePicture}
                />
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
                <IoCartOutline className="text-4xl" />
              </div>
              <span className="flex items-center justify-center text-base font-semibold text-white rounded-full w-9 h-9 bg-primary ">
                9
              </span>
            </div>
          )}
        </div>
      </nav>
    </section>
  );
};

export default Header;
