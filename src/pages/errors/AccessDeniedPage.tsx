import { Button } from "@/components/button";
import ErrorPageComponents from "./ErrorPageComponents";
import { useNavigate } from "react-router-dom";

const AccessDeniedPage = () => {
  const navigate = useNavigate();

  const handleGoToSignInPage = () => {
    navigate("/auth/sign-in");
  };

  const handleGoToSignUpPage = () => {
    navigate("/auth/sign-up");
  };
  return (
    <ErrorPageComponents
      imageUrl="/public/delete.png"
      title="Access Denied"
      subTitle="You must be logged in to access this page."
    >
      <div className="flex items-center gap-3 w-[400px]">
        <Button onClick={handleGoToSignInPage}>Sign In</Button>
        <span className="text-gray-500">or</span>
        <Button onClick={handleGoToSignUpPage}>Sign Up</Button>
      </div>
    </ErrorPageComponents>
  );
};

export default AccessDeniedPage;
