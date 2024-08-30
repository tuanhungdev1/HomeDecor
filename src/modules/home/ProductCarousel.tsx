import { Heading } from "@/components/typography";
import { ProductCardList } from "@/components/productCardList";
import { LinkTo } from "@/components/linkTo";

const ProductCarousel = () => {
  return (
    <section className="relative mt-10 mb-10">
      <div className="relative flex items-end justify-between mb-10">
        <div>
          <Heading className="">New</Heading>
          <Heading className="">Arrivals</Heading>
        </div>

        <LinkTo url="/" className="text-lg xl:text-xl">
          More Products
        </LinkTo>
      </div>
      <ProductCardList />
    </section>
  );
};

export default ProductCarousel;
