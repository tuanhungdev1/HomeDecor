/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINTS } from "@/constants";
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

interface QueueItem {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}

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

export default axiosInstance;

let failedQueue: QueueItem[] = [];
let isRefreshing = false;

const processQueue = (error: AxiosError | null): void => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
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

  originalRequest.headers = JSON.parse(
    JSON.stringify(originalRequest.headers || {})
  );
  const refreshToken = getRefreshToken();
  const accessTokenOld = getAccessToken();

  const handleError = async (error: AxiosError): Promise<AxiosError> => {
    processQueue(error);
    logout();
    return Promise.reject(error);
  };

  if (
    refreshToken &&
    error.response?.status === 401 &&
    (error.response.data as any).message === "TokenExpireError" &&
    originalRequest.url !== API_ENDPOINTS.AUTH.REFRESH_TOKEN &&
    originalRequest._retry !== true
  ) {
    if (isRefreshing) {
      return new Promise<AxiosResponse>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => {
          return axiosInstance(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    isRefreshing = true;
    originalRequest._retry = true;

    try {
      if (!refreshToken || !accessTokenOld) {
        throw new Error("Refresh token or Access token was not found.");
      }
      const authParams: RefreshTokenData = {
        accessToken: accessTokenOld,
        refreshToken: refreshToken,
      };

      const response = await authService.refreshToken(authParams);
      const tokens: Tokens = {
        accessToken: response.data.data.accessToken,
        refreshToken: response.data.data.refreshToken,
      };
      const remember = isRemember();
      if (remember) {
        sessionStorage.setItem("accessToken", tokens.accessToken);
      } else {
        localStorage.setItem("accessToken", tokens.accessToken);
      }
      processQueue(null);
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      return handleError(refreshError as AxiosError);
    } finally {
      isRefreshing = false;
    }
  }

  if (
    error.response?.status === 401 &&
    (error.response.data as any).message === "TokenExpiredError"
  ) {
    return handleError(error);
  }
  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(onRequest, onRequestError);
axiosInstance.interceptors.response.use(onResponse, onResponseError);
