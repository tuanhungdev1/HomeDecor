/* eslint-disable @typescript-eslint/no-explicit-any */
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

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

const axiosConfig: AxiosRequestConfig = {
  baseURL: "https://localhost:5173",
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
  },
};

const axiosInstance: AxiosInstance = axios.create(axiosConfig);

// Biến để theo dõi trạng thái refresh token
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse) => {
  const paginationHeader = response.headers["x-pagination"];
  let paginationInfo = {
    totalCount: 0,
    totalPage: 0,
    currentPage: 1,
    pageSize: 10,
    hasPrevious: false,
    hasNext: false,
  };

  if (paginationHeader) {
    try {
      const paginationData = JSON.parse(paginationHeader);
      paginationInfo = {
        totalCount: paginationData.totalCount || 0,
        totalPage: paginationData.totalPage || 0,
        currentPage: paginationData.currentPage || 1,
        pageSize: paginationData.pageSize || 10,
        hasPrevious: paginationData.hasPrevious || false,
        hasNext: paginationData.hasNext || false,
      };
    } catch (error) {
      console.error("Error parsing X-Pagination header:", error);
    }
  }

  return {
    ...response,
    pagination: paginationInfo,
  };
};

const onResponseError = async (
  error: AxiosError
): Promise<AxiosResponse | AxiosError> => {
  const originalRequest = error.config as AxiosRequestConfig & {
    _retry?: boolean;
  };

  // Kiểm tra nếu lỗi không phải 401 hoặc không có config
  if (!error.response || error.response.status !== 401 || !originalRequest) {
    return Promise.reject(error);
  }

  const refreshToken = getRefreshToken();
  const accessTokenOld = getAccessToken();

  // Nếu không có token, logout
  if (!refreshToken || !accessTokenOld) {
    logout();
    return Promise.reject(error);
  }

  if (!originalRequest._retry) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers!.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const authParams: RefreshTokenData = {
        accessToken: accessTokenOld,
        refreshToken: refreshToken,
      };

      const response = await authService.refreshToken(authParams);
      const tokens: Tokens = {
        accessToken: response.data.data.accessToken,
        refreshToken: response.data.data.refreshToken,
      };

      // Lưu token mới
      const remember = isRemember();
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem("accessToken", tokens.accessToken);
      storage.setItem("refreshToken", tokens.refreshToken);
      originalRequest.headers!.Authorization = `Bearer ${tokens.accessToken}`;
      processQueue(null, tokens.accessToken);
      isRefreshing = false;

      return axiosInstance(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      isRefreshing = false;
      logout();
      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(error);
};

const instance = axios.create(axiosConfig);

instance.interceptors.request.use(onRequest, onRequestError);
instance.interceptors.response.use(onResponse, onResponseError);

export default instance;
