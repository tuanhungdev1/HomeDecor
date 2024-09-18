import { AddressCard } from "@/components/addressCard";
import { Heading } from "@/components/typography";
import { addressCards } from "@/constants/addressCards";
import { PiPlusSquare } from "react-icons/pi";

const AddressSection = () => {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <Heading className="text-2xl mb-9 md:text-3xl">Address</Heading>
        <span className="flex items-center gap-1 text-xl transition-all duration-150 cursor-pointer hover:text-green-600">
          <PiPlusSquare className="text-2xl" />
          <span>New Address</span>
        </span>
      </div>
      <div className="flex flex-col gap-6 xl:grid xl:grid-cols-2">
        {addressCards.map((item) => (
          <AddressCard item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default AddressSection;
