import { useState } from "react";

interface UseToggleProps {
  initialState: boolean;
}

const useToggle = ({
  initialState,
}: UseToggleProps): {
  isToggled: boolean;
  toggle: () => void;
} => {
  const [isToggled, setIsToggled] = useState<boolean>(initialState);

  const toggle = () => {
    setIsToggled((prev) => !prev);
  };

  return {
    isToggled,
    toggle,
  };
};

export default useToggle;
