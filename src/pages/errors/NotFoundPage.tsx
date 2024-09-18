import { Button } from "@/components/button";
import { useNavigate } from "react-router-dom";
import ErrorPageComponents from "./ErrorPageComponents";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoToHomePage = () => {
    navigate("/");
  };
  return (
    <ErrorPageComponents
      imageUrl="/public/404.png"
      title="Lost in space"
      subTitle="Sorry, we can't find the page you are looking for."
    >
      <Button onClick={handleGoToHomePage} className="w-[300px]">
        Go to Home
      </Button>
    </ErrorPageComponents>
  );
};

export default NotFoundPage;
