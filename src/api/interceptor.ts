import { API_ENDPOINTS } from "@/constants";
import { store } from "@/stores/store";
import { logoutUser } from "@/stores/thunks/authThunk";
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
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
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

      const refreshToken = localStorage.getItem("refreshToken");
      const accessToken = localStorage.getItem("accessToken");

      if (!refreshToken || !accessToken) {
        throw new Error("No refresh token available");
      }

      const parsedRefreshToken = JSON.parse(refreshToken);
      const parsedAccessToken = JSON.parse(accessToken);

      const response = await axiosInstance.post(
        API_ENDPOINTS.AUTH.REFRESH_TOKEN,
        {
          accessToken: parsedAccessToken,
          refreshToken: parsedRefreshToken,
        }
      );

      const { newAccessToken } = response.data;
      localStorage.setItem("accessToken", JSON.stringify(newAccessToken));

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      }

      return axiosInstance(originalRequest);
    }
  } catch (err) {
    store.dispatch(logoutUser());
    return Promise.reject(err);
  }

  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(onRequest, onRequestError);
axiosInstance.interceptors.response.use(onResponse, onResponseError);
