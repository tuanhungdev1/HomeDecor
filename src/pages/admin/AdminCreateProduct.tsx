import AdminHeaderLayout from "@/layouts/AdminHeaderLayout";
import { Button } from "antd";
import { Link } from "react-router-dom";

import { FiPlus } from "react-icons/fi";

const AdminCreateProduct = () => {
  return (
    <main className="w-full h-[3000px] px-10">
      <AdminHeaderLayout
        title="Create Product"
        rightSide={
          <Button
            variant="solid"
            color="primary"
            size="large"
            className="h-12 w-[200px] text-lg flex items-center"
          >
            <FiPlus size={24} />
            Add Product
          </Button>
        }
        items={[
          {
            title: <Link to={"/admin/dashboard"}>Dashboard</Link>,
          },
          {
            title: <Link to={"/admin/manage-product"}>Products</Link>,
          },
          {
            title: <Link to={"/admin/create-product"}>Create</Link>,
          },
        ]}
      />
    </main>
  );
};

export default AdminCreateProduct;
