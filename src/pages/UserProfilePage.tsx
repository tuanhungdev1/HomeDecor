import UserProfileLayout from "@/layouts/UserProfileLayout";
import { Outlet } from "react-router-dom";

const UserProfilePage = () => {
  return (
    <main className="">
      <UserProfileLayout>
        <Outlet />
      </UserProfileLayout>
    </main>
  );
};

export default UserProfilePage;
