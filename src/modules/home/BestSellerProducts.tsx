import { LinkTo } from "@/components/linkTo";
import { ProductCardList } from "@/components/productCardList";
import { Heading } from "@/components/typography";
import { productSellerList } from "@/data/productSellerList";

const BestSellerProducts = () => {
  return (
    <section className="relative mt-10 mb-10">
      <div className="relative flex items-end justify-between mb-10">
        <div>
          <Heading className="">Best</Heading>
          <Heading className="">Seller</Heading>
        </div>

        <LinkTo url="/" className="text-lg xl:text-xl">
          More Products
        </LinkTo>
      </div>
      <ProductCardList productCount={5} productList={productSellerList} />
    </section>
  );
};

export default BestSellerProducts;
