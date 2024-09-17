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
      to={"/user-profile"}
      className={`${
        currenLink === itemLink.id ? "text-black" : "text-gray-400"
      } cursor-pointer text-left  w-full px-2 py-4 relative hover:bg-gray-200 rounded-sm`}
      onClick={() => onSelectedLink(itemLink.id)}
    >
      {itemLink.title}
      {currenLink === itemLink.id && (
        <div className="absolute bottom-0 w-full duration-200 transition-all h-[2px] bg-black left-0"></div>
      )}
    </Link>
  );
};

export default ActiveTab;
