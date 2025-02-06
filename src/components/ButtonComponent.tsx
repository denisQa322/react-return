// ButtonComponent.tsx
import { FC, MouseEventHandler } from "react";
import "../assets/styles/button.scss";

interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  btnClass: string;
  btnImgSrc: string;
  disabled?: boolean;
  buttonAlt: string;
}

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
