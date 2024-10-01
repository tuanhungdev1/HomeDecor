interface ErrorMessage {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessage> = ({ message }) => {
  return <div className="px-3 mt-1 text-sm text-red-600">{message}</div>;
};

export default ErrorMessage;
