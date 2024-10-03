import { cn } from "@/utils/cn";
import { CartItem, CartItemSkeleton } from "../cartItem";

export interface CartItemType {
  id: number;
  title: string;
  color: string[];
  quantity: number;
  price: number;
  img: string;
}

interface CartListProps {
  cartListItem: CartItemType[];
  className?: string;
  isLoading?: boolean;
  numberElement?: number;
}

const CartList: React.FC<CartListProps> = ({
  cartListItem,
  className,
  isLoading = false,
  numberElement = 4,
}) => {
  if (isLoading) {
    return (
      <div className={cn("px-2", className)}>
        {Array.from({ length: numberElement }).map((_, index) => (
          <CartItemSkeleton key={index} />
        ))}
      </div>
    );
  }
  return (
    <div className={cn("px-2", className)}>
      {cartListItem.map((item) => (
        <CartItem item={item} />
      ))}
    </div>
  );
};

export default CartList;
