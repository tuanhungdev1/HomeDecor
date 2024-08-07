interface ErrorMessage {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessage> = ({ message }) => {
  return (
    <span className="absolute left-0 text-sm text-red-500 select-none lg:text-base -bottom-7">
      {message}
    </span>
  );
};

export default ErrorMessage;
