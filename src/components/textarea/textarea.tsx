import React from "react";
import "./textarea.scss";
interface TextareaProps {
  id?: string;
  value?: string | number;
  name?: string;
  className?: string;
  placeholder?: string;
  onChange?: any;
  autoFocus?: boolean;
  onFocus?: any;
  onBlur?: any;
  error?: boolean;
  message?: string;
  onKeyDown?: any;
  onKeyUp?: any;
  onClick?: any;
  label?: string;
  disable?: boolean;
  onKeyPress?: any;
  readOnly?: boolean;
  maxLength?: number;
}
export default function TextArea(props: TextareaProps) {
  const {
    id,
    value,
    name,
    className,
    placeholder,
    autoFocus,
    error,
    message,
    disable,
    readOnly,
    label,
    onFocus,
    onBlur,
    onKeyPress,
    onKeyDown,
    onKeyUp,
    onClick,
    onChange,
    maxLength,
  } = props;
  return (
    <div className={`base-textarea ${className ? className : ""}`}>
      <label className={`${error ? "label-fail " : ""}`}>
        {label ? <span className="label-text">{label}</span> : null}
        <textarea
          readOnly={readOnly}
          autoComplete="off"
          name={name}
          id={id}
          onBlur={onBlur}
          onChange={onChange}
          onKeyPress={onKeyPress}
          onKeyUp={onKeyUp}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onKeyDown={onKeyDown}
          onClick={onClick}
          disabled={disable ? true : false}
          onFocus={onFocus}
          maxLength={maxLength ? maxLength : undefined}
          value={value}
        ></textarea>
      </label>
      {error && message ? <div className="has-error">{message}</div> : null}
    </div>
  );
}
