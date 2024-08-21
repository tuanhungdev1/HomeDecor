import axiosInstance from "@/configs/axiosInstance";
import { authService } from "@/services/authService";
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse) => response;

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
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
        window.location.href = "/login";
      }
    } else {
      // Xóa token và chuyển hướng đến trang đăng nhập
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
    }
  }
  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(onRequest, onRequestError);
axiosInstance.interceptors.response.use(onResponse, onResponseError);
