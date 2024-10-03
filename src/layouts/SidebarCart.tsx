import { Button } from "@/components/button";
import { CartList } from "@/components/cartList";
import { Overlay } from "@/components/overlay";
import { cartItems } from "@/data/cartItems";
import useBodyOverflow from "@/hooks/useBodyOverflow";
import { cn } from "@/utils/cn";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

interface SidebarCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarCart: React.FC<SidebarCartProps> = ({ isOpen, onClose }) => {
  useBodyOverflow(isOpen);
  return (
    <>
      <div
        className={cn(
          `fixed w-[80vw] sm:w-[500px] h-screen bg-white top-0 bottom-0 right-0 z-50 transition-all translate-x-[100%] duration-200 ease-in-out`,
          {
            "translate-x-0": isOpen === true,
          }
        )}
      >
        <div className="flex flex-col w-full h-full px-5">
          <div className="flex items-center justify-between px-2 pt-8">
            <h2 className="text-3xl font-medium">Cart</h2>
            <IoCloseOutline
              className="text-3xl cursor-pointer xl:hidden"
              onClick={onClose}
            />
          </div>
          {/* Cart List */}
          <div className="flex-1 overflow-y-auto scroll-smooth">
            <CartList cartListItem={cartItems} />
          </div>

          <div className="px-2">
            <div className="flex items-baseline justify-between pt-4 pb-4">
              <span className="text-base">Subtotal</span>
              <span className="text-base font-medium">$99.00</span>
            </div>
            <hr />
            <div className="flex items-baseline justify-between pt-4 pb-6">
              <span className="text-lg font-medium">Total</span>
              <span className="text-xl font-medium">$234.00</span>
            </div>
            <Button className="w-full text-base font-normal" size="lg">
              Checkout
            </Button>
            <div className="flex items-center justify-center pt-4 pb-8">
              <Link
                to={"/"}
                className="font-semibold underline underline-offset-[4px]"
              >
                <span>View Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {isOpen && <Overlay onClick={onClose} />}
    </>
  );
};

export default SidebarCart;
