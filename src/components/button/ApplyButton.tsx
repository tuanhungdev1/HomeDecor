interface ApplyButtonProps {
  className?: string;
  title?: string;
}

const ApplyButton: React.FC<ApplyButtonProps> = ({ className, title }) => {
  return (
    <button
      className={`border-[2px] w-full mt-3 text-sm font-medium text-green-700 hover:bg-green-100 transition-all duration-200 py-2 rounded-[4px] border-green-600 ${className}`}
    >
      {title}
    </button>
  );
};

export default ApplyButton;
