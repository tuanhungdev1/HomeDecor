import { HeaderAdmin, SibarAdmin } from "@/layouts";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const { Footer, Content } = Layout;

const AdminHomePage = () => {
  return (
    <>
      <Layout>
        <SibarAdmin />
        <Layout>
          <HeaderAdmin />
          <Content className="px-4 py-4">
            <Outlet />
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </>
  );
};

export default AdminHomePage;
