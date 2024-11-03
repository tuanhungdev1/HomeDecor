/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";

interface TableParams<T> {
  pageSize: number;
  pageNumber: number;
  searchTerm: string;
  name: string;
  sortKey: SortKey<T>;
  orderBy: "asc" | "desc";
}

type SortKey<T> = keyof T | "";

interface UseTableReturn<T> extends TableParams<T> {
  setPageSize: (size: number) => void;
  setName: (name: string) => void;
  setPageNumber: (page: number) => void;
  setSearchTerm: (term: string) => void;
  setSortKey: (key: keyof T) => void;
  setOrderBy: (order: "asc" | "desc") => void;
  resetTable: () => void;
  handleTableChange: (pagination: any, filters: any, sorter: any) => void;
}

interface UseTableProps<T> {
  initialPageSize?: number;
  onParamsChange?: (params: TableParams<T>) => void;
  defaultSortKey?: SortKey<T>;
  defaultOrderBy?: "asc" | "desc";
}

const useTable = <T,>({
  initialPageSize = 10,
  onParamsChange,
  defaultSortKey = "" as SortKey<T>,
  defaultOrderBy = "asc",
}: UseTableProps<T> = {}): UseTableReturn<T> => {
  const [tableParams, setTableParams] = useState<TableParams<T>>({
    pageSize: initialPageSize,
    pageNumber: 1,
    searchTerm: "",
    name: "",
    sortKey: defaultSortKey,
    orderBy: defaultOrderBy,
  });

  useEffect(() => {
    onParamsChange?.(tableParams);
  }, [JSON.stringify(tableParams), JSON.stringify(onParamsChange)]);

  const updateParams = useCallback((updates: Partial<TableParams<T>>) => {
    setTableParams((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  const setPageSize = useCallback(
    (size: number) => {
      updateParams({ pageSize: size });
    },
    [updateParams]
  );

  const setPageNumber = useCallback(
    (page: number) => {
      updateParams({ pageNumber: page });
    },
    [updateParams]
  );

  const setSearchTerm = useCallback(
    (term: string) => {
      updateParams({ searchTerm: term });
    },
    [updateParams]
  );

  const setName = useCallback(
    (name: string) => {
      updateParams({ name: name });
    },
    [updateParams]
  );

  const setSortKey = useCallback(
    (key: keyof T) => {
      updateParams({ sortKey: key });
    },
    [updateParams]
  );

  const setOrderBy = useCallback(
    (order: "asc" | "desc") => {
      updateParams({ orderBy: order });
    },
    [updateParams]
  );

  const handleTableChange = useCallback(
    (pagination: any, _filters: any, sorter: any) => {
      const updates: Partial<TableParams<T>> = {
        pageNumber: pagination.current,
        pageSize: pagination.pageSize,
      };

      if (sorter.field) {
        updates.sortKey = sorter.field;
        updates.orderBy = sorter.order === "desc" ? "desc" : "asc";
      }

      updateParams(updates);
    },
    [updateParams]
  );

  const resetTable = useCallback(() => {
    setTableParams({
      pageSize: initialPageSize,
      pageNumber: 1,
      searchTerm: "",
      name: "",
      sortKey: defaultSortKey,
      orderBy: defaultOrderBy,
    });
  }, [initialPageSize, defaultSortKey, defaultOrderBy]);

  return {
    ...tableParams,
    setName,
    setPageSize,
    setPageNumber,
    setSearchTerm,
    setSortKey,
    setOrderBy,
    resetTable,
    handleTableChange,
  };
};

export default useTable;
