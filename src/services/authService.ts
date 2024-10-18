import axiosInstance from "@/api/interceptor";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import {
  ForgotPasswordFormValues,
  LoginData,
  RefreshTokenData,
} from "@/types/type";
import { FieldSignUpType } from "@/pages/admin/SignUpAdminPage";

export const authService = {
  login: (credentials: LoginData) =>
    axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, credentials),

  register: (signUpform: FieldSignUpType) =>
    axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER, signUpform),

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
