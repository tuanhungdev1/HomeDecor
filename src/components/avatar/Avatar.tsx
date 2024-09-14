import { useMemo } from "react";
import { Link } from "react-router-dom";

interface AvatarProps {
  src?: string;
  alt: string;
  to: string;
  name: string;
}

const Avatar = ({ src, alt, to, name }: AvatarProps) => {
  const firstLetter = name.charAt(0).toUpperCase();

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const { backgroundColor, textColor } = useMemo(() => {
    const bgColor = getRandomColor();

    const r = parseInt(bgColor.slice(1, 3), 16);
    const g = parseInt(bgColor.slice(3, 5), 16);
    const b = parseInt(bgColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    const textColor = brightness > 128 ? "#000000" : "#FFFFFF";
    return { backgroundColor: bgColor, textColor };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);
  return (
    <Link to={to}>
      <div className="w-8 h-8 overflow-hidden rounded-full cursor-pointer xl:w-9 xl:h-9">
        {src ? (
          <img src={src} alt={alt} className="object-cover w-full h-full" />
        ) : (
          <div
            className="flex items-center justify-center w-full h-full text-lg font-semibold"
            style={{ backgroundColor, color: textColor }}
          >
            {firstLetter}
          </div>
        )}
      </div>
    </Link>
  );
};

export default Avatar;
