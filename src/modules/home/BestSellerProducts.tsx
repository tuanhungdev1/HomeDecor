import { LinkTo } from "@/components/linkTo";
import { ProductCardList } from "@/components/productCardList";
import { Heading } from "@/components/typography";
import { products } from "@/data/product";
import { Product } from "@/types/type";
import { useEffect, useState } from "react";

const BestSellerProducts = () => {
  const [betSellerProducts, setBetSellerProducts] = useState<Product[]>([]);

  useEffect(() => {
    setBetSellerProducts(
      [...products]
        .sort((a, b) => {
          if (a.discount === undefined) return -1;
          if (b.discount === undefined) return 1;
          return b.discount - a.discount;
        })
        .filter((product) => product.discount)
    );
  }, []);
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
      <ProductCardList
        productCount={5}
        productList={betSellerProducts}
        className="lg:grid-cols-4 xl:grid-cols-5"
      />
    </section>
  );
};

export default BestSellerProducts;
