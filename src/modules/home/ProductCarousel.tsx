import { Heading } from "@/layouts/typography";
import { Link } from "react-router-dom";
import { IoArrowForward } from "react-icons/io5";
import { ProductCardList } from "@/components/productCardList";

const ProductCarousel = () => {
  return (
    <section className="relative mt-10 mb-10">
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
      <ProductCardList />
    </section>
  );
};

export default ProductCarousel;
