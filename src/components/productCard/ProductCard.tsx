import { Product } from "@/types/type";
import { CiHeart } from "react-icons/ci";
import { Button } from "../button";
import { Badge } from "../badge";
import { Rate } from "../rate";

interface ProductCardProps {
  productItem: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ productItem }) => {
  return (
    <div key={productItem.id} className="select-none">
      <div className="relative w-[250px] h-[350px] group/item overflow-hidden">
        <img
          src={productItem.imageProduct}
          alt={productItem.name}
          className="object-cover w-full h-full"
        />
        <div className="absolute flex flex-col gap-2 top-4 left-4">
          {productItem.isNew && <Badge className="bg-white">NEW</Badge>}
          {productItem.discount && (
            <Badge className="text-white bg-secondary-green">
              -{productItem.discount}%
            </Badge>
          )}
        </div>
        <div className="absolute flex items-center justify-center transition-all duration-300 ease-in-out translate-x-16 bg-white rounded-full shadow-md opacity-0 cursor-pointer group-hover/item:opacity-100 group-hover/item:translate-x-0 h-9 w-9 right-4 top-4">
          <CiHeart className="text-3xl text-gray-500" />
        </div>
        <div className="absolute transition-all duration-300 translate-y-20 opacity-0 group-hover/item:opacity-100 ease group-hover/item:translate-y-0 right-4 left-4 bottom-4">
          <Button>Add to cart</Button>
        </div>
      </div>
      <div className="flex flex-col items-start gap-2 mt-3">
        <div className="">
          <Rate numberRate={productItem.rating} />
        </div>
        <span className="text-base font-medium">{productItem.name}</span>
        <div className="flex items-center gap-3 pb-3">
          <span className="font-medium">${productItem.price}</span>
          <span className="text-gray-500 line-through">
            ${productItem.originalPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;