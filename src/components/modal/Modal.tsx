import useBodyOverflow from "@/hooks/useBodyOverflow";
import { useEffect } from "react";
import { Overlay } from "../overlay";
import { cn } from "@/utils/cn";
import { CgClose } from "react-icons/cg";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  footer?: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showCloseButton,
  closeOnOverlayClick,
  footer,
  className,
}) => {
  useBodyOverflow(isOpen);

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <>
      <div className="fixed inset-0 z-40 flex items-center justify-center px-4 overflow-y-auto select-none">
        <div
          className={cn(
            "relative w-full py-4 px-6 z-50 bg-white rounded-lg shadow-lg",
            sizeClasses[size],
            className
          )}
        >
          <div className="flex items-center justify-between">
            {title && <h2 className="text-2xl">{title}</h2>}
            {showCloseButton && (
              <button
                className="p-2 text-3xl transition-all duration-200 rounded-lg cursor-pointer hover:bg-slate-100"
                onClick={onClose}
              >
                <CgClose className="" />
              </button>
            )}
          </div>
          <div className="my-8">
            <div className="">
              <div>{children}</div>
            </div>
          </div>
          {footer && (
            <div className="flex items-center justify-end gap-2">{footer}</div>
          )}
        </div>
        <Overlay onClick={closeOnOverlayClick ? onClose : undefined} />
      </div>
    </>,
    document.body
  );
};

export default Modal;
