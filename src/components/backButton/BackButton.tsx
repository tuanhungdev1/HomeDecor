import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div
      onClick={goBack}
      className="flex flex-row items-center gap-2 transition-all duration-150 opacity-75 cursor-pointer select-none hover:opacity-100"
    >
      <div>
        <IoIosArrowBack />
      </div>
      <span>back</span>
    </div>
  );
};

export default BackButton;
