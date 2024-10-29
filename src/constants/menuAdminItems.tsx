import { MenuProps } from "antd";
import { IoHomeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { TbReportOff } from "react-icons/tb";
import { FaRegCircleUser } from "react-icons/fa6";
import { CgShoppingBag } from "react-icons/cg";
import { RiStore2Line } from "react-icons/ri";
import { TbBrandAirtable } from "react-icons/tb";
import { FaRegBuilding } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";

type MenuItem = Required<MenuProps>["items"][number];

export const menuAdminItems: MenuItem[] = [
  {
    label: (
      <Link
        className="flex items-center justify-center gap-3 px-6 text-base font-medium"
        to={"/admin/dashboard"}
      >
        <IoHomeOutline size={24} className="mr-2" />
        Dashboard
      </Link>
    ),
    key: "dashboard",
  },
  {
    label: (
      <Link
        className="flex items-center justify-center gap-3 px-6 text-base font-medium"
        to={"/admin/inventory"}
      >
        <RxDashboard size={24} className="mr-2" />
        Inventory
      </Link>
    ),
    key: "inventory",
  },
  {
    label: (
      <Link
        className="flex items-center justify-center gap-3 px-6 text-base font-medium"
        to={"/admin/reports"}
      >
        <TbReportOff size={24} className="mr-2" />
        Reports
      </Link>
    ),
    key: "reports",
  },
  {
    label: (
      <Link
        className="flex items-center justify-center gap-3 px-6 text-base font-medium"
        to={"/admin/suppliers"}
      >
        <FaRegBuilding size={24} className="mr-2" />
        Suppliers
      </Link>
    ),
    key: "suppliers",
  },
  {
    label: (
      <Link
        className="flex items-center justify-center gap-3 px-6 text-base font-medium"
        to={"/admin/users"}
      >
        <FaRegCircleUser size={24} className="mr-2" />
        Users
      </Link>
    ),
    key: "users",
  },
  {
    label: (
      <Link
        className="flex items-center justify-center gap-3 px-6 text-base font-medium"
        to={"/admin/brands"}
      >
        <TbBrandAirtable size={24} className="mr-2" />
        Brands
      </Link>
    ),
    key: "brands",
  },
  {
    label: (
      <Link
        className="flex items-center justify-center gap-3 px-6 text-base font-medium"
        to={"/admin/categories"}
      >
        <BiCategory size={24} className="mr-2" />
        Categories
      </Link>
    ),
    key: "categories",
  },
  {
    label: (
      <Link
        className="flex items-center justify-center gap-3 px-6 text-base font-medium"
        to={"/admin/orders"}
      >
        <CgShoppingBag size={24} className="mr-2" />
        Orders
      </Link>
    ),
    key: "orders",
  },
  {
    label: (
      <Link
        className="flex items-center justify-center gap-3 px-6 text-base font-medium"
        to={"/admin/manage-store"}
      >
        <RiStore2Line size={24} className="mr-2" />
        Manage Store
      </Link>
    ),
    key: "manageStore",
    className: "custom-menu-item-wrapper",
  },
];
