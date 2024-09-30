import React, { useEffect, useState } from "react";
import { Logo } from "../shared";
import { ThreeDots } from "react-loader-spinner";
import useBodyOverflow from "@/hooks/useBodyOverflow";

const LoadingOverlay: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useBodyOverflow(isVisible);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white pointer-events-none">
      <div className="relative flex flex-col items-center">
        <Logo className="text-6xl" />
        <ThreeDots
          visible={true}
          height="70"
          width="70"
          color="#aaaaaa"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </div>
  );
};

export default LoadingOverlay;
