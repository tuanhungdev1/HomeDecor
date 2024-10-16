import { authService } from "@/services/authService";
import { RefreshTokenData } from "@/types/type";
import {
  getAccessToken,
  getRefreshToken,
  isRemember,
  logout,
} from "@/utils/authHelper";
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const axiosConfig: AxiosRequestConfig = {
  baseURL: "https://localhost:5173",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const axiosInstance: AxiosInstance = axios.create(axiosConfig);

export default axiosInstance;

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token = getAccessToken();

  // Kiểm tra xem token có tồn tại và có phải chuỗi JSON hợp lệ không
  if (token) {
    try {
      config.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      console.error("Error parsing token:", error);
    }
  }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse) => {
  return response;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onResponseError = async (error: AxiosError): Promise<any> => {
  const originalRequest = error.config as CustomAxiosRequestConfig;

  try {
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = getRefreshToken();
      const accessTokenOld = getAccessToken();

      if (!refreshToken || !accessTokenOld) {
        throw new Error("No refresh token available");
      }

      const authParams: RefreshTokenData = {
        accessToken: accessTokenOld,
        refreshToken: refreshToken,
      };

      const response = await authService.refreshToken(authParams);

      const { accessToken } = response.data.data;

      const remember = isRemember();

      if (remember) {
        sessionStorage.setItem("accessToken", accessToken);
      } else {
        localStorage.setItem("accessToken", accessToken);
      }

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      }

      return axiosInstance(originalRequest);
    }
  } catch (err) {
    window.location.href = "/auth/sign-in";
    logout();
  }

  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(onRequest, onRequestError);
axiosInstance.interceptors.response.use(onResponse, onResponseError);
