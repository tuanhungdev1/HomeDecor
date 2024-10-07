// components/Tooltip/Tooltip.tsx
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";
// components/Tooltip/types.ts
export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  placement?: TooltipPlacement;
  className?: string;
  contentClassName?: string;
  delay?: number;
  disabled?: boolean;
  maxWidth?: string;
}

const ToolTip: React.FC<TooltipProps> = ({
  children,
  content,
  placement = "top",
  className,
  contentClassName,
  delay = 200,
  disabled = false,
  maxWidth = "200px",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const targetRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const calculatePosition = () => {
    if (!targetRef.current || !tooltipRef.current) return;

    const targetRect = targetRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    let top = 0;
    let left = 0;

    switch (placement) {
      case "top":
        top = targetRect.top + scrollY - tooltipRect.height - 8;
        left =
          targetRect.left +
          scrollX +
          (targetRect.width - tooltipRect.width) / 2;
        break;
      case "bottom":
        top = targetRect.bottom + scrollY + 8;
        left =
          targetRect.left +
          scrollX +
          (targetRect.width - tooltipRect.width) / 2;
        break;
      case "left":
        top =
          targetRect.top +
          scrollY +
          (targetRect.height - tooltipRect.height) / 2;
        left = targetRect.left + scrollX - tooltipRect.width - 8;
        break;
      case "right":
        top =
          targetRect.top +
          scrollY +
          (targetRect.height - tooltipRect.height) / 2;
        left = targetRect.right + scrollX + 8;
        break;
    }

    // Prevent tooltip from going outside viewport
    const padding = 10;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Horizontal bounds
    if (left < padding) {
      left = padding;
    } else if (left + tooltipRect.width > viewportWidth - padding) {
      left = viewportWidth - tooltipRect.width - padding;
    }

    // Vertical bounds
    if (top < padding) {
      top = padding;
    } else if (top + tooltipRect.height > viewportHeight - padding) {
      top = viewportHeight - tooltipRect.height - padding;
    }

    setTooltipStyle({
      top: `${top}px`,
      left: `${left}px`,
      maxWidth,
    });
  };

  const handleMouseEnter = () => {
    if (disabled) return;
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      calculatePosition();
      window.addEventListener("scroll", calculatePosition);
      window.addEventListener("resize", calculatePosition);
    }

    return () => {
      window.removeEventListener("scroll", calculatePosition);
      window.removeEventListener("resize", calculatePosition);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const tooltipClasses = cn(
    "fixed z-[9999] px-3 py-2 text-sm text-white bg-gray-900 rounded-md shadow-md pointer-events-none",
    "animate-fade-in",
    {
      "opacity-0": !isVisible,
      "opacity-100": isVisible,
    },
    contentClassName
  );

  return (
    <div
      ref={targetRef}
      className={cn("inline-block", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible &&
        createPortal(
          <div
            ref={tooltipRef}
            className={tooltipClasses}
            style={tooltipStyle}
            role="tooltip"
          >
            {content}
          </div>,
          document.body
        )}
    </div>
  );
};

export default ToolTip;
