import { useState, useEffect, useCallback, DependencyList } from "react";
import { AxiosResponse, AxiosError } from "axios";

type ServiceFunction<TData, TParams> = (
  params?: TParams
) => Promise<AxiosResponse<TData>>;

interface UseFetchDataResult<TData> {
  data: TData | null;
  loading: boolean;
  error: AxiosError | null;
  refetch: () => void;
}

function useFetchData<TData, TParams = void>(
  serviceFunction: ServiceFunction<TData, TParams>,
  params?: TParams,
  dependencies: DependencyList = []
): UseFetchDataResult<TData> {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await serviceFunction(params);
      setData(response.data);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err as AxiosError);
      } else {
        setError(new Error("An unknown error occurred") as AxiosError);
      }
      setData(null);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceFunction, params, ...dependencies]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}

export default useFetchData;
