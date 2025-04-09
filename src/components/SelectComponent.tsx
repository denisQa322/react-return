import React, { ChangeEvent, FC } from "react";
import Error from "./ErrorComponent";
import "../assets/styles/select.scss";
import { SelectProps } from "../types/types";

const Select: FC<SelectProps> = ({
  error,
  label,
  placeholder,
  returnSelect,
  cancellationSelect,
  options,
  currentValue,
  onChange,
}) => {
  const selectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };
  return (
    <div className={returnSelect || cancellationSelect}>
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
