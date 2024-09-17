import { selectAuthUser } from "@/stores/authSlice/authSlice";
import { useSelector } from "react-redux";
import { AiOutlineCamera } from "react-icons/ai";
const UploadAvatar = () => {
  const authUser = useSelector(selectAuthUser);

  return (
    <div className="w-[130px] h-[130px] bg-red-300 rounded-full  relative cursor-pointer">
      <img
        src={authUser?.profilePicture ?? "/public/default_avatar_user.png"}
        alt=""
        className="w-full h-full rounded-full"
      />
      <div className="absolute rounded-full bg-primary flex items-center justify-center w-[45px] h-[45px] z-20 bottom-0 right-0 border-[3px] border-white">
        <AiOutlineCamera className="text-xl text-white" />
      </div>
    </div>
  );
};

export default UploadAvatar;
