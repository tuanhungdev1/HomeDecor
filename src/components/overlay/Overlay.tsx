interface OverlayProps {
  onClick: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="fixed top-0 bottom-0 left-0 right-0 z-40 transition-all duration-150 bg-black opacity-50"
    ></div>
  );
};

export default Overlay;
