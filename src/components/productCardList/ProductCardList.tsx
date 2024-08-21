import { ProductCard } from "@/components/productCard";
import { Product } from "@/types/type";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Scrollbar } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "../../styles/swiperStyleProductList.css";

const products: Product[] = [
  {
    id: "1",
    name: "Tray Table Black",
    price: 199.0,
    originalPrice: 400.0,
    discount: 50,
    imageProduct: "/public/productCardImage.png",
    isNew: true,
    rating: 4.5,
  },
  {
    id: "2",
    name: "Round Coffee Table",
    price: 250.0,
    originalPrice: 500.0,
    discount: 50,
    imageProduct: "/public/productCardImage.png",
    isNew: false,
    rating: 4.7,
  },
  {
    id: "3",
    name: "Modern Desk Lamp",
    price: 150.0,
    originalPrice: 300.0,
    discount: 50,
    imageProduct: "/public/productCardImage.png",
    isNew: true,
    rating: 4.3,
  },
  {
    id: "4",
    name: "Accent Chair",
    price: 350.0,
    originalPrice: 700.0,
    discount: 50,
    imageProduct: "/public/productCardImage.png",
    isNew: false,
    rating: 4.8,
  },
  {
    id: "5",
    name: "Wooden Bookshelf",
    price: 299.0,
    originalPrice: 599.0,
    discount: 50,
    imageProduct: "/public/productCardImage.png",
    isNew: true,
    rating: 4.6,
  },
  {
    id: "6",
    name: "Minimalist Sofa",
    price: 899.0,
    originalPrice: 1799.0,
    discount: 50,
    imageProduct: "/public/productCardImage.png",
    isNew: false,
    rating: 4.9,
  },
];

const ProductCardList: React.FC = () => {
  return (
    <div className="relative mt-5">
      <Swiper
        scrollbar={{
          hide: false,
        }}
        className="swiper"
        modules={[Scrollbar]}
        breakpoints={{
          300: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          420: {
            slidesPerView: 1.5,
            spaceBetween: 10,
          },
          500: {
            slidesPerView: 1.7,
            spaceBetween: 10,
          },
          620: {
            slidesPerView: 2.3,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2.7,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3.7,
            spaceBetween: 10,
          },
          1280: {
            slidesPerView: 4.6,
            spaceBetween: 10,
          },
          1536: {
            slidesPerView: 5.6,
            spaceBetween: 10,
          },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard productItem={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductCardList;