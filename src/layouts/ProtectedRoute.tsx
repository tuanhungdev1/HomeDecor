import { useAppDispatch } from "@/hooks/hooks";
import { AccessDeniedPage } from "@/pages/errors";

import { selectUser } from "@/stores/selectors/userSelector";
import { getUserInfor } from "@/stores/thunks/userThunk";
import { useEffect } from "react";

import { useSelector } from "react-redux";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserInfor());
  }, [dispatch]);

  if (!user) {
    return <AccessDeniedPage />;
  }

  return children;
};

export default ProtectedRoute;
