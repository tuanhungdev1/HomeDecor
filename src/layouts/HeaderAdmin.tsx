import { Avatar, Button, Flex, Input } from "antd";
import { CiSearch } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";

const HeaderAdmin = () => {
  return (
    <div className="px-4 py-3 bg-white ">
      <div>
        <Flex justify="space-between" align="center">
          <Input
            placeholder="Search..."
            className="w-1/2 rounded-md"
            size="large"
            prefix={<CiSearch size={28} />}
          />

          <Flex align="center" gap={10}>
            <Button
              type="text"
              icon={<IoMdNotificationsOutline size={28} />}
              className="rounded-full"
              size="large"
            ></Button>
            <Avatar
              size={50}
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </Flex>
        </Flex>
      </div>
    </div>
  );
};

export default HeaderAdmin;
