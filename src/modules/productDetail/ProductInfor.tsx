import { Badge } from "@/components/badge";
import { BlurImage } from "@/components/blurImage";
import CountdownTimer from "@/components/countdownTimer/CountdownTimer";
import { Rate } from "@/components/rate";
import { products } from "@/data/product";
import { Category, ColorVariant, Product, ProductImage } from "@/types/type";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { QuantitySelector } from "@/components/quantitySelector";
import { Button } from "@/components/button";
import { LuHeart } from "react-icons/lu";
import "../../styles/styleSwipperProductDetail.css";

const ProductInfor = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [colorVariant, setColorVariant] = useState<ColorVariant | null>(null);
  //   const [categories, setCategories] = useState<Category[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentImageSlide, setCurrentImageSlide] = useState(0);
  const [imageShow, setImageShow] = useState<ProductImage | null>();
  const { id } = useParams();

  const handleSelectedColorVariant = (id: number) => {
    setColorVariant(product?.colors.find((color) => color.id === id) ?? null);
  };

  const handleSelectedImageShow = (id: number) => {
    setImageShow(colorVariant?.images.find((img) => img.id === id));
  };

  useEffect(() => {
    if (product) {
      setColorVariant(
        product.colors.find((color) =>
          color?.images.find((img) => img.isDefault)
        ) ?? null
      );
    }
  }, [product]);

  function GetCategoryChain(
    category: Category | undefined,
    separator: string = " > "
  ): string {
    if (!category) {
      return ""; // Nếu category undefined, trả về chuỗi rỗng
    }

    // Nếu có parent category, đệ quy lấy tên của category cha
    const parentChain = category.parent
      ? GetCategoryChain(category.parent, separator) + separator
      : "";

    // Kết quả là chuỗi bao gồm tên của category cha (nếu có) và tên của chính category hiện tại
    return parentChain + category.name;
  }

  useEffect(() => {
    if (colorVariant) {
      setImageShow(colorVariant.images.find((item) => item.isDefault) ?? null);
    }
  }, [colorVariant]);

  useEffect(() => {
    setProduct(
      products.find((item) => item.id === parseInt(id || "1")) ?? null
    );
  }, [id]);

  console.log(product);

  return (
    product && (
      <div>
        <div className="flex flex-col gap-6 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-20 sm:flex-row">
          {/* Image */}
          <div className="flex-1">
            <div className="flex flex-col gap-4">
              <div className="aspect-[3/4] relative">
                {imageShow && (
                  <BlurImage alt={product.name} src={imageShow!.url} />
                )}
                <div className="absolute flex flex-col gap-2 top-5 left-5">
                  {product.isNew && (
                    <div className="">
                      <Badge className="bg-white h-[30px]">New</Badge>
                    </div>
                  )}

                  {product.discount && (
                    <div className="">
                      <Badge className="text-white bg-secondary-green h-[30px]">
                        -{product.discount}%
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
              <div className="hidden w-full h-auto sm:block">
                {colorVariant && (
                  <div className="grid grid-cols-1 relative sm:h-[80px] lg:h-[100px] xl:h-[200px] gap-4 select-none">
                    {currentImageSlide !== 0 && (
                      <div className="absolute top-0 left-0 z-50 w-16 h-full pointer-events-none bg-gradient-to-r from-[rgba(255,255,255,0.8)] to-transparent"></div>
                    )}
                    {/* Right fade overlay */}
                    {currentImageSlide !== product.colors.length - 4 && (
                      <div className="absolute top-0 right-0 z-50 w-16 h-full pointer-events-none bg-gradient-to-l from-[rgba(255,255,255,0.8)] to-transparent"></div>
                    )}
                    <Swiper
                      slidesPerView={3}
                      spaceBetween={16}
                      pagination={{
                        clickable: true,
                      }}
                      onSlideChange={(swiper) =>
                        setCurrentImageSlide(swiper.activeIndex)
                      }
                      className="flex items-center justify-around mySwiper"
                    >
                      {colorVariant.images.map((image) => (
                        <SwiperSlide
                          key={image.id}
                          className={`cursor-pointer ${
                            image.id === colorVariant?.id
                              ? "border-[3px] border-black"
                              : "border-0"
                          } w-full h-full`}
                          onClick={() => handleSelectedImageShow(image.id)}
                        >
                          <div className="w-full h-full">
                            <BlurImage src={image.url} alt={product.name} />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* information */}
          <div className="flex-1">
            <div className="">
              {/* Rating */}
              <div className="flex items-center gap-3">
                <Rate
                  numberRate={product.rating}
                  color="text-gray-700"
                  size="small"
                />
                <span className="text-[12px] mt-1">
                  {product.reviewCount} Reviews
                </span>
              </div>
              {/* Name */}
              <h1 className="mt-4 text-3xl font-medium">{product.name}</h1>
              <p className="text-[13px] text-gray-500 mt-4 leading-[22px]">
                {product.description}
              </p>

              <div className="flex items-center gap-4 mt-4">
                <span className="text-2xl font-medium">${product.price}</span>
                <span className="relative text-lg font-medium text-gray-500">
                  ${product.originalPrice}
                  <div className="w-full top-1/2 left-0 -translate-y-1/2 h-[1px] absolute bg-gray-500"></div>
                </span>
              </div>

              {product.discountExpiry && (
                <div className="py-6 border-t-[1px] border-b-[1px] mt-4">
                  <span className="text-base text-gray-700">
                    Offer expires in:
                  </span>
                  <div className="mt-4">
                    <CountdownTimer targetDate={product.discountExpiry} />
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3 mt-6">
                <span className="font-medium text-gray-600">Measurements</span>
                <span className="text-lg">{product.measurements}</span>
              </div>

              <div className="flex flex-col w-full gap-4 mt-6">
                <span className="flex items-center gap-2 font-medium text-gray-600">
                  Choose Color <IoIosArrowForward />
                </span>

                <span className="text-base text-black">
                  {colorVariant?.colorName}
                </span>

                <div className="relative grid h-[100px] sm:h-[60px] lg:h-[80px] xl:h-[120px] grid-cols-1 mt-4 xl:w-[500px] select-none">
                  {/* Left fade overlay */}
                  {currentSlide !== 0 && (
                    <div className="absolute top-0 left-0 z-50 w-16 h-full pointer-events-none bg-gradient-to-r from-[rgba(255,255,255,0.8)] to-transparent"></div>
                  )}
                  {/* Right fade overlay */}
                  {currentSlide !== product.colors.length - 4 && (
                    <div className="absolute top-0 right-0 z-50 w-16 h-full pointer-events-none bg-gradient-to-l from-[rgba(255,255,255,0.8)] to-transparent"></div>
                  )}
                  <Swiper
                    slidesPerView={4}
                    spaceBetween={20}
                    pagination={{
                      clickable: true,
                    }}
                    onSlideChange={(swiper) =>
                      setCurrentSlide(swiper.activeIndex)
                    } // Cập nhật currentSlide khi thay đổi
                    className="w-full h-full mySwiper"
                  >
                    {product.colors.map((color) => (
                      <SwiperSlide
                        key={color.id}
                        className={`cursor-pointer ${
                          color.id === colorVariant?.id
                            ? "border-[3px] border-black"
                            : "border-0"
                        }`}
                      >
                        <div
                          key={color.id}
                          className="w-full h-full"
                          onClick={() => handleSelectedColorVariant(color.id)}
                        >
                          <BlurImage
                            src={color.images[0].url}
                            alt={product.name}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                <div className="flex items-center gap-4 mt-8">
                  <QuantitySelector variant="filled" className="" size="lg" />
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-[2px] w-full flex gap-2"
                  >
                    <LuHeart /> Wishlist
                  </Button>
                </div>
                <div>
                  <Button className="w-full" size="lg">
                    Add to Cart
                  </Button>
                </div>

                <hr className="mt-6" />
                <div className="flex flex-col w-full gap-6 mt-4 xl:w-1/2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">SKU</span>
                    <span>{product.sku}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">CATEGORY</span>
                    <span>
                      {product.categories
                        .map((item) => GetCategoryChain(item, ""))
                        .join(", ")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductInfor;
