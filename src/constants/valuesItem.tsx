import { LiaShippingFastSolid } from "react-icons/lia";
import { CiMoneyCheck1 } from "react-icons/ci";

import { BsTelephone } from "react-icons/bs";
import { AiOutlineSecurityScan } from "react-icons/ai";
export interface IValueItem {
  icon: (className: string) => React.ReactNode;
  title: string;
  subTitle: string;
}

export const valuesItem: IValueItem[] = [
  {
    icon: (className) => <LiaShippingFastSolid className={`${className}`} />,
    title: "Free Shipping",
    subTitle: "Order above $200",
  },
  {
    icon: (className) => <CiMoneyCheck1 className={`${className}`} />,
    title: "Money-back",
    subTitle: "30 days guarantee",
  },
  {
    icon: (className) => <AiOutlineSecurityScan className={`${className}`} />,
    title: "Secure Payments",
    subTitle: "Secured by Stripe",
  },
  {
    icon: (className) => <BsTelephone className={`${className}`} />,
    title: "24/7 Support",
    subTitle: "Phone and Email support",
  },
];
