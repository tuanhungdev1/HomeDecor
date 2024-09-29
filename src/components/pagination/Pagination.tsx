import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onChangePageNumber: (num: number) => void;
  isSmall?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPage,
  onChangePageNumber,
  isSmall = false,
}) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPage <= 7) {
      for (let i = 1; i <= totalPage; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (currentPage > 3) {
        pageNumbers.push("...");
      }
      for (
        let i = Math.max(2, currentPage - 2);
        i <= Math.min(currentPage + 2, totalPage - 1);
        i++
      ) {
        pageNumbers.push(i);
      }
      if (currentPage < totalPage - 2) {
        pageNumbers.push("...");
      }
      pageNumbers.push(totalPage);
    }
    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center h-[45px] rounded-[5px] select-none w-full text-sm">
      <button
        onClick={() => onChangePageNumber(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`${
          currentPage === 1 && "pointer-events-none"
        } flex items-center w-[60px] transition-all duration-200 justify-center hover:bg-gray-100 h-full text-2xl cursor-pointer border-t-[2px] border-l-[2px] border-b-[2px] rounded-tl-[5px] rounded-bl-[5px] disabled:opacity-50`}
      >
        <MdOutlineKeyboardArrowRight className="text-gray-600 rotate-180" />
      </button>

      {getPageNumbers().map((number, index) => (
        <button
          key={index}
          onClick={() =>
            typeof number === "number" && onChangePageNumber(number)
          }
          className={`
            w-[50px] cursor-pointer border-t-[2px] text-lg border-b-[2px] h-full flex items-center justify-center
            ${
              number === currentPage
                ? "bg-gray-600 text-white border-t-gray-600 border-b-gray-600"
                : "hover:bg-gray-100"
            }
            ${typeof number !== "number" ? "cursor-default" : ""}
          `}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => onChangePageNumber(Math.min(totalPage, currentPage + 1))}
        disabled={currentPage === totalPage}
        className="flex items-center min-w-min px-4 font-medium text-white bg-green-600 justify-center hover:bg-green-700 transition-all duration-200 h-full cursor-pointer border-t-[2px] border-r-[2px] border-b-[2px] rounded-tr-[5px] rounded-br-[5px] border-green-600 hover:border-green-700 disabled:opacity-50"
      >
        {isSmall && <span>Next Page</span>}
        <MdOutlineKeyboardArrowRight className="-ml-1 text-2xl" />
      </button>
    </div>
  );
};

export default Pagination;
