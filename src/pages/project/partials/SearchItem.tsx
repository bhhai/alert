import Button from "components/button/button";
import Checkbox from "components/checkbox/checkbox";
import Icon from "components/icon";
import Popover from "components/popover/popover";
import SelectCustom from "components/selectCustom/selectCustom";
import { IOption } from "model/OtherModel";
import React, { useState, useEffect, useRef } from "react";
import "./SearchItem.scss";
import Function from "utils/function";

export interface ISearchTable {
  className?: string;
  label: string;
  type: string; //"select" | "checkbox";
  options: IOption[];
  callback?: (label, value) => void;
  data?: any;
  isShow?: boolean;
  search?: (value) => void;
}

const SearchItem = (props: ISearchTable) => {
  const { label, type, options, callback, className, data, isShow, search } = props;
  const [isActive, setIsActive] = useState(isShow || false);
  const [selected, setSelected] = useState([]);
  const refActions = useRef(null);

  useEffect(() => {
    setSelected(data.filter((el) => el.label === label).map((el) => el.value));
  }, [data]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (isActive && refActions.current && !refActions.current.contains(event.target)) {
        setIsActive(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive]);
  return (
    <div className={`search-item ${className ? className : ""} `} ref={refActions}>
      <p
        onClick={() => {
          setIsActive(!isActive);
        }}
      >
        <span>{label}</span> <Icon className="icon-caretdown" name="CaretDown" />
      </p>
      {isActive ? (
        <Popover position="left" className="popover-searchtable" isTriangle={true}>
          {type === "select" ? (
            <SelectCustom
              value={selected[0]}
              placeholder={`Chọn ${label}`}
              onChange={(e) => {
                search(e.value);
                setSelected([e.value.toLowerCase()]);
              }}
              options={options}
              className="popover-select"
            />
          ) : null}
          {type === "checkbox" ? (
            <div className="popover-checkbox">
              {options.map((option, index) => (
                <Checkbox
                  checked={selected.includes(option.value) ? true : false}
                  key={index}
                  value={String(option.value)}
                  label={String(option.label)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelected([...selected, e.target.value.toLowerCase()]);
                    } else {
                      setSelected(selected.filter((el) => el !== e.target.value.toLowerCase()));
                    }
                  }}
                />
              ))}
            </div>
          ) : null}
          <Button
            color="primary"
            onClick={() => {
              callback(label, selected);
              setIsActive(!isActive);
            }}
          >
            Lọc
          </Button>
        </Popover>
      ) : null}
    </div>
  );
};

export default SearchItem;
