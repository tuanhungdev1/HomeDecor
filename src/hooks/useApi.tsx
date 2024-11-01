/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiClient } from "@/configs/axiosInstance";
import { RequestConfig } from "@/types/api.types";
import { useState, useCallback } from "react";

// interface UseApiOptions<T> {
//   onSuccess?: (data: T) => void;
//   onError?: (error: any) => void;
//   initialData?: T;
// }

export function useApi<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const execute = useCallback(async (config: RequestConfig) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiClient.getInstance().request<T>(config);
      setData(response.data);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, execute };
}
