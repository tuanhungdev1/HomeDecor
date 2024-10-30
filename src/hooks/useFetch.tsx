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
        const response = await axiosInstance({
          url,
          ...options,
          ...config,
        });

        setData(response.data.data);

        const paginationHeaders = JSON.parse(response.headers["x-pagination"]);

        const pagination: Pagination = {
          currentPage: parseInt(paginationHeaders.currentPage || "1", 10),
          totalPages: parseInt(paginationHeaders.totalPage || "1", 10),
          pageSize: parseInt(paginationHeaders.pageSize || "10", 10),
          totalCount: parseInt(paginationHeaders.totalCount || "0", 10),
          hasNext: Boolean(paginationHeaders.hasNext),
          hasPrevious: Boolean(paginationHeaders.hasPrevious),
        };

        setPagination(pagination);
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
