import React from "react";
import NumberFormat from "react-number-format";
interface NumericInputProps {
  id?: string;
  value?: string | number;
  variant?: "default" | "contained" | "border-bottom";
  textAlign?: "right" | "left";
  name?: string;
  className?: string;
  placeholder?: string;
  onChange?: any;
  onValueChange?: any;
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
  defaultValue?: string | number;
  suffixes?: string;
  currency?: string;
  thousandSeparator?: boolean;
  maxValue?: number;
  minValue?: number;
  regex?: RegExp;
  allowNegative?: boolean;
  allowLeadingZeros?: boolean;
  refInput?: any;
}
export default function NummericInput(props: NumericInputProps) {
  const {
    id,
    variant,
    value,
    name,
    textAlign,
    className,
    defaultValue,
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
    suffixes,
    onValueChange,
    currency,
    thousandSeparator,
    maxValue,
    minValue,
    regex,
    allowNegative,
    allowLeadingZeros,
    refInput,
  } = props;

  let positionSuffixes = "right";
  if (currency && currency !== "VND" && currency !== "THB" && currency !== "SEK" && currency !== "HUF") {
    positionSuffixes = "left";
  }
  return (
    <div
      className={`base-input base-input__nummeric${
        variant && variant === "contained" ? " base-input--variant-contained" : ""
      }${error ? " invalid" : ""}${label ? " has-label" : ""}${disable ? " has-disabled" : ""}${
        className ? " " + className : ""
      }${value ? " has-value" : ""}${
        suffixes ? " base-input__suffixes base-input__suffixes--" + positionSuffixes : ""
      }${textAlign ? ` base-input--text-align-${textAlign}` : " base-input--text-align-right"}`}
    >
      <label>
        <NumberFormat
          readOnly={readOnly}
          className={`${variant ? `base-input--variant-${variant}` : ""}`}
          autoComplete="off"
          name={name}
          id={id}
          onBlur={onBlur}
          onChange={onChange}
          onValueChange={onValueChange}
          onKeyPress={onKeyPress}
          onKeyUp={onKeyUp}
          value={value}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onKeyDown={onKeyDown}
          onClick={onClick}
          disabled={disable ? true : false}
          onFocus={onFocus}
          defaultValue={defaultValue}
          thousandSeparator={thousandSeparator}
          allowLeadingZeros={allowLeadingZeros ? true : false}
          allowNegative={allowNegative ? true : false}
          isAllowed={(values) => {
            const { formattedValue, floatValue } = values;
            if (formattedValue && regex && !formattedValue.match(regex)) {
              return false;
            }
            if (maxValue) {
              return formattedValue === "" || floatValue <= maxValue;
            } else if (maxValue && minValue) {
              return formattedValue === "" || (floatValue <= maxValue && floatValue >= minValue);
            } else {
              return true;
            }
          }}
          getInputRef={refInput}
        />
        {label ? <span className="label-text">{label}</span> : null}
        {suffixes ? <span className="suffixes">{suffixes}</span> : ""}
      </label>
      {error && message ? <div className="has-error">{message}</div> : null}
    </div>
  );
}
