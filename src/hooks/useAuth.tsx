import {
  selectAuthError,
  selectAuthIsAuthen,
  selectAuthStatus,
} from "@/stores/selectors/authSelector";
import {
  changePassword,
  login,
  logoutUser,
  register,
  resetAuthStatus,
} from "@/stores/slices/authSlice";
import { AppDispatch } from "@/stores/store";
import {
  ForgotPasswordFormValues,
  LoginData,
  RegisterData,
} from "@/types/type";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "./hooks";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector(selectAuthError);
  const status = useSelector(selectAuthStatus);
  const isAuthenticated = useAppSelector(selectAuthIsAuthen);

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

  return {
    handleLogin,
    error,
    status,
    isAuthenticated,
    handleRegister,
    handleLogout,
    handleReset,
    handleForgotPassword,
  };
};
