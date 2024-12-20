import { useState } from "react";
import { Link } from "react-router-dom";
import { RiDiscountPercentLine } from "react-icons/ri";
import { IoCloseOutline } from "react-icons/io5";
import { LinkTo } from "../linkTo";

const PromotionalBanner = () => {
  const [isShowPromotionalBanner, setIsShowPromotionalBanner] =
    useState<boolean>(true);

  const handleShowPromotionalBannerClick = () => {
    setIsShowPromotionalBanner(false);
  };
  return (
    <>
      {isShowPromotionalBanner && (
        <div className="relative flex items-center justify-center w-full h-12 gap-4 text-sm font-medium lg:h-14 xl:text-lg bg-secondary-gray">
          <div className="flex items-center gap-3">
            <div>
              <RiDiscountPercentLine className="text-2xl xl:text-3xl" />
            </div>
            <span>30% off storewide — Limited time!</span>
          </div>
          <Link
            to={"/shop"}
            className="items-center hidden gap-2 md:flex text-secondary-blue"
          >
            <LinkTo url="/" className="text-lg" colorLine="bg-secondary-blue">
              Shop Now
            </LinkTo>
          </Link>

          <div
            className="absolute p-2 cursor-pointer right-3"
            onClick={handleShowPromotionalBannerClick}
          >
            <IoCloseOutline className="text-2xl" />
          </div>
        </div>
      )}
    </>
  );
};

export default PromotionalBanner;
