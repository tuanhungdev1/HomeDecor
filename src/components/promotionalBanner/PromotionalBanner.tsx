import { useState } from "react";
import { Link } from "react-router-dom";
import { RiDiscountPercentLine } from "react-icons/ri";
import { IoArrowForwardOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const PromotionalBanner = () => {
  const [isShowPromotionalBanner, setIsShowPromotionalBanner] =
    useState<boolean>(true);

  const handleShowPromotionalBannerClick = () => {
    setIsShowPromotionalBanner(false);
  };
  return (
    <>
      {isShowPromotionalBanner && (
        <div className="relative flex items-center justify-center w-full h-12 gap-4 text-lg font-medium lg:h-16 xl:text-xl bg-secondary-gray">
          <div className="flex items-center gap-3">
            <div>
              <RiDiscountPercentLine className="text-3xl xl:text-4xl" />
            </div>
            <span>30% off storewide — Limited time!</span>
          </div>
          <Link
            to={"/shop"}
            className="items-center hidden gap-2 underline md:flex text-secondary-blue"
          >
            <span>Shop Now</span>
            <div>
              <IoArrowForwardOutline className="text-2xl" />
            </div>
          </Link>

          <div
            className="absolute p-2 cursor-pointer right-3"
            onClick={handleShowPromotionalBannerClick}
          >
            <IoClose className="text-3xl" />
          </div>
        </div>
      )}
    </>
  );
};

export default PromotionalBanner;
