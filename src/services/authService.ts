import axiosInstance from "@/configs/axiosInstance";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const authService = {
  login: (credentials: { username: string; password: string }) =>
    axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, credentials),

  register: (userData: { username: string; email: string; password: string }) =>
    axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER, userData),

  logout: () => axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT),

  getCurrentUser: () => axiosInstance.get(API_ENDPOINTS.AUTH.CURRENT_USER),
};
