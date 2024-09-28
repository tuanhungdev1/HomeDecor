import { ProductCard } from "@/components/productCard";
import { Product } from "@/types/type";

import "swiper/css";
import "swiper/css/scrollbar";
import "../../styles/swiperStyleProductList.css";
import { useEffect, useState } from "react";

interface ProductCardListProps {
  productCount?: number;
  productList: Product[];
  className?: string;
}

const ProductCardList: React.FC<ProductCardListProps> = ({
  productCount = 0,
  productList,
  className,
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  const numberElement = productCount === 0 ? productList.length : productCount;

  useEffect(() => {
    if (numberElement > 0) {
      setProducts(productList.slice(0, numberElement));
    }
  }, [numberElement, productList]);

  return (
    <div
      className={`relative grid grid-cols-2 gap-4 mt-5 md:grid-cols-4 gap-y-6 xl:grid-cols-5 ${className}`}
    >
      {products.map((product) => (
        <ProductCard productItem={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductCardList;
