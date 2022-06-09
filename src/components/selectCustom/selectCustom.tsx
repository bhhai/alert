import React, { useRef, useState } from "react";
import Select from "react-select";
import { IOption } from "model/OtherModel";
import "./selectCustom.scss";
import { IAction } from "components/boxTable/boxTable";
interface SelectCustomProps {
  id?: string;
  value?: string | number;
  defaultValue?: string | number;
  name?: string;
  className?: string;
  placeholder?: string;
  onChange?: any;
  autoFocus?: boolean;
  onFocus?: (e) => void;
  onBlur?: (e) => void;
  error?: boolean;
  message?: string;
  label?: string;
  disable?: boolean;
  readOnly?: boolean;
  isSearchable?: boolean;
  options: IOption[];
  isLoading?: boolean;
  onMenuOpen?: () => void;
  required?: boolean;
  action?: IAction;
}

export default function SelectCustom(props: SelectCustomProps) {
  const {
    id,
    value,
    defaultValue,
    name,
    className,
    placeholder,
    autoFocus,
    error,
    onFocus,
    onBlur,
    message,
    disable,
    readOnly,
    label,
    onChange,
    isSearchable,
    options,
    isLoading,
    onMenuOpen,
    required,
    action,
  } = props;

  const [onFocusSelect, setOnFocusSelect] = useState<boolean>(false);
  const [onHasValue, setOnHasValue] = useState<boolean>(options.find((o) => o.value === value) ? true : false);
  const refSelect = useRef(null);

  return (
    <div
      className={`base-select${onFocusSelect ? " on-focus" : ""}${error ? " invalid" : ""}${
        onHasValue ? " has-value" : ""
      }${className ? " " + className : ""}`}
    >
      <Select
        id={id}
        autoFocus={autoFocus}
        name={name}
        className="select-custom"
        isSearchable={isSearchable ?? !readOnly ?? false}
        defaultValue={options.find((o) => o.value === defaultValue) ?? null}
        value={options.find((o) => o.value === value) ?? null}
        options={options}
        placeholder={placeholder ?? " "}
        isLoading={isLoading}
        loadingMessage={() => "Đang tải"}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "#015aa4",
            primary25: "#e9eaeb",
            primary50: "#e9eaeb",
            neutral0: "#ffffff",
            neutral70: "#015aa4",
          },
        })}
        onChange={(e) => {
          setOnHasValue(e.value !== null && e.value !== undefined && e.value !== "");
          if (refSelect) {
            refSelect.current.blur();
          }
          if (onChange) {
            onChange(e);
          }
        }}
        onFocus={(e) => {
          setOnFocusSelect(true);
          if (onFocus) {
            onFocus(e);
          }
        }}
        onBlur={(e) => {
          setOnFocusSelect(false);
          if (onBlur) {
            onBlur(e);
          }
        }}
        isDisabled={disable}
        openMenuOnClick={!readOnly}
        ref={refSelect}
        noOptionsMessage={() => "Không tìm thấy lựa chọn"}
        onMenuOpen={onMenuOpen}
      />
      {label ? (
        <label className="label-text" htmlFor={name}>
          <p>
            {label}
            {required ? (
              <>
                <span className="required">*</span>
              </>
            ) : null}
          </p>

          <span className="action" onClick={action?.callback}>{action?.title}</span>
        </label>
      ) : null}
      {error && message ? <div className="has-error">{message}</div> : null}
    </div>
  );
}
