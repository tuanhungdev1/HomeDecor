import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  isLogo?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className, isLogo = false }) => {
  return (
    <Link to={"/"}>
      <div
        className={`select-none flex items-center text-2xl font-medium ${className}`}
      >
        {isLogo && (
          <span>
            <img
              src="/public/LogoHomeDecor.png"
              alt="Logo"
              className="w-[32px]"
            />
          </span>
        )}
        Home<span className="text-green-600">Decor.</span>
      </div>
    </Link>
  );
};

export default Logo;
