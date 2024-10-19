interface DropDownItem {
  id: number;
  title: string;
  path: string;
}

export const dropdownMenu: DropDownItem[] = [
  {
    id: 1,
    title: "Proflie",
    path: "/user-profile",
  },
  {
    id: 2,
    title: "Wishlist",
    path: "/wishlist",
  },
  {
    id: 3,
    title: "Orders",
    path: "/user-profile/order",
  },
  {
    id: 4,
    title: "Register",
    path: "/auth/register",
  },
  {
    id: 5,
    title: "Reset Password",
    path: "/auth/forgot-password",
  },
  {
    id: 6,
    title: "Admin",
    path: "/admin",
  },
];
