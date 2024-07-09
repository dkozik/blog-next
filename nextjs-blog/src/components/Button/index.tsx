import React from "react";
import clsx from "clsx";

import styles from "./Button.module.scss";

interface ButtonProps {
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = (props) => {
  const { children, onClick, className } = props;
  return (
    <button className={clsx(className, styles.Button)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
