import { userProfileItemList } from "@/constants/userProfileItems";
import { selectAuthUser } from "@/stores/authSlice/authSlice";
import { useSelector } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import ActiveTab from "@/components/shared/ActiveTab";
import { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/modal";
import { Button } from "@/components/button";
import { FaCamera } from "react-icons/fa";
import { CiCamera } from "react-icons/ci";
import { UploadAvatarUser } from "@/components/uploadFile";
import { UploadAvatar } from "@/components/uploadAvatar";
const UserTabSection = () => {
  const { isOpen, closeModal, openModal } = useModal();
  const authUser = useSelector(selectAuthUser);
  const [activeTab, setActiveTab] = useState(userProfileItemList[0].id);

  const handleSelectActiveTab = (id: string) => {
    setActiveTab(id);
  };
  return (
    <section>
      <Modal
        title={
          <span className="flex items-center gap-2">
            <FaCamera className="text-3xl" /> Change Avatar
          </span>
        }
        isOpen={isOpen}
        onClose={closeModal}
        closeOnOverlayClick={true}
        showCloseButton={true}
        footer={
          <>
            <Button className="bg-red-600 hover:bg-red-500">Remove</Button>
            <Button className="bg-green-600 hover:bg-green-500">Upload</Button>
          </>
        }
      >
        <div className="flex items-center justify-center w-full ">
          <div className="w-[300px] h-[300px] rounded-full overflow-hidden">
            <UploadAvatarUser
              icon={<CiCamera size={90} />}
              text={
                <span className="text-xs">
                  <span className="text-lg">Drop and Grab</span>
                  <br /> to upload here
                </span>
              }
            />
          </div>
        </div>
      </Modal>
      <div className="flex flex-col items-center justify-center w-full h-auto p-5 py-10 text-black rounded-md lg:px-3 gap-14 bg-secondary-gray">
        <div className="flex flex-col gap-5 text-center">
          <div onClick={openModal}>
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
        <div className="hidden w-full lg:block">
          <ul className="flex flex-col w-full text-left">
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
