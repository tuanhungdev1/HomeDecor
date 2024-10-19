import { MenuProps } from "antd";
import { IoHomeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { TbReportOff } from "react-icons/tb";
import { FaRegCircleUser } from "react-icons/fa6";
import { CgShoppingBag } from "react-icons/cg";
import { RiStore2Line } from "react-icons/ri";

type MenuItem = Required<MenuProps>["items"][number];

export const menuAdminItems: MenuItem[] = [
  {
    label: <Link to={"/dashboard"}>Dashboard</Link>,
    key: "dashboard",
    icon: <IoHomeOutline size={20} />,
  },
  {
    label: <Link to={"/"}>Inventory</Link>,
    key: "inventory",
    icon: <RxDashboard size={20} />,
  },
  {
    label: <Link to={"/"}>Reports</Link>,
    key: "reports",
    icon: <TbReportOff size={20} />,
  },
  {
    label: <Link to={"/"}>Suppliers</Link>,
    key: "suppliers",
    icon: <FaRegCircleUser size={20} />,
  },
  {
    label: <Link to={"/"}>Orders</Link>,
    key: "orders",
    icon: <CgShoppingBag size={20} />,
  },
  {
    label: <Link to={"/"}>Manage Store</Link>,
    key: "manageStore",
    icon: <RiStore2Line size={20} />,
  },
];
