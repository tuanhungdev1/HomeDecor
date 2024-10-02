import { ProductCard } from "@/components/productCard";
import { Product } from "@/types/type";
import "swiper/css";
import "swiper/css/scrollbar";
import "../../styles/swiperStyleProductList.css";
import { useEffect, useState } from "react";

// Import ProductCardSkeleton
import ProductCardSkeleton from "@/components/productCard/ProductCardSkeleton";

interface ProductCardListProps {
  productCount?: number;
  productList: Product[];
  className?: string;
  isLoading?: boolean; // Thêm prop isLoading
}

const ProductCardList: React.FC<ProductCardListProps> = ({
  productCount = 0,
  productList,
  className,
  isLoading = false, // Set default value
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  const numberElement = productCount === 0 ? productList.length : productCount;

  useEffect(() => {
    if (numberElement > 0) {
      setProducts(productList.slice(0, numberElement));
    }
  }, [numberElement, productList]);

  // Render skeleton khi đang loading
  if (isLoading) {
    return (
      <div
        className={`relative grid grid-cols-2 gap-4 mt-5 md:grid-cols-3 gap-y-6 ${className}`}
      >
        {/* Tạo mảng với độ dài bằng numberElement để render skeleton */}
        {Array.from({ length: numberElement }).map((_, index) => (
          <ProductCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`relative grid grid-cols-2 gap-4 mt-5 md:grid-cols-3 gap-y-6 ${className}`}
    >
      {products.map((product) => (
        <ProductCard productItem={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductCardList;
