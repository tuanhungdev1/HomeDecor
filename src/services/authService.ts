import axiosInstance from "@/configs/axiosInstance";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { LoginData, RegisterData } from "@/types/type";

export const authService = {
  login: (credentials: LoginData) =>
    axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, credentials),

  register: (userData: RegisterData) =>
    axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER, userData),

  logout: () => axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT),

  getCurrentUser: () => axiosInstance.get(API_ENDPOINTS.AUTH.CURRENT_USER),
};
