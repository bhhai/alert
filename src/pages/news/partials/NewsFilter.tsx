import Button from "components/button/button";
import Checkbox from "components/checkbox/checkbox";
import Icon from "components/icon";
import Input from "components/input/input";
import Popover from "components/popover/popover";
import { AccountFakeData, AccountModel } from "model/news/AccountModel";
import {
  DomainFakeData,
  ProjectFilterFakeData,
  SourceFilterFakeData,
  StickerDataFake,
  TimeFilterFakeData,
} from "model/news/NewsModel";
import React, { useRef, useState } from "react";
import Function from "utils/function";
import "./NewsFilter.scss";

interface NewsFilterState {
  account: boolean;
  sticker: boolean;
  domain: boolean;
  time: boolean;
  source: boolean;
  project: boolean;
}

interface CheckboxProps {
  value: string;
  checked: boolean;
  label: string;
}

interface ListIdCheckedState {
  account: CheckboxProps[];
  sticker: CheckboxProps[];
  domain: CheckboxProps[];
  source: CheckboxProps[];
  time: CheckboxProps[];
  project: CheckboxProps[];
}

interface FilterListProps {
  label: string;
  type: "account" | "sticker" | "domain" | "source" | "project" | "time";
  data: any[];
}

const FilterListData: FilterListProps[] = [
  {
    label: "Dự án",
    type: "project",
    data: ProjectFilterFakeData,
  },
  {
    label: "Thời gian",
    type: "time",
    data: TimeFilterFakeData,
  },
  {
    label: "Nhãn",
    type: "sticker",
    data: StickerDataFake,
  },
  {
    label: "Nguồn đăng",
    type: "source",
    data: SourceFilterFakeData,
  },
  {
    label: "Tên miền",
    type: "domain",
    data: DomainFakeData,
  },
  {
    label: "Tên tài khoản",
    type: "account",
    data: AccountFakeData,
  },
];

export default function NewsFilter() {
  const [status, setStatus] = useState<NewsFilterState>({
    account: false,
    sticker: false,
    domain: false,
    project: false,
    source: false,
    time: false,
  });

  const [listIdChecked, setListIdChecked] = useState<ListIdCheckedState>({
    account: [],
    sticker: [],
    domain: [],
    source: [],
    time: [],
    project: [],
  });

  const checkOne = (
    value: string,
    checked: boolean,
    label: string,
    type: "account" | "sticker" | "domain" | "source" | "project" | "time"
  ) => {
    if (checked) {
      if (type) {
        setListIdChecked({
          ...listIdChecked,
          [type]: [...listIdChecked[type], { value: value, checked: checked, label: label }],
        });
      }
    } else {
      // unchecked
      if (type) {
        const checkValue = listIdChecked[type].filter((item) => item.value !== value);
        setListIdChecked({ ...listIdChecked, [type]: checkValue });
      }
    }
  };

  return (
    <div className="news-filter">
      <div className="news-filter__container">
        <div className="news-filter__content">
          <div className="row news-filter__content__row">
            {FilterListData.map((item, i) => (
              <FilterDropdown
                key={i}
                label={item.label}
                checkOne={checkOne}
                status={status[item.type]}
                setStatus={() => setStatus({ ...status, [item.type]: !status[item.type] })}
                listIdChecked={listIdChecked[item.type]}
                data={item.data}
                type={item.type}
              />
            ))}
          </div>

          <div className="row align-items-start">
            <div className="news-filter__list col-4">
              <span className="news-filter__label">Sắc thái:</span>
              <div className="news-filter__check-list">
                <div>
                  <Checkbox label="Tích cực" icon={<Icon name="Checked" />} />
                </div>
                <div>
                  <Checkbox label="Tiêu cực" icon={<Icon name="Checked" />} />
                </div>
                <div>
                  <Checkbox label="Trung lập" icon={<Icon name="Checked" />} />
                </div>
              </div>
            </div>

            <div className="news-filter__list col-4">
              <span className="news-filter__label">Gán nhãn:</span>
              <div className="news-filter__check-list">
                <div>
                  <Checkbox label="Đã gán nhãn" icon={<Icon name="Checked" />} />
                </div>
                <div>
                  <Checkbox label="Chưa gán nhán" icon={<Icon name="Checked" />} />
                </div>
              </div>
            </div>
          </div>

          <div className="row news-filter__content__row">
            <div className=" col-12">
              <div className="news-filter__search">
                <span className="news-filter__label">Lọc tin:</span>
                <Input
                  className="search-input"
                  icon={<Icon name="Search" />}
                  placeholder="Nhập nội dung muốn dùng và nhấn enter"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="news-filter__button">
          <div className="news-filter__button__item">
            <Button color="transparent">Xóa tất cả</Button>
          </div>
          <div className="news-filter__button__item">
            <Button disabled>Áp dụng</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface IFilterDropdownProps {
  label: string;
  status: boolean;
  setStatus: () => void;
  listIdChecked: any[];
  checkOne: (
    value: string | number,
    checked: boolean,
    name: any,
    type: "account" | "sticker" | "domain" | "source" | "project" | "time"
  ) => void;
  data: AccountModel[];
  type: "account" | "sticker" | "domain" | "source" | "project" | "time";
}

const FilterDropdown = (props: IFilterDropdownProps) => {
  const { status, setStatus, listIdChecked, checkOne, label, data, type } = props;
  const refActions = useRef(null);
  Function.useOnClickOutside(refActions, setStatus, [`news-dropdown--${type}`]);

  return (
    <div className="col-4">
      <div className="news-filter__col news-filter__popover">
        <span className="news-filter__col__label">{label}:</span>
        <div style={{ width: "100%" }} className={`news-dropdown--${type}`}>
          <Button color="transparent" className="btn-toggle" onClick={setStatus}>
            <div className="news-filter__col__placeholder">
              {listIdChecked && listIdChecked.length > 0
                ? "Đã chọn " + listIdChecked.length + " " + label.toLowerCase()
                : "Chọn " + label.toLowerCase()}
            </div>
            <Icon name="ChevronDown" />
          </Button>
          {status && (
            <Popover className="filter-popover" position="left" refContainer={refActions}>
              <div className="popover-list">
                {data &&
                  data.map((account) => {
                    const isChecked = listIdChecked.some((item) => item.value == account.id) ? true : false;
                    return (
                      <Checkbox
                        key={account.id}
                        label={account.name}
                        onChange={(e) => checkOne(e.target.value, e.target.checked, account.name, type)}
                        value={account.id}
                        icon={<Icon name="Checked" />}
                        checked={isChecked}
                      />
                    );
                  })}
              </div>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};
