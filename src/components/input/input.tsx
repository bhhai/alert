import React from "react";
import "./input.scss";
interface InputProps {
  id?: string;
  value?: string | number;
  type?: string;
  variant?: "default" | "contained" | "border-bottom";
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
  labelPosition?: "left" | "default" | "inside";
  disabled?: boolean;
  onKeyPress?: any;
  readOnly?: boolean;
  defaultValue?: string | number;
  maxLength?: number;
  icon?: React.ReactElement;
  iconPosition?: "left" | "right";
  iconClickEvent?: React.ReactEventHandler;
  refInput?: any;
  required?: boolean;
  autoComplete?: string;
  register?: any;
}
export default function Input(props: InputProps) {
  const {
    id,
    value,
    name,
    className,
    defaultValue,
    placeholder,
    autoFocus,
    error,
    message,
    disabled,
    readOnly,
    label,
    labelPosition,
    onFocus,
    onBlur,
    onKeyPress,
    onKeyDown,
    onKeyUp,
    onClick,
    onChange,
    maxLength,
    icon,
    variant,
    type,
    iconPosition,
    iconClickEvent,
    refInput,
    required,
    autoComplete,
    register,
  } = props;

  return (
    <div
      className={`base-input${variant && variant === "border-bottom" ? ` base-input--variant-border-bottom` : ""}${
        error ? ` base-input--error-error` : ""
      }${value ? " has-value" : ""}${icon ? " has-icon" : ""}${iconPosition ? ` has-icon__${iconPosition}` : ""}${
        label ? " has-label" : ""
      }${labelPosition ? ` has-label-position-${labelPosition}` : ""}${disabled ? " has-disabled" : ""}${
        className ? " " + className : ""
      }`}
    >
      {labelPosition === "left" && (
        <span className="label-text">
          {label}
          {required ? (
            <>
              <span className="required">*</span>
            </>
          ) : null}
        </span>
      )}
      <label>
        {icon ? (
          <span
            onClick={iconClickEvent ? iconClickEvent : undefined}
            className={`icon d-flex align-items-center justify-content-center${iconClickEvent ? " has-event" : ""}`}
          >
            {icon}
          </span>
        ) : null}
        <input
          readOnly={readOnly}
          type={type ? type : "text"}
          name={name}
          id={id}
          className={`${variant ? `base-input--variant-${variant}` : ""}`}
          onBlur={onBlur}
          onChange={onChange}
          onKeyPress={onKeyPress}
          onKeyUp={onKeyUp}
          value={value}
          placeholder={labelPosition === "inside" ? "" : placeholder}
          autoFocus={autoFocus}
          onKeyDown={onKeyDown}
          onClick={onClick}
          disabled={disabled}
          onFocus={onFocus}
          defaultValue={defaultValue}
          maxLength={maxLength ? maxLength : undefined}
          // required={required ?? false}
          ref={refInput ?? null}
          autoComplete={autoComplete}
          {...register}
        ></input>
        {label && labelPosition !== "left" ? (
          <span className="label-text">
            {label}
            {required ? (
              <>
                <span className="required">*</span>
              </>
            ) : null}
          </span>
        ) : null}
      </label>
      {error && message ? <div className="has-error">{message}</div> : null}
    </div>
  );
}
