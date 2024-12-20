import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(window.scrollY);
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
};

export default ScrollToTop;
