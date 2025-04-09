import { ChangeEvent, FC } from "react";
import Error from "./ErrorComponent";
import "../assets/styles/input.scss";
import { InputProps } from "../types/types";

const Input: FC<InputProps> = ({
  error,
  label,
  onChange,
  type,
  value,
  ...props
}) => {
  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      let value = e.target.value;

      if (type === "number") {
        value = value.replace(/\D/g, "");
      }

      onChange(value);
    }
  };

  return (
    <div className="input-wrapper">
      <label>{label}</label>
      <input {...props} type={type} value={value} onChange={inputChange} />
      <div className="error-container">
        {error && <Error message={error} />}
      </div>
    </div>
  );
};
export default Input;
