import { userProfileItemList } from "@/constants/userProfileItems";
import { IoIosArrowDown } from "react-icons/io";
import ActiveTab from "@/components/shared/ActiveTab";

import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/modal";
import { Button } from "@/components/button";
import { FaCamera } from "react-icons/fa";
import { CiCamera } from "react-icons/ci";
import { UploadAvatarUser } from "@/components/uploadFile";
import { UploadAvatar } from "@/components/uploadAvatar";
import useUser from "@/hooks/useUser";
import useFileUpload from "@/hooks/useFileUpload";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

interface UserTabSectionProps {
  currentTab: string;
  handleSelected: (tabId: string) => void;
}

const UserTabSection: React.FC<UserTabSectionProps> = ({
  currentTab,
  handleSelected,
}) => {
  const { user, handleGetUserInfo } = useUser();
  const { isOpen, closeModal, openModal } = useModal();
  const [isUploading, setIsUploading] = useState(false);
  const {
    selectedFiles,
    previewUrls,
    uploadSingleFile,
    resetUpload,
    handleFileSelect,
    uploadStatus,
  } = useFileUpload({
    maxSize: 2 * 2 * 1024 * 1024, // 2MB
    allowedFormats: ["image/jpg", "image/jpeg", "image/png"],
  });

  const handleUpload = async () => {
    if (selectedFiles.length > 0) {
      setIsUploading(true);
      // eslint-disable-next-line no-async-promise-executor
      const uploadPromise = new Promise(async (resolve, reject) => {
        try {
          toast.loading("Đang upload hình ảnh...", { id: "uploadToast" });
          await uploadSingleFile(selectedFiles[0]);
          if (uploadStatus === "Upload thành công") {
            await handleGetUserInfo();
            resolve("Upload thành công");
          } else {
            reject("Upload thất bại");
          }
        } catch (error) {
          console.error("Lỗi khi upload avatar:", error);
          reject("Có lỗi xảy ra khi upload");
        } finally {
          setIsUploading(false);
          closeModal();
        }
      });

      toast.promise(
        uploadPromise,
        {
          loading: "Đang upload...",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          success: (message: any) => message,
          error: (err) => err,
        },
        { id: "uploadToast" }
      );
    }
  };

  const handleRemove = () => {
    resetUpload();
    toast.success("Đã xóa hình ảnh");
  };

  return (
    <section>
      <Toaster />
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
            <Button
              className="bg-red-600 hover:bg-red-500"
              onClick={handleRemove}
            >
              Remove
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-500"
              onClick={handleUpload}
              isLoading={isUploading}
            >
              Upload
            </Button>
          </>
        }
      >
        <div className="flex items-center justify-center w-full ">
          <div className="w-[300px] h-[300px] rounded-full overflow-hidden">
            <UploadAvatarUser
              handleResetUpload={handleRemove}
              handleFileSelect={handleFileSelect}
              preview={previewUrls[0]}
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
        <div className="flex flex-col justify-center gap-5 text-center">
          <div onClick={openModal} className="flex items-center justify-center">
            <UploadAvatar urlImage={user?.profilePicture} />
          </div>
          <span className="text-2xl font-medium text-center">
            {user?.displayName ? user.displayName : "No Name"}
          </span>
        </div>

        <div className="relative w-full lg:hidden">
          <select className="w-full p-3 px-5 text-lg cursor-pointer font-medium border-[2px] border-gray-500 rounded-lg appearance-none relative">
            {userProfileItemList.map((item) => (
              <option
                value={item.title}
                key={item.id}
                className="p-2 cursor-pointer"
                defaultChecked={currentTab === item.id}
                onClick={() => handleSelected(item.id)}
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
                currenLink={currentTab}
                onSelectedLink={handleGetUserInfo}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default UserTabSection;
