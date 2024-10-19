import { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import {
  selectAuthError,
  selectAuthStatus,
  selectAuthUser,
} from "@/stores/selectors/authSelector";
import {
  addAuth,
  changePassword,
  getUserInfo,
  login,
  logoutUser,
  register,
  resetAuthStatus,
  updateUserInfor,
} from "@/stores/slices/authSlice";
import {
  ForgotPasswordFormValues,
  LoginData,
  RegisterData,
  UserUpdate,
} from "@/types/type";
import { getUserData, getUserId } from "@/utils/authHelper";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectAuthError);
  const status = useAppSelector(selectAuthStatus);
  const user = useAppSelector(selectAuthUser);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = useCallback(async () => {
    const userData = getUserData();
    if (userData) {
      dispatch(addAuth(JSON.parse(userData)));
    } else {
      const userId = getUserId();
      if (userId) {
        try {
          await dispatch(getUserInfo(userId)).unwrap();
        } catch (error) {
          console.error("Failed to fetch user info:", error);
          dispatch(logoutUser());
        }
      }
    }
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleLogin = async (values: LoginData) => {
    dispatch(resetAuthStatus());
    return dispatch(login(values)).unwrap();
  };

  const handleRegister = async (values: RegisterData) => {
    dispatch(resetAuthStatus());
    return dispatch(register(values)).unwrap();
  };

  const handleLogout = async () => {
    dispatch(resetAuthStatus());
    return dispatch(logoutUser()).unwrap();
  };

  const handleReset = async () => {
    return dispatch(resetAuthStatus());
  };

  const handleForgotPassword = async (values: ForgotPasswordFormValues) => {
    dispatch(resetAuthStatus());
    return dispatch(changePassword(values)).unwrap();
  };

  const handleGetUserInfo = useCallback(
    async (id?: string) => {
      if (id) {
        return dispatch(getUserInfo(id)).unwrap();
      } else {
        const userId = getUserId();
        if (userId) {
          return dispatch(getUserInfo(userId)).unwrap();
        } else {
          return dispatch(logoutUser());
        }
      }
    },
    [dispatch]
  );

  const handleUpdateUserInfo = async (
    userId: string,
    userInfor: UserUpdate
  ) => {
    dispatch(resetAuthStatus());
    await dispatch(
      updateUserInfor({
        userId,
        userInfor,
      })
    ).unwrap();
  };

  return {
    handleLogin,
    user,
    error,
    status,
    isLoading,
    handleGetUserInfo,
    handleUpdateUserInfo,
    handleRegister,
    handleLogout,
    handleReset,
    handleForgotPassword,
    fetchUserData,
  };
};
