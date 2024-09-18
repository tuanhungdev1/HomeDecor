interface ErrorPageComponentProps {
  imageUrl?: string;
  title?: string;
  subTitle?: string;
  children?: React.ReactNode;
}

const ErrorPageComponents: React.FC<ErrorPageComponentProps> = ({
  imageUrl,
  title,
  children,
  subTitle,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-8 p-8 select-none">
      <img
        src={imageUrl ?? "/public/comic.png"}
        alt={title}
        className="w-[200px] opacity-80 md:w-[300px]"
      />
      <div className="flex flex-col items-center gap-2 mb-4">
        <h2 className="text-5xl font-medium text-gray-700 md:text-6xl">
          {title}
        </h2>
        <p className="opacity-70">{subTitle}</p>
      </div>
      {children && <div>{children}</div>}
    </div>
  );
};

export default ErrorPageComponents;
