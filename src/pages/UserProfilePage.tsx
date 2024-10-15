import { LoadingOverlay } from "@/components/loadingOverlay";
import useUser from "@/hooks/useUser";
import UserProfileLayout from "@/layouts/UserProfileLayout";
import { useEffect, useState } from "react";

const UserProfilePage = () => {
  const [isLoading, setIsloading] = useState(true);
  const { handleGetUserInfo } = useUser();

  const handleFetchUserData = async () => {
    await handleGetUserInfo();
    setIsloading(false);
  };

  useEffect(() => {
    handleFetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <main className="">
      <UserProfileLayout />
    </main>
  );
};

export default UserProfilePage;
