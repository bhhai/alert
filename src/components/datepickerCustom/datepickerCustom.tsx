import React, { useRef, useState } from "react";
import Icon from "../icon";
import en from "date-fns/locale/en-US";
import { Portal } from "react-overlays";
import DatePicker from "react-datepicker";
import moment from "moment";
import MaskedInput from "react-text-mask";
import Function from "utils/function";
import "react-datepicker/dist/react-datepicker.css";
import "./datepickerCustom.scss";

interface DatePickerCustomProps {
  id?: string;
  value?: string;
  name?: string;
  className?: string;
  onChange?: any;
  onFocus?: any;
  onBlur?: any;
  error?: boolean;
  message?: string;
  onClick?: any;
  label?: string;
  disable?: boolean;
  required?: boolean;
}
export default function DatePickerCustom(props: DatePickerCustomProps) {
  const { id, value, name, className, error, message, disable, label, onFocus, onBlur, onClick, onChange, required } =
    props;

  const [onFocusInput, setOnFocusInput] = useState<boolean>(false);
  let utcDateUpdate = new Date();
  if (value) {
    const dateConvert = moment(value, "DD/MM/yyyy").toDate();
    utcDateUpdate = new Date(Date.UTC(dateConvert.getFullYear(), dateConvert.getMonth(), dateConvert.getDate()));
  } else {
    utcDateUpdate = new Date(Date.UTC(utcDateUpdate.getFullYear(), utcDateUpdate.getMonth(), utcDateUpdate.getDate()));
  }

  const refPicker = useRef();
  Function.useOnClickOutside(refPicker, () => setOnFocusInput(false), "base-datepicker");

  return (
    <div
      className={`base-datepicker${error ? " invalid" : ""}${disable ? " has-disabled" : ""}${
        className ? " " + className : ""
      }${onFocusInput ? " on-focus" : ""}${value && utcDateUpdate ? " has-value" : ""}`}
      ref={refPicker}
    >
      <label>
        <DatePicker
          open
          formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 1)}
          id={id}
          name={name}
          locale={en}
          autoComplete="off"
          dateFormat="dd/MM/yyyy"
          popperContainer={CalendarContainer}
          customInput={<MaskedInput mask={[/[0-3]/, /\d/, "/", /[0-1]/, /\d/, "/", /[1-2]/, /\d/, /\d/, /\d/]} />}
          selected={
            value && value.length !== 0 && moment(value, "DD/MM/yyyy", true).isValid()
              ? moment(value, "DD/MM/yyyy").toDate()
              : null
          }
          showYearDropdown
          showMonthDropdown
          onChange={(date) => {
            if (date != null) {
              utcDateUpdate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            }
            onChange(utcDateUpdate || "");
          }}
          onClick={onClick}
          disable={disable}
          onFocus={(e) => {
            setOnFocusInput(true);
            if (onFocus) {
              onFocus(e);
            }
          }}
          onBlur={(e) => {
            setOnFocusInput(false);
            if (onBlur) {
              onBlur(e);
            }
          }}
          onClose={() => setOnFocusInput(false)}
        />
        {label ? (
          <span className="label-text">
            {label}
            {required ? (
              <>
                {" "}
                (<span className="required"> * </span>)
              </>
            ) : null}
          </span>
        ) : null}
        <span className="icon d-flex align-items-center justify-content-center">
          <Icon name="calendar" />
        </span>
      </label>
      {error && message ? <div className="has-error">{message}</div> : null}
    </div>
  );
}

const CalendarContainer = ({ children }) => {
  const el = document.getElementsByTagName("body")[0];
  return <Portal container={el}>{children}</Portal>;
};
