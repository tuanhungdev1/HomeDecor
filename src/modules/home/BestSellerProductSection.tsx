import { ProductCard } from "@/components/productCard";
import { Heading } from "@/components/typography";
import { products } from "@/data/product";

const BestSellerProductSection = () => {
  return (
    <div className="mt-10">
      <Heading>Best Seller</Heading>
      <div className="grid mt-10 xl:grid-cols-4 gap-y-10 lg:grid-cols-3">
        {products.map((item) => (
          <ProductCard key={item.id} productItem={item} />
        ))}
      </div>
    </div>
  );
};

export default BestSellerProductSection;
