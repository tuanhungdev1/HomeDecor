import { LoadingOverlay } from "@/components/loadingOverlay";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/types/Enums";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  roles: UserRole[];
  navigateTo: string;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  roles,
  navigateTo,
  children,
}) => {
  const location = useLocation();
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (!user) {
    return <Navigate to={`${navigateTo}?redirect=${location.pathname}`} />;
  }

  const hasAllRequiredRoles = roles.every((role) => user.roles?.includes(role));

  if (!hasAllRequiredRoles) {
    return <Navigate to="/error-page" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
