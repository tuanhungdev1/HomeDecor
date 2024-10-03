import { Badge } from "@/components/badge";
import { BlurImage } from "@/components/blurImage";
import CountdownTimer from "@/components/countdownTimer/CountdownTimer";
import { Rate } from "@/components/rate";
import { products } from "@/data/product";
import { ColorVariant, Product } from "@/types/type";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const ProductInfor = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [colorVariant, setColorVariant] = useState<ColorVariant | null>(null);
  //   const [categories, setCategories] = useState<Category[]>([]);

  const { id } = useParams();

  useEffect(() => {
    if (product) {
      setColorVariant(
        product.colors.find((color) =>
          color?.images.find((img) => img.isDefault)
        ) ?? null
      );
    }
  }, [product]);

  useEffect(() => {
    setProduct(
      products.find((item) => item.id === parseInt(id || "1")) ?? null
    );
  }, [id]);

  return (
    product && (
      <div>
        <div className="flex flex-col gap-6 sm:gap-12 sm:flex-row">
          {/* Image */}
          <div className="flex-1">
            <div className="flex flex-col gap-4">
              <div className="aspect-[3/4] relative">
                {colorVariant && (
                  <BlurImage
                    alt={product.name}
                    src={colorVariant.images[0].url}
                  />
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
              <div className=" hidden sm:block w-full h-[100px]">
                {colorVariant && (
                  <div className="flex w-full h-full gap-2">
                    {colorVariant.images.map((item) => (
                      <div key={item.id}>
                        <BlurImage alt={product.name} src={item.url} />
                      </div>
                    ))}
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

              {product.discount && (
                <div className="py-6 border-t-[1px] border-b-[1px] mt-4">
                  <span className="text-base text-gray-700">
                    Offer expires in:
                  </span>
                  <div className="mt-4">
                    <CountdownTimer
                      targetDate={new Date("2024-12-31T00:00:00")}
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3 mt-6">
                <span className="font-medium text-gray-600">Measurements</span>
                <span className="text-lg">{product.measurements}</span>
              </div>

              <div className="flex flex-col gap-2 mt-6">
                <span className="flex items-center gap-2 font-medium text-gray-600">
                  Choose Color <IoIosArrowForward />
                </span>

                <span className="text-base text-black">
                  {colorVariant?.colorName}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductInfor;
