import { authService } from "@/services/authService";
import {
  getAccessToken,
  getRefreshToken,
  isRemember,
} from "@/utils/authHelper";
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const axiosConfig: AxiosRequestConfig = {
  baseURL: "https://localhost:5173",
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
  },
};

const instance: AxiosInstance = axios.create(axiosConfig);

// Request interceptor
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Xử lý pagination header nếu có
    const paginationHeader = response.headers["x-pagination"];
    if (paginationHeader) {
      const paginationData = JSON.parse(paginationHeader);
      return {
        ...response,
        pagination: paginationData,
      };
    }
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      try {
        // Lấy token hiện tại
        const currentAccessToken = getAccessToken();
        const currentRefreshToken = getRefreshToken();

        if (!currentAccessToken || !currentRefreshToken) {
          return Promise.reject(error);
        }

        // Thực hiện refresh token
        const response = await authService.refreshToken({
          accessToken: currentAccessToken,
          refreshToken: currentRefreshToken,
        });

        const { accessToken, refreshToken } = response.data.data;

        // Lưu token mới
        const storage = isRemember() ? localStorage : sessionStorage;
        storage.setItem("accessToken", accessToken);
        storage.setItem("refreshToken", refreshToken);

        // Gửi lại request ban đầu với token mới
        if (error.config) {
          error.config.headers.Authorization = `Bearer ${accessToken}`;
          return instance(error.config);
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
