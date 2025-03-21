import React, { useState } from "react";
import Check from "../assets/check.svg";

interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

const Input = ({
  label,
  name,
  value,
  onChange,
  required,
  minLength,
  maxLength,
  pattern,
}: InputProps) => {
  const [isTouched, setIsTouched] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, e.target.value);
  };

  const handleBlur = () => {
    setIsTouched(true);
  };

  const isRequiredValid = required ? value.trim() !== "" : true;
  const isMinLengthValid = minLength ? value.length >= minLength : true;
  const isMaxLengthValid = maxLength ? value.length <= maxLength : true;
  const isPatternValid = pattern ? new RegExp(pattern).test(value) : true;

  const isValid =
    isRequiredValid && isMinLengthValid && isMaxLengthValid && isPatternValid;

  return (
    <div className="flex flex-col">
      <label className="py-[3px] text-[14px] font-medium text-[#343A40]">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`h-[42px] w-[384px] rounded-[6px] border-[1px] px-6 outline-none ${
          isTouched
            ? isValid
              ? "border-[#CED4DA]"
              : "border-[#FA4D4D]"
            : "border-[#CED4DA]"
        }`}
      />
      <div className="mt-1 space-y-1">
        {minLength && (
          <div className="flex items-center gap-1">
            <img
              src={Check}
              alt="check"
              className={`h-4 w-4 ${
                isMinLengthValid ? "opacity-100" : "opacity-50"
              }`}
            />
            <p
              className={`text-[10px] ${
                isMinLengthValid ? "text-[#08A508]" : "text-[#FA4D4D]"
              }`}
            >
              მინიმუმ {minLength} სიმბოლო
            </p>
          </div>
        )}
        {maxLength && (
          <div className="flex items-center gap-1">
            <img
              src={Check}
              alt="check"
              className={`h-4 w-4 ${
                isMaxLengthValid ? "opacity-100" : "opacity-50"
              }`}
            />
            <p
              className={`text-[10px] ${
                isMaxLengthValid ? "text-[#08A508]" : "text-[#FA4D4D]"
              }`}
            >
              მაქსიმუმ {maxLength} სიმბოლო
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
