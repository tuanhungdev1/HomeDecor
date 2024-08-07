import { useField } from "formik";
import Label from "../label/Label";
import { useState } from "react";
import { ErrorMessage } from "../errorMessage";

interface CheckboxProps {
  name: string;
  label: React.ReactNode;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ name, label, className }) => {
  const [field, meta, helpers] = useField(name);

  const [isCheck, setIsCheck] = useState<boolean>(false);

  const handleCheckClick = () => {
    setIsCheck(!isCheck);

    if (!isCheck) {
      helpers.setTouched(true);
      helpers.setValue(true);
      return;
    }
    helpers.setValue(false);
  };
  return (
    <div className={`flex items-center relative w-full ${className}`}>
      <div
        className={`select-none flex items-center justify-center w-5 h-5 mr-2 border-2  rounded cursor-pointer ${
          isCheck
            ? "border-secondary-green bg-secondary-green"
            : "border-gray-400"
        }`}
        onClick={handleCheckClick}
      >
        <input
          {...field}
          type="checkbox"
          id={name}
          className="hidden w-5 h-5 mr-2 rounded focus:ring-secondary-green"
        />

        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 text-5xl font-bold text-white"
          >
            <path
              fillRule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
      <div>
        <Label
          htmlFor={name}
          className="cursor-pointer"
          onClick={handleCheckClick}
        >
          {label}
        </Label>
      </div>
      {meta.error && meta.touched && <ErrorMessage message={meta.error} />}
    </div>
  );
};

export default Checkbox;
