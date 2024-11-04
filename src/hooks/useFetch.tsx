/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/api/interceptor";
import { AxiosError, AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";

interface Pagination {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

interface ApiResponse<T> {
  data: T;
  pagination: Pagination;
}

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  pagination: Pagination | null;
  fetchData: (config?: AxiosRequestConfig) => Promise<void>;
}

function useFetch<T>(
  url: string,
  options?: AxiosRequestConfig,
  manual: boolean = false
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const fetchData = useCallback(
    async (config?: AxiosRequestConfig) => {
      try {
        setLoading(true);
        setError(null);

        const params = config
          ? {
              ...config,
            }
          : { ...options };

        const response = await axiosInstance.request<ApiResponse<T>>({
          url,
          ...params,
        });

        setData(response.data.data);
        setPagination(response.pagination! ?? null);
      } catch (err) {
        const error = err as AxiosError;
        setError(error.message);
        console.error(
          "Fetch Error:",
          JSON.parse(error.response?.request.response)
        );
      } finally {
        setLoading(false);
      }
    },
    [url, JSON.stringify(options)]
  );
  useEffect(() => {
    if (!manual) {
      console.log();
      fetchData();
    }
  }, [fetchData, manual]);

  return { data, loading, error, pagination, fetchData };
}

export default useFetch;
