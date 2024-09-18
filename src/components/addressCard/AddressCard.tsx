import { AddressCardType } from "@/types/type";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";

interface AddressCardProps {
  item: AddressCardType;
}

const AddressCard: React.FC<AddressCardProps> = ({ item }) => {
  return (
    <div className="border-[2px] p-4 md:px-6 md:py-6 flex flex-col rounded-lg border-gray-400 select-none cursor-pointer hover:shadow-md transition-all duration-150">
      <div className="flex items-center justify-between">
        <h2 className="mb-2 text-xl font-medium ">{item.title}</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 transition-all duration-150 hover:text-yellow-600">
            <FaRegEdit />
            <span>Edit</span>
          </div>
          <div className="flex items-center gap-1 transition-all duration-150 hover:text-red-600">
            <MdOutlineDeleteOutline />
            <span>Dele</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 text-[16px] ">
        <span>{item.userName}</span>
        <span>{item.phoneNumber}</span>
        <span>{item.address}</span>
      </div>
    </div>
  );
};

export default AddressCard;
