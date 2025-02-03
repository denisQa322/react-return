import React, { ChangeEvent, FC } from "react";
import Error from "./ErrorComponent";

interface Option {
  id: string | number;
  value: string | number;
  label: string;
}

interface SelectProps {
  error?: string;
  label: string;
  placeholder: string;
  returnSelect?: string;
  options: Option[];
  currentValue: string | number;
  onChange: (value: string | number) => void;
}

const Select: FC<SelectProps> = ({
  error,
  label,
  placeholder,
  returnSelect,
  options,
  currentValue,
  onChange,
}) => {
  const selectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };
  return (
    <div className={returnSelect}>
      <label>{label}</label>
      <select value={currentValue} onChange={selectChange}>
        <option disabled value="">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="error-container">
        {error && <Error message={error} />}
      </div>
    </div>
  );
};

export default Select;
