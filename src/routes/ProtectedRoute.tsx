import useUser from "@/hooks/useUser";
import { UserRole } from "@/types/Enums";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  role: UserRole;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role }) => {
  const { user } = useUser();
  const location = useLocation();

  // Nếu chưa đăng nhập, điều hướng về trang đăng nhập
  if (!user) {
    return (
      <Navigate to={`/admin/login?redirect=${location.pathname}`} replace />
    );
  }

  // Nếu không có quyền, điều hướng đến trang lỗi
  if (!user.roles?.includes(role)) {
    return <Navigate to="/error-page" replace />;
  }

  // Nếu hợp lệ, hiển thị các route con (nếu có)
  return <Outlet />;
};

export default ProtectedRoute;
