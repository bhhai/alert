import React from "react";
import "./radio.scss";

interface RadioProps {
  label?: string;
  onChange?: any;
  name?: string;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  id?: string;
  disable?: boolean;
  onClick?: any;
  className?: string;
  icon?: React.ReactElement;
}
export default function Radio(props: RadioProps) {
  const { label, onChange, onClick, name, value, id, disable, checked, defaultChecked, className, icon } = props;
  return (
    <div className={`base-radio${className ? " " + className : ""} ${disable && 'disable'}` }>
      <label onClick={onClick}>
        <input
          disabled={disable}
          type="radio"
          defaultChecked={defaultChecked}
          name={name}
          value={value}
          id={id}
          onChange={onChange}
        />
        <span className={`checkmark ${icon ? 'show-icon' : ''}`}>
          {icon ? icon : null}
        </span>
        {label && <span className="checkmark-label">{label}</span>}    
      </label>
    </div>
  );
}
