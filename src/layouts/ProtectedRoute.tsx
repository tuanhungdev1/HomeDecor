import { AccessDeniedPage } from "@/pages/errors";
import { selectAuthUser } from "@/stores/authSlice/authSlice";
import { useSelector } from "react-redux";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useSelector(selectAuthUser);

  if (!isAuthenticated) {
    return <AccessDeniedPage />;
  }

  return children;
};

export default ProtectedRoute;
