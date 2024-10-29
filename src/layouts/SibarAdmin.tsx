import { Logo } from "@/components/shared";
import { menuAdminItems } from "@/constants/menuAdminItems";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

const SibarAdmin = () => {
  return (
    <Sider width={290} theme="light" className="h-screen mr-[3px] px-1">
      <div className="my-8 flex-center">
        <Logo className="text-3xl text-black hover:bg-transparent hover:text-black" />
      </div>
      <Menu
        items={menuAdminItems}
        defaultSelectedKeys={["dashboard"]}
        className="
          
          [&_.ant-menu-item]:my-2 
          [&_.ant-menu-item]:flex
          [&_.ant-menu-item]:items-center
          [&_.ant-menu-item]:h-14 
          [&_.ant-menu-item:hover]:bg-gray-100
          [&_.ant-menu-item-selected]:bg-blue-50 
          [&_.ant-menu-item-selected]:text-blue-600
          [&_.ant-menu-item-selected]:font-medium
        "
      />
    </Sider>
  );
};

export default SibarAdmin;
