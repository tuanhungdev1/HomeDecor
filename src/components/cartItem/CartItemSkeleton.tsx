const CartItemSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      <div className="flex gap-4 py-6 border-b xl:py-8">
        <div className="w-[80px] h-[90px] shrink-0 xl:w-[100px] xl:h-[110px] bg-gray-200"></div>

        <div className="flex flex-col items-stretch justify-between flex-1 text-sm">
          <h3 className="w-full h-4 font-medium bg-gray-200 rounded-md xl:h-6 line-clamp-1 xl:text-lg"></h3>
          <span className="text-[12px] font-light text-gray-600 xl:text-[15px] bg-gray-200 w-1/2 h-4 xl:h-6 rounded-md"></span>
          <div className="flex overflow-hidden">
            <div className="w-[30px] h-[30px] rounded-l-md xl:w-[40px] xl:h-[30px] bg-gray-200"></div>
            <div className="w-8 bg-gray-200"></div>
            <div className="w-[30px] h-[30px] xl:w-[40px] rounded-r-md xl:h-[30px] bg-gray-200"></div>
          </div>
        </div>
        <div className="flex flex-col items-end flex-1 w-[100px]">
          <span className="w-1/3 h-4 text-sm font-medium bg-gray-200 rounded-md xl:h-6 xl:text-lg"></span>

          <div className="w-6 h-4 mt-2 text-xl bg-gray-200 rounded-md cursor-pointer xl:w-10 xl:h-5 xl:text-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default CartItemSkeleton;
