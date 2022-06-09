import React from "react";
import "./button.scss";
interface ButtonProps {
  color?: "primary" | "secondary" | "destroy" | "success" | "warning" | "transparent" | "link";
  variant?: "default" | "outline" | "fill-active" | "outline-active";
  children?: any;
  disabled?: boolean;
  onClick?: any;
  type?: "submit" | "button";
  className?: string;
  id?: string;
  onlyIcon?: boolean;
  size?: "small" | "normal" | "medium" | "large";
  refButton?: any;
  dataTip?: any;
}
export default function Button(props: ButtonProps) {
  const { color, variant, children, disabled, onClick, type, className, onlyIcon, size, refButton, dataTip, id } =
    props;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      ref={refButton ?? null}
      className={`base-button${color ? " base-button--color-" + color : ""}${
        variant && (!color || color !== "transparent") ? " base-button--variant-" + variant : ""
      }${onlyIcon ? " base-button__only-icon" : ""}${
        size ? " base-button__size-" + size : " base-button__size-normal"
      }${className ? " " + className : ""}`}
      data-tip={dataTip}
      id={id}
    >
      {children}
    </button>
  );
}
