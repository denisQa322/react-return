import { ChangeEvent, FC } from "react";
import Error from "./ErrorComponent";
import "../assets/styles/input.scss";

interface InputProps {
  disabled?: boolean;
  error?: string;
  label: string;
  onChange?: (value: string) => void;
  type: string;
  value: string;
}

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
      onChange(e.target.value);
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
