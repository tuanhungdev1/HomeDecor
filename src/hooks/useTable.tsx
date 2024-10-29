/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from "react";

interface UseTableReturnValue<T> {
  currentData: T[];
  pageSize: number;
  setPageSize: (size: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortKey: keyof T | "";
  setSortKey: (key: keyof T) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (order: "asc" | "desc") => void;
  totalPages: number;
}

// Khai báo interface cho tham số của hook
interface UseTableParams<T> {
  data: T[];
  initialPageSize?: number;
}

// Tạo hook useTable
const useTable = <T,>({
  data,
  initialPageSize = 10,
}: UseTableParams<T>): UseTableReturnValue<T> => {
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<keyof T | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredData = useMemo(() => {
    const searchFiltered = data.filter((item) =>
      Object.values(item as any).some((value) => {
        if (value !== null && value !== undefined) {
          return String(value).toLowerCase().includes(searchTerm.toLowerCase());
        }

        return false;
      })
    );

    // Sau đó sort nếu có sortKey
    if (sortKey) {
      return [...searchFiltered].sort((a, b) => {
        if (sortOrder.substring(0, 3) === "asc") {
          return (a[sortKey] as any) > (b[sortKey] as any) ? 1 : -1;
        }
        return (a[sortKey] as any) < (b[sortKey] as any) ? 1 : -1;
      });
    }

    return searchFiltered;
  }, [data, searchTerm, sortKey, sortOrder]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [currentPage, pageSize, filteredData]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  return {
    currentData,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    sortKey,
    setSortKey,
    sortOrder,
    setSortOrder,
    totalPages,
  };
};

export default useTable;
