import React, { useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.scss";
import DatePicker from "react-datepicker";
import Icon from "components/icon";

const range = (start: number, end: number): number[] => {
  return new Array(end - start + 1).fill(undefined).map((_, i) => i + start);
};

export interface IDatePicker2Props {
  className?: string;
  label?: string;
  onChange?: (date) => void;
}

const Datepicker2 = (props: IDatePicker2Props) => {
  const {className, label, onChange} = props;
  const [startDate, setStartDate] = useState(new Date());
  const years = range(2000, new Date().getFullYear());
  const months = [
    "Tháng Một",
    "Tháng Hai",
    "Tháng Ba",
    "Tháng Tư",
    "Tháng Năm",
    "Tháng Sáu",
    "Tháng Bảy",
    "Tháng Tám",
    "Tháng Chín",
    "Tháng Mười",
    "Tháng Mười Một",
    "Tháng Mười Hai",
  ];

  const ref = useRef();
  return (
    <div className={`base-datepicker2 ${className ? className : ''}`}>
      {label ? <label>{label}</label> : ""}
      <DatePicker
        dateFormat="dd/MM/yyyy"
        ref={ref}
        calendarStartDay={1}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div
            style={{
              margin: 10,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <select
              className="select-date"
              value={date.getFullYear()}
              onChange={({ target: { value } }) => changeYear(value)}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              className="select-date"
              value={months[date.getMonth()]}
              onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} className="btn-prev">
              <Icon name="ChevronLeft" />
            </button>
            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} className="btn-next">
              <Icon name="ChevronRight" />
            </button>
          </div>
        )}
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
          onChange(date);
        }}
      />
    </div>
  );
};

export default Datepicker2;
