import { Heading } from "@/components/typography";
import { ProductCardList } from "@/components/productCardList";
import { LinkTo } from "@/components/linkTo";
import { products } from "@/data/product";
import { useEffect, useState } from "react";
import { Product } from "@/types/type";

const ProductCarousel = () => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);

  useEffect(() => {
    setNewProducts(products.filter((product) => product.isNew));
  }, []);

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
      <ProductCardList
        productCount={10}
        productList={newProducts}
        className="lg:grid-cols-4 xl:grid-cols-5"
      />
    </section>
  );
};

export default ProductCarousel;
