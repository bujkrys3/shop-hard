import React from "react";
import classes from "./Button.module.scss";

interface ButtonProps {
  onClick?: () => void;
  name: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const Button = ({
  onClick,
  name,
  className,
  type,
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type ? type : "button"}
      className={`${classes.button} ${className}`}
      onClick={onClick}
      disabled={disabled ? disabled : false}
    >
      {name}
    </button>
  );
};
