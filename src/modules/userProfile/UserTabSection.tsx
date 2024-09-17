import { userProfileItemList } from "@/constants/userProfileItems";
import { selectAuthUser } from "@/stores/authSlice/authSlice";
import { useSelector } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import { UploadAvatar } from "@/components/uploadAvatar";
import ActiveTab from "@/components/shared/ActiveTab";
import { useState } from "react";

const UserTabSection = () => {
  const authUser = useSelector(selectAuthUser);
  const [activeTab, setActiveTab] = useState(userProfileItemList[0].id);

  const handleSelectActiveTab = (id: string) => {
    setActiveTab(id);
  };
  return (
    <section>
      <div className="flex flex-col items-center justify-center w-full h-auto p-5 py-10 text-black rounded-md gap-14 bg-secondary-gray">
        <div className="flex flex-col gap-5 text-center">
          <div>
            <UploadAvatar />
          </div>
          <span className="text-2xl font-medium">
            {authUser?.displayName ? authUser.displayName : "No Name"}
          </span>
        </div>

        <div className="relative w-full lg:hidden">
          <select className="w-full p-3 px-5 text-lg cursor-pointer font-medium border-[2px] border-gray-500 rounded-lg appearance-none relative">
            {userProfileItemList.map((item) => (
              <option
                value={item.title}
                key={item.id}
                className="p-2 cursor-pointer"
              >
                {item.title}
              </option>
            ))}
          </select>
          <div className="absolute -translate-y-1/2 z-100 top-1/2 right-5">
            <IoIosArrowDown className="text-xl" />
          </div>
        </div>
        <div className="hidden lg:block">
          <ul>
            {userProfileItemList.map((item) => (
              <ActiveTab
                itemLink={item}
                key={item.id}
                currenLink={activeTab}
                onSelectedLink={handleSelectActiveTab}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default UserTabSection;
