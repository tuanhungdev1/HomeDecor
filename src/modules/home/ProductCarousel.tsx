import { Heading } from "@/layouts/typography";
import { Link } from "react-router-dom";
import { IoArrowForward } from "react-icons/io5";
import { Product } from "@/types/type";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { CiHeart } from "react-icons/ci";
import { Rate } from "@/components/rate";

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

const ProductCarousel = () => {
  return (
    <section className="mt-10 mb-10">
      <div className="relative mb-10">
        <Heading className="">New</Heading>
        <Heading className="">Arrivals</Heading>

        <Link to={"/"} className="absolute bottom-0 right-0 hidden md:block">
          <span className="flex items-center gap-2 text-xl underline">
            More Products
            <span>
              <IoArrowForward />
            </span>
          </span>
        </Link>
      </div>
      <div className="mt-5">
        <div className="flex gap-5">
          {products.map((product) => (
            <div key={product.id}>
              <div className="relative w-[250px] h-[350px]">
                <img
                  src={product.imageProduct}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute flex flex-col gap-2 top-4 left-4">
                  {product.isNew && <Badge className="bg-white">NEW</Badge>}
                  {product.discount && (
                    <Badge className="text-white bg-secondary-green">
                      -{product.discount}%
                    </Badge>
                  )}
                </div>
                <div className="absolute flex items-center justify-center bg-white rounded-full shadow-md h-9 w-9 right-4 top-4">
                  <CiHeart className="text-3xl text-gray-500" />
                </div>
                <div className="absolute right-4 left-4 bottom-4">
                  <Button>Add to cart</Button>
                </div>
              </div>
              <div>
                <div className="mt-3 mb-2">
                  <Rate numberRate={product.rating} />
                </div>
                <span className="text-base font-medium">{product.name}</span>
                <div className="flex items-center gap-3 pb-3 mt-1">
                  <span className="font-medium">${product.price}</span>
                  <span className="text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
