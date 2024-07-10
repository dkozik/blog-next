import React from "react";
import clsx from "clsx";

import styles from "./Button.module.scss";

interface ButtonProps {
  className?: string;
  type?: HTMLButtonElement["type"];
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = (props) => {
  const { children, onClick, className, type, disabled } = props;
  return (
    <button
      type={type}
      className={clsx(className, styles.Button)}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
