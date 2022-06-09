import React from "react";
import "./checkbox.scss";

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: any;
  onClick?: any;
  className?: string;
  icon?: React.ReactElement;
  value?: string;
  disable?: boolean;
}
export default function Checkbox(props: CheckboxProps) {
  const { label, checked, indeterminate, onChange, onClick, className, icon, value, disable } = props;
  return (
    <div
      className={`base-checkbox${className ? " " + className : ""}${label ? "" : " base-checkbox__no-label"}${
        checked ? " on-checked" : ""
      }${indeterminate ? " on-indeterminate" : ""} ${disable ? "disable" : ""}`}
    >
      <label onClick={onClick}>
        <input disabled={disable} value={value} type="checkbox" onChange={onChange} checked={checked}></input>
        <span className="checkmark">{icon ? icon : null}</span>
        {label && <span className="checkmark-label">{label}</span>}
      </label>
    </div>
  );
}
