import { Button } from "@/components/button";
import ErrorPageComponents from "./ErrorPageComponents";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <ErrorPageComponents
      imageUrl="/public/error.png"
      title="Something Went Wrong!"
      subTitle="An unexpected error has occurred. Please try again later."
    >
      <div className="flex items-center justify-center gap-3 w-[400px]">
        <Button onClick={handleNavigate} size="lg">
          Back to Home
        </Button>
      </div>
    </ErrorPageComponents>
  );
};

export default ErrorPage;
