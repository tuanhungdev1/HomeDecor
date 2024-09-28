interface InputRangeProps {
  placeholder: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputRange: React.FC<InputRangeProps> = ({
  placeholder,
  onChange,
  value,
}) => {
  return (
    <input
      type="number"
      onChange={(e) => onChange(e)}
      value={value}
      placeholder={placeholder}
      className="flex-1 border-[2px] px-2 w-full py-2 rounded-sm outline-green-600"
    />
  );
};

export default InputRange;
