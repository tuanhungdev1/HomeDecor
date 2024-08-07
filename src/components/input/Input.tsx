import { useField } from "formik";
import { ErrorMessage } from "../errorMessage";

interface InputProps {
  type?: string;
  name: string;
  className?: string;
  placeHolder?: string;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  name,
  className = "",
  placeHolder = "",
}) => {
  const [field, meta] = useField(name);
  return (
    <div className="relative">
      <input
        {...field}
        name={name}
        type={type}
        className={`border-gray-300 border-b placeholder:text-base xl:placeholder:text-lg placeholder:text-neutral-4 outline-none py-2 text-base xl:text-lg w-full ${
          meta.touched && meta.error ? "border-red-500" : ""
        } ${className}`}
        placeholder={placeHolder}
      ></input>

      {meta.error && meta.touched && <ErrorMessage message={meta.error} />}
    </div>
  );
};

export default Input;
