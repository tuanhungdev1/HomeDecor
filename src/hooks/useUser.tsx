import { getUserInfo, resetUserStatus } from "@/stores/slices/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores/store";
import { useAppSelector } from "./hooks";
import {
  selectUser,
  selectUserError,
  selectUserStatus,
} from "@/stores/selectors/userSelector";

const useUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useAppSelector(selectUser);
  const status = useAppSelector(selectUserStatus);
  const error = useAppSelector(selectUserError);

  const handleGetUserInfo = async (userId: string) => {
    dispatch(resetUserStatus());
    await dispatch(getUserInfo(userId)).unwrap();
  };

  return {
    user,
    status,
    error,
    handleGetUserInfo,
  };
};

export default useUser;
