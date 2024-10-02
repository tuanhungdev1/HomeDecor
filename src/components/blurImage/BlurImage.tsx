import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";

interface BlurImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

const BlurImage: React.FC<BlurImageProps> = ({
  src,
  alt,
  className,
  fallbackSrc = "/fallbackImage.jpg",
}) => {
  const [imageSrc, setImageSrc] = useState<string>(fallbackSrc);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
    };

    img.onerror = () => {
      setImageSrc(fallbackSrc);
      setIsLoading(false);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, fallbackSrc]);

  return (
    <div className={cn("relative w-full h-full overflow-hidden")}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      <img
        src={imageSrc}
        alt={alt}
        className={cn(
          "object-cover w-full h-full transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
      />
    </div>
  );
};

export default BlurImage;
