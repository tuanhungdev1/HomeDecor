/* eslint-disable react-hooks/exhaustive-deps */
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

// Định nghĩa interface cho dữ liệu trả về của API
interface ApiResponse<T> {
  data: T;
  pagination: Pagination; // Thêm thuộc tính pagination
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
  options?: AxiosRequestConfig
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

        const response = await axiosInstance<ApiResponse<T>>({
          url,
          ...options,
          ...config,
        });

        setData(response.data.data);
        setPagination(response.pagination ?? null);
      } catch (err) {
        const error = err as AxiosError;
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [url, JSON.stringify(options)]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, pagination, fetchData };
}

export default useFetch;
