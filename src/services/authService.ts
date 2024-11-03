import { API_ENDPOINTS } from "../constants/apiEndpoints";
import {
  ForgotPasswordFormValues,
  LoginData,
  RefreshTokenData,
} from "@/types/type";
import { FieldSignUpType } from "@/pages/admin/SignUpAdminPage";
import { FieldLoginType } from "@/pages/admin/LoginAdminPage";
import axiosInstance from "@/api/interceptor";

class AuthService {
  login(credentials: LoginData) {
    return axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  }

  loginAdmin(credentials: FieldLoginType) {
    return axiosInstance.post(API_ENDPOINTS.AUTH.ADMIN_LOGIN, credentials);
  }

  register(signUpform: FieldSignUpType) {
    return axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER, signUpform);
  }

  logout() {
    return axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
  }

  changePassword(userForgotPasswordData: ForgotPasswordFormValues) {
    return axiosInstance.post(
      API_ENDPOINTS.AUTH.CHANGE_PASSWORD,
      userForgotPasswordData
    );
  }

  refreshToken(refreshTokenData: RefreshTokenData) {
    return axiosInstance.post(
      API_ENDPOINTS.AUTH.REFRESH_TOKEN,
      refreshTokenData
    );
  }

  getCurrentUser() {
    return axiosInstance.get(API_ENDPOINTS.AUTH.CURRENT_USER);
  }
}

export const authService = new AuthService();
