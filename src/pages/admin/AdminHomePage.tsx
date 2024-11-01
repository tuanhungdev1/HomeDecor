import { HeaderAdmin, SibarAdmin } from "@/layouts";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const AdminHomePage = () => {
  return (
    <>
      <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
        <SibarAdmin />
        <div className="flex flex-col w-full min-h-screen overflow-y-scroll">
          <HeaderAdmin />
          <div className="overflow-y-scroll bg-white pt-28">
            <Outlet />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AdminHomePage;
