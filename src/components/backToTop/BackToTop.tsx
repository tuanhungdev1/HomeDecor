import { useEffect, useState } from "react";
import { TiArrowUp } from "react-icons/ti";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div
      className={`w-12 cursor-pointer fixed bottom-10 right-10 z-30 shadow-lg bg-secondary-green h-12 hover:bg-green-600 flex items-center justify-center rounded-full transition-all duration-200 ease-linear ${
        isVisible
          ? "opacity-100"
          : "opacity-0 invisible pointer-events-none select-none"
      }`}
      onClick={scrollToTop}
    >
      <div>
        <TiArrowUp className="text-3xl" />
      </div>
    </div>
  );
};

export default BackToTop;
