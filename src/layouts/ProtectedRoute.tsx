import { AccessDeniedPage } from "@/pages/errors";
import { isAuthenticated } from "@/utils/authHelper";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthen = isAuthenticated();

  if (!isAuthen) {
    return <AccessDeniedPage />;
  }

  return children;
};

export default ProtectedRoute;
