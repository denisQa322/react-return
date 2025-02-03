import { ChangeEvent, FC } from "react";
import Error from "./ErrorComponent";

interface InputProps {
  label: string;
  type: "number";
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

const Input: FC<InputProps> = ({
  label,
  type,
  value,
  error,
  onChange,
  ...props
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="input-wrapper">
      <label>{label}</label>
      <input {...props} type={type} value={value} onChange={handleChange} />
      <div className="error-container">
        {error && <Error message={error} />}
      </div>
    </div>
  );
};
export default Input;
