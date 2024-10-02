import { CartItemType } from "../cartList/CartList";

import { CgClose } from "react-icons/cg";
import { QuantitySelector } from "../quantitySelector";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  return (
    <div className="w-full">
      <div className="flex gap-4 py-6 border-b xl:py-8">
        <div className="w-[80px] h-[90px] shrink-0 xl:w-[100px] xl:h-[110px]">
          <img
            src={item.img}
            alt={item.title}
            className="object-center w-full h-full"
          />
        </div>

        <div className="flex flex-col items-stretch justify-between flex-1 text-sm">
          <h3 className="font-medium line-clamp-1 xl:text-lg">{item.title}</h3>
          <span className="text-[12px] font-light text-gray-600 xl:text-[15px]">
            Color: {item.color.join(", ")}
          </span>
          <QuantitySelector initialNumber={item.quantity} />
        </div>
        <div className="flex flex-col items-end flex-1 w-[100px]">
          <span className="text-sm font-medium xl:text-lg">${item.price}</span>

          <div className="mt-2 text-xl cursor-pointer xl:text-2xl">
            <CgClose />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
