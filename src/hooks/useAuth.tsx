import {
  selectAuthError,
  selectAuthStatus,
} from "@/stores/selectors/authSelector";
import {
  login,
  logoutUser,
  register,
  resetAuthStatus,
} from "@/stores/slices/authSlice";
import { AppDispatch } from "@/stores/store";
import { LoginData, RegisterData } from "@/types/type";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector(selectAuthError);
  const status = useSelector(selectAuthStatus);

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

  return {
    handleLogin,
    error,
    status,
    handleRegister,
    handleLogout,
    handleReset,
  };
};
