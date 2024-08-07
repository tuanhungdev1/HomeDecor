interface LabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
  onClick?: () => void;
}

const Label: React.FC<LabelProps> = ({
  children,
  htmlFor = "",
  className = "",
  onClick,
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`lg:text-base xl:text-lg text-sm select-none cursor-pointer text-neutral-4 ${className}`}
      onClick={onClick}
    >
      {children}
    </label>
  );
};

export default Label;
