import { LoadingOverlay } from "@/components/loadingOverlay";
import useUser from "@/hooks/useUser";
import { UserProfilePage } from "@/pages";
import { AccessDeniedPage } from "@/pages/errors";
import { getUserId, isAuthenticated } from "@/utils/authHelper";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const isAuthen = isAuthenticated();
  const userId = getUserId();
  const { user, status, handleGetUserInfo } = useUser();
  const navigate = useNavigate();

  const handleFetchUserData = async (userId: string) => {
    try {
      await handleGetUserInfo(userId);
    } catch (error) {
      navigate("/error-page"); // Chuyển hướng đến trang lỗi
    }
  };

  useEffect(() => {
    if (userId && isAuthen) {
      handleFetchUserData(userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, isAuthen]);

  if (!userId || !isAuthen) {
    return <AccessDeniedPage />;
  }

  if (status === "pending") {
    return <LoadingOverlay />;
  }

  if (status === "rejected") {
    navigate("/error-page");
    return null;
  }

  if (!user) {
    return <AccessDeniedPage />;
  }

  return (
    <>
      <UserProfilePage />
    </>
  );
};

export default ProtectedRoute;
