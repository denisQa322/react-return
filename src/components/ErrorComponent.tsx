import { CSSTransition } from "react-transition-group";
import styles from "../assets/styles/error.module.scss";

interface ErrorProps {
  message: string;
}

const ErrorComponent: React.FC<ErrorProps> = ({ message }) => {
  return (
    <CSSTransition
      in={!!message}
      timeout={300}
      classNames={{
        enter: styles["fade-enter"],
        exit: styles["fade-exit"],
        exitActive: styles["fade-exit-active"],
      }}
      unmountOnExit
    >
      <div className={styles.error} role="alert">
        ⚠ {message}
      </div>
    </CSSTransition>
  );
};

export default ErrorComponent;
