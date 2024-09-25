import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

interface SearchBoxProps {
  onClose: () => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  return (
    <div className="flex items-center justify-center w-full gap-2 py-3">
      <input
        type="text"
        className="w-[70%] outline-none rounded-full px-4 py-2 border-gray-300 border-[2px] flex-1 md:flex-none"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <img
        src={"/public/magnifying-glass.png"}
        alt=""
        className="w-[35px] cursor-pointer"
      />
      <IoCloseOutline className="text-3xl cursor-pointer" onClick={onClose} />
    </div>
  );
};

export default SearchBox;
