import { Outlet } from "react-router-dom";
import Header from "./Header";
import { PromotionalBanner } from "@/components/promotionalBanner";
import NewsLetter from "./NewsLetter";
import Footer from "./Footer";
import { BackToTop } from "@/components/backToTop";

interface RootLayoutProps {
  children?: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div className="overflow-hidden">
      <PromotionalBanner />
      <div className="container px-5 mx-auto">
        <Header />

        {children ? children : <Outlet />}
      </div>
      <BackToTop />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default RootLayout;
