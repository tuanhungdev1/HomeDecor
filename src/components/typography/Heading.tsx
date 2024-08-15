interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ children, className }) => {
  return (
    <h1 className={`select-none text-4xl font-medium ${className}`}>
      {children}
    </h1>
  );
};

export default Heading;
