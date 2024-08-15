import { FaInstagram } from "react-icons/fa";
import { TbBrandFacebook } from "react-icons/tb";
import { FiYoutube } from "react-icons/fi";

interface SocialItem {
  id: number;
  icon: (className: string) => React.ReactNode;
  url: string;
}

export const SocialItemList: SocialItem[] = [
  {
    id: 1,
    icon: (className: string) => <FaInstagram className={`${className}`} />,
    url: "/",
  },
  {
    id: 2,
    icon: (className: string) => <TbBrandFacebook className={`${className}`} />,
    url: "/",
  },
  {
    id: 3,
    icon: (className: string) => <FiYoutube className={`${className}`} />,
    url: "/",
  },
];
