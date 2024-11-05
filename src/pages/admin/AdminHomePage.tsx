import { HeaderAdmin, SibarAdmin } from "@/layouts";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const AdminHomePage = () => {
  return (
    <>
      <Layout>
        <SibarAdmin />
        <div className="flex flex-col w-full">
          <HeaderAdmin />
          <div className="pt-6 bg-white">
            <Outlet />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AdminHomePage;
