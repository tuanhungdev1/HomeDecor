import { useState } from "react";
import { InputRange } from "../input";
import { ApplyButton } from "../button";

const RangePrice = () => {
  const [minValue, setMinValue] = useState<string>("");
  const [maxValue, setMaxValue] = useState<string>("");

  const handleMaxValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxValue(event.target.value);
  };

  const handleMinValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinValue(event.target.value);
  };
  return (
    <div>
      <span className="text-base font-medium">Enter Amount</span>

      <div className="flex items-center gap-2 mt-2 text-base">
        $
        <div>
          <InputRange
            placeholder="Min ($)"
            onChange={handleMinValueChange}
            value={minValue}
          />
        </div>
        <span className="shrink-0">to $</span>
        <div>
          <InputRange
            placeholder="Max ($)"
            onChange={handleMaxValueChange}
            value={maxValue}
          />
        </div>
      </div>
      <ApplyButton title="Apply" />
      <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
        <div className="w-full h-[2px] bg-gray-200 flex-1"></div>{" "}
        <span>or</span>
        <div className="w-full h-[2px] bg-gray-200 flex-1"></div>
      </div>
    </div>
  );
};

export default RangePrice;
