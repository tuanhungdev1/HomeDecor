import axiosInstance from "@/api/interceptor";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import {
  ForgotPasswordFormValues,
  LoginData,
  RefreshTokenData,
  RegisterData,
} from "@/types/type";

export const authService = {
  login: (credentials: LoginData) =>
    axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, credentials),

  register: (userData: RegisterData) =>
    axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER, userData),

  logout: () => axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT),

  changePassword: (userForgotPasswordData: ForgotPasswordFormValues) =>
    axiosInstance.post(
      API_ENDPOINTS.AUTH.CHANGE_PASSWORD,
      userForgotPasswordData
    ),

  refreshToken: (refreshTokenData: RefreshTokenData) =>
    axiosInstance.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, refreshTokenData),

  getCurrentUser: () => axiosInstance.get(API_ENDPOINTS.AUTH.CURRENT_USER),
};
