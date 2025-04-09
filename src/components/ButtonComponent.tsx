// ButtonComponent.tsx
import { FC } from "react";
import "../assets/styles/button.scss";
import { ButtonProps } from "../types/types";

const Button: FC<ButtonProps> = ({
  onClick,
  btnImgSrc,
  btnClass,
  disabled,
  buttonAlt,
}) => {
  return (
    <div className="button-wrapper">
      <button className={btnClass} onClick={onClick} disabled={disabled}>
        <img src={btnImgSrc} alt={buttonAlt} />
      </button>
    </div>
  );
};

export default Button;
