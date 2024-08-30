import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../../styles/styles.css";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

interface IImageSlide {
  id: string;
  url: string;
}

const ImageSlide: React.FC = () => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [showNavigation, setShowNavigation] = useState(true);
  const navigationPrevRef = useRef<HTMLDivElement>(null);
  const navigationNextRef = useRef<HTMLDivElement>(null);

  const imageSlide: IImageSlide[] = [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: "4",
      url: "https://images.unsplash.com/photo-1592247350271-c5efb34dd967?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setShowNavigation(window.innerWidth >= 768); // 768px là breakpoint cho màn hình điện thoại
    };

    handleResize(); // Gọi lần đầu để thiết lập trạng thái ban đầu
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] md:h-[400px] lg:h-[500px] xl:h-[700px] group/item-hidden">
      <Swiper
        loop={true}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        navigation={
          showNavigation
            ? {
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }
            : false
        }
        pagination={{
          clickable: true,
        }}
        keyboard={true}
        mousewheel={true}
        modules={[Navigation, Pagination, Autoplay]}
        className="w-full h-full custom-swiper"
        onSwiper={(swiperInstance) => setSwiper(swiperInstance)}
      >
        {imageSlide.map((item) => (
          <SwiperSlide key={item.id} className="w-full h-full">
            <div className="flex items-center justify-center w-full h-full bg-gray-100">
              <img
                src={item.url}
                alt={`Slide ${item.id}`}
                className="object-bottom max-w-full max-h-full"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {showNavigation && (
        <>
          <div
            className="absolute select-none cursor-pointer left-[10px] z-10 -translate-y-1/2 top-1/2 w-[40px] h-[40px] lg:left-[40px] hover:bg-slate-100 transition-all bg-white flex items-center justify-center rounded-full xl:w-[50px] xl:h-[50px] xl:left-[40px] opacity-0 invisible group-hover/item-hidden:opacity-100 group-hover/item-hidden:visible duration-300"
            ref={navigationPrevRef}
            onClick={() => swiper?.slidePrev()}
          >
            <GoArrowLeft className="text-2xl" />
          </div>

          <div
            className="absolute select-none cursor-pointer right-[10px] z-10 -translate-y-1/2 top-1/2 w-[40px] h-[40px] lg:right-[40px] hover:bg-slate-100 transition-all bg-white flex items-center justify-center rounded-full xl:h-[50px] xl:w-[50px] xl:right-[40px]  opacity-0 invisible group-hover/item-hidden:opacity-100 group-hover/item-hidden:visible duration-300"
            ref={navigationNextRef}
            onClick={() => swiper?.slideNext()}
          >
            <GoArrowRight className="text-2xl" />
          </div>
        </>
      )}
    </div>
  );
};

export default ImageSlide;
