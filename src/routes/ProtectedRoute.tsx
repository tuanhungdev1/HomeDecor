import { useAuth } from "@/hooks/useAuth";

import { AccessDeniedPage } from "@/pages/errors";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AccessDeniedPage />;
  }

  return children;
};

export default ProtectedRoute;
