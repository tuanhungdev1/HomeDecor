import { UserProfileItem } from "@/constants/userProfileItems";
import { Link } from "react-router-dom";

interface ActiveTabProps {
  itemLink: UserProfileItem;
  currenLink: string;
  onSelectedLink: (id: string) => void;
}

const ActiveTab: React.FC<ActiveTabProps> = ({
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

export default ActiveTab;
