/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

interface UseTableReturnValue<T> {
  pageSize: number;
  setPageSize: (size: number) => void;
  pageNumber: number;
  setPageNumber: (page: number) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortKey: keyof T | "";
  setSortKey: (key: keyof T) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (order: "asc" | "desc") => void;
}

const useTable = <T,>(initialPageSize: number = 10): UseTableReturnValue<T> => {
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<keyof T | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    setPageNumber(1);
  }, [searchTerm]);

  return {
    pageSize,
    setPageSize,
    pageNumber,
    setPageNumber,
    searchTerm,
    setSearchTerm,
    sortKey,
    setSortKey,
    sortOrder,
    setSortOrder,
  };
};

export default useTable;
