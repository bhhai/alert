import React from "react";
import "./switch.scss";

interface SwitchProps {
  id?: string;
  name?: string;
  className?: string;
  onChange?: any;
  checked?: boolean;
  onClick?: any;
  label?: string;
  value?: string;
}

export default function Switch(props: SwitchProps) {
  const { checked, id, onChange, name, onClick, label, value, className } = props;
  return (
    <div className={`base-switch ${className ? className : ''} `}>
      <label onClick={onClick}>
        <input id={id} value={value} type="checkbox" onChange={onChange} checked={checked} name={name} />
        <span className="slider"></span>
        {label && <span className="switch-label">{label}</span>}
      </label>
    </div>
  );
}
