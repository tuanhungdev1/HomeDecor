import { Outlet } from "react-router-dom";
import Header from "./Header";
import { PromotionalBanner } from "@/components/promotionalBanner";

const RootLayout = () => {
  return (
    <div>
      <PromotionalBanner />
      <div className="container px-5 mx-auto">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
