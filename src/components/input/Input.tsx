import { useField } from "formik";

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
        className={`border-gray-300 border-b placeholder:text-lg placeholder:text-neutral-4 outline-none py-4 text-lg w-[600px] ${
          meta.touched && meta.error ? "border-red-500" : ""
        } ${className}`}
        placeholder={placeHolder}
      ></input>

      {meta.error && meta.touched && (
        <span className="absolute left-0 text-red-500 -bottom-8">
          {meta.error}
        </span>
      )}
    </div>
  );
};

export default Input;
