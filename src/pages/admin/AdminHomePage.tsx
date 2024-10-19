import { Button } from "antd";
import { Link } from "react-router-dom";

const AdminHomePage = () => {
  return (
    <div className="text-4xl font-bold">
      ADMIN HOME PAGE{" "}
      <Link to={"/"}>
        <Button>Home</Button>
      </Link>
    </div>
  );
};

export default AdminHomePage;
