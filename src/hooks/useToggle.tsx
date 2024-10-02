import { useState } from "react";

const useToggle = (
  initialState: boolean = false
): {
  isToggled: boolean;
  toggle: () => void;
  setToggle: (value: boolean) => void;
} => {
  const [isToggled, setIsToggled] = useState<boolean>(initialState);

  const toggle = () => {
    setIsToggled((prev) => !prev);
  };

  const setToggle = (value: boolean) => {
    setIsToggled(value);
  };

  return {
    isToggled,
    toggle,
    setToggle,
  };
};

export default useToggle;
