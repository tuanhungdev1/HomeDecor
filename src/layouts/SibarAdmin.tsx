import { menuAdminItems } from "@/constants/menuAdminItems";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

const SibarAdmin = () => {
  return (
    <Sider theme="light">
      <div></div>
      <Menu items={menuAdminItems} />
    </Sider>
  );
};

export default SibarAdmin;
