export interface UserProfileItem {
  id: string;
  title: string;
  url: string;
}

export const userProfileItemList: UserProfileItem[] = [
  {
    id: "account",
    title: "Account",
    url: "/",
  },
  {
    id: "address",
    title: "Address",
    url: "/address",
  },
  {
    id: "orders",
    title: "Orders",
    url: "/orders",
  },
  {
    id: "wishlist",
    title: "Wishlist",
    url: "/wislist",
  },
  {
    id: "reset-password",
    title: "Reset password",
    url: "",
  },
  {
    id: "log-out",
    title: "Log Out",
    url: "",
  },
];
