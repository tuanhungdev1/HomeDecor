import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link to={"/"}>
      <div className={`select-none text-2xl font-medium ${className}`}>
        Home<span className="text-green-600">Decor.</span>
      </div>
    </Link>
  );
};

export default Logo;
