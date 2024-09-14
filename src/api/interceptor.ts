import { authService } from "@/services/authService";
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const axiosConfig: AxiosRequestConfig = {
  baseURL: "https://localhost:5173",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

console.log("Create instance Axios");
const axiosInstance: AxiosInstance = axios.create(axiosConfig);

export default axiosInstance;

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  console.log("Request interceptor called");
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.log("Request error interceptor called");
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse) => {
  console.log("Response interceptor called");
  // Kiểm tra nếu request là tới endpoint đăng nhập và phản hồi thành công

  return response;
};

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  console.log("Response error interceptor called");
  if (error.response?.status === 400) {
    if (
      error.response.data &&
      typeof error.response.data === "object" &&
      "message" in error.response.data &&
      error.response.data.message ===
        "Invalid client request. The tokenDto has some invalid values."
    ) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
      return Promise.reject(error);
    }
  }
  if (error.response?.status === 401) {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      try {
        // Gọi API để lấy access token mới bằng cách sử dụng refresh token
        const newAccessToken = await authService.refreshToken({
          accessToken,
          refreshToken,
        });

        // Lưu access token mới vào localStorage
        localStorage.setItem("accessToken", newAccessToken.data.accessToken);
        const config = error.config;
        if (config) {
          config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(config);
        } else {
          // Xử lý trường hợp config không tồn tại
          return Promise.reject(error);
        }
      } catch (err) {
        // Xử lý lỗi khi gọi API refresh token
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/auth/sign-in";
      }
    } else {
      // Xóa token và chuyển hướng đến trang đăng nhập
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/auth/sign-in";
    }
  }
  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(onRequest, onRequestError);
axiosInstance.interceptors.response.use(onResponse, onResponseError);
