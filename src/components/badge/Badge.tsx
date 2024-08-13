interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, className }) => {
  return (
    <span
      className={`font-semibold rounded-[4px] text-[16px] w-16 flex items-center justify-center ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
