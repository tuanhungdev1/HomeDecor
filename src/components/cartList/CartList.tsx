import { cn } from "@/utils/cn";
import { CartItem } from "../cartItem";

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
}

const CartList: React.FC<CartListProps> = ({ cartListItem, className }) => {
  return (
    <div className={cn("", className)}>
      {cartListItem.map((item) => (
        <CartItem item={item} />
      ))}
    </div>
  );
};

export default CartList;
