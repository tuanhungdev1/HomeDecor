import { SibarAdmin } from "@/layouts";
import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import {
  AdminDashboard,
  AdminInventory,
  AdminManageStore,
  AdminOrders,
  AdminReports,
  AdminSuppliers,
} from "@/pages/admin";
const { Footer, Header, Content } = Layout;

const AdminHomePage = () => {
  return (
    <>
      <Layout>
        <SibarAdmin />
        <Layout>
          <Header />
          <Content>
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/inventory" element={<AdminInventory />} />
              <Route path="/reports" element={<AdminReports />} />
              <Route path="/suppliers" element={<AdminSuppliers />} />
              <Route path="/orders" element={<AdminOrders />} />
              <Route path="/manage-store" element={<AdminManageStore />} />
            </Routes>{" "}
          </Content>
        </Layout>
        <Footer />
      </Layout>
    </>
  );
};

export default AdminHomePage;
