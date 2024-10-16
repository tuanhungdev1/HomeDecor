import {
  getUserInfo,
  resetUserStatus,
  updateUserInfor,
} from "@/stores/slices/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores/store";
import { useAppSelector } from "./hooks";
import {
  selectUser,
  selectUserError,
  selectUserStatus,
} from "@/stores/selectors/userSelector";
import { UserUpdate } from "@/types/type";
import { getUserId } from "@/utils/authHelper";
import { logoutUser } from "@/stores/slices/authSlice";

const useUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useAppSelector(selectUser);
  const status = useAppSelector(selectUserStatus);
  const error = useAppSelector(selectUserError);
  const userId = getUserId();

  const handleGetUserInfo = async () => {
    if (userId) {
      dispatch(resetUserStatus());

      await dispatch(getUserInfo(userId)).unwrap();

      dispatch(resetUserStatus());
      return;
    }

    await dispatch(logoutUser);
  };

  const handleUpdateUserInfo = async (
    userId: string,
    userInfor: UserUpdate
  ) => {
    dispatch(resetUserStatus());
    await dispatch(
      updateUserInfor({
        userId,
        userInfor,
      })
    ).unwrap();
  };

  return {
    user,
    status,
    error,
    userId,
    handleGetUserInfo,
    handleUpdateUserInfo,
  };
};

export default useUser;
