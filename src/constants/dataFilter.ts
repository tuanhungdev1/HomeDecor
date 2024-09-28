import { DropdownItem } from "@/components/dropdownItem";
import { DropdownItemType } from "@/components/dropdownMenu/DropdownMenu";

export const dropdownList: DropdownItemType[] = [
  {
    id: 1,
    title: "Recommended",
    value: "recommended",
  },
  {
    id: 2,
    title: "Customer Rating",
    value: "rating",
  },
  {
    id: 3,
    title: "Price (Low to High)",
    value: "asc",
  },
  {
    id: 4,
    title: "Price (High to Low)",
    value: "desc",
  },
];

export const dropdownListMaterial: DropdownItemType[] = [
  {
    id: 1,
    title: "Metal",
    value: "metal",
  },
  {
    id: 2,
    title: "Wood",
    value: "wood",
  },
];
