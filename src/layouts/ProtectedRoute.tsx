import { AccessDeniedPage } from "@/pages/errors";
import { selectAuthUserId } from "@/stores/selectors/authSelector";

import { useSelector } from "react-redux";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const userId = useSelector(selectAuthUserId);

  if (userId) {
    return <AccessDeniedPage />;
  }

  return children;
};

export default ProtectedRoute;
