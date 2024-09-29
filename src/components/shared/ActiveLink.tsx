import { IMenuItem } from "@/types/type";
import { NavLink } from "react-router-dom";

interface ActiveLinkProps {
  itemLink: IMenuItem;
  currenLink?: string;
}

const ActiveLink: React.FC<ActiveLinkProps> = ({ itemLink }) => {
  return (
    <NavLink
      to={itemLink.url}
      className={({ isActive }) =>
        `${isActive ? "text-black" : "text-gray-400"} cursor-pointer`
      }
    >
      {itemLink.title}
    </NavLink>
  );
};

export default ActiveLink;
