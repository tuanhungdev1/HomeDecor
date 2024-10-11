import { API_ENDPOINTS } from "@/constants";

import { logoutUser } from "@/stores/slices/authSlice";
import { getAccessToken, getRefreshToken } from "@/utils/authHelper";
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
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
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

      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await axiosInstance.post(
        API_ENDPOINTS.AUTH.REFRESH_TOKEN,
        {
          accessToken: accessTokenOld,
          refreshToken: refreshToken,
        }
      );

      const { accessToken } = response.data.data;
      const { store } = await import("@/stores/store");
      const isRemember = store.getState().auth.remember;

      if (isRemember) {
        sessionStorage.setItem("accessToken", JSON.stringify(accessToken));
      } else {
        localStorage.setItem("accessToken", JSON.stringify(accessToken));
      }

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      }

      return axiosInstance(originalRequest);
    }
  } catch (err) {
    try {
      const { store } = await import("@/stores/store");
      store.dispatch(logoutUser());
    } catch (logoutError) {
      throw new Error(`Logout API call failed: ${logoutError}`);
    }

    throw err;
  }

  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(onRequest, onRequestError);
axiosInstance.interceptors.response.use(onResponse, onResponseError);
