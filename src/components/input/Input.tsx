import { useField } from "formik";
import { ErrorMessage } from "../errorMessage";

interface InputProps {
  type?: string;
  name: string;
  htmlFor?: string;
  className?: string;
  placeHolder?: string;
  width?: string;
  isDisable?: boolean;
  icon?: React.ReactNode;
  value?: string;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  name,
  className = "",
  placeHolder = "",
  width,
  icon,
  htmlFor,
  isDisable,
  value,
}) => {
  const [field, meta] = useField(name);

  return (
    <div className={`relative ${width}`}>
      <input
        {...field}
        name={name}
        type={type}
        id={htmlFor}
        className={`border-gray-300 ${
          icon ? "pl-10" : ""
        } border-b placeholder:text-base xl:placeholder:text-lg placeholder:text-neutral-4 outline-none py-2 text-base xl:text-lg w-full ${
          meta.touched && meta.error ? "border-red-500" : ""
        } ${
          isDisable ? "text-neutral-4 select-none pointer-events-none" : ""
        } ${className}`}
        placeholder={placeHolder}
        disabled={isDisable}
        value={value}
      ></input>
      {icon && <div className="absolute -translate-y-1/2 top-1/2">{icon}</div>}

      {meta.error && meta.touched && <ErrorMessage message={meta.error} />}
    </div>
  );
};

export default Input;
