import { IMenuItem } from "@/types/type";
import { Link } from "react-router-dom";

interface ActiveLinkProps {
  itemLink: IMenuItem;
  currenLink: string;
  onSelectedLink: (id: string) => void;
}

const ActiveLink: React.FC<ActiveLinkProps> = ({
  itemLink,
  currenLink,
  onSelectedLink,
}) => {
  return (
    <Link
      to={itemLink.url}
      className={`${
        currenLink === itemLink.id ? "text-black" : "text-gray-400"
      } cursor-pointer`}
      onClick={() => onSelectedLink(itemLink.id)}
    >
      {itemLink.title}
    </Link>
  );
};

export default ActiveLink;
