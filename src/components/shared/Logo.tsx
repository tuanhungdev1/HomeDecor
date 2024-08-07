import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link to={"/"}>
      <div className={`text-2xl font-medium ${className}`}>HomeDecor.</div>
    </Link>
  );
};

export default Logo;
