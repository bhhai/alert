import React, { Fragment, useEffect, useRef, useState } from "react";
import Button from "components/button/button";
import Icon from "components/icon";
import Common from "utils/common";
import Radio from "components/radio/radio";
import DatePickerCustom from "components/datepickerCustom/datepickerCustom";
import moment from "moment";
import SelectCustom from "components/selectCustom/selectCustom";
import HookCustom from "utils/hookCustom";
import { IFilterItem } from "model/OtherModel";
import Popover from "components/popover/popover";
import Input from "components/input/input";
import { SelectOptionData } from "utils/filter";
import _ from "lodash";
import "./filter.scss";

interface FilterProps {
  name: string;
  isShowFilterList?: boolean;
  onChangeFilter: (listFilter: IFilterItem[]) => void;
  listFilterItem: IFilterItem[];
}

export default function Filter(props: FilterProps) {
  const { name, onChangeFilter, listFilterItem, isShowFilterList } = props;
  const { width } = HookCustom.useWindowDimensions();
  const [listFilterItemState, setListFilterItemState] = useState<IFilterItem[]>([]);

  const changeValueFilter = (filterItem: IFilterItem) => {
    const index = listFilterItemState.findIndex((filter) => filter.key === filterItem.key);
    if (listFilterItemState.length > 0 && index > -1) {
      const listFilterItemNew = _.cloneDeep(listFilterItemState);
      listFilterItemNew[index] = filterItem;
      setListFilterItemState(listFilterItemNew);
    } else {
      setListFilterItemState([...listFilterItemState, filterItem]);
    }
  };

  const refFilter = useRef();
  const refFilterContainer = useRef();
  const [showPopoverFilter, setShowPopoverFilter] = useState<boolean>(false);
  HookCustom.useOnClickOutside(refFilter, () => setShowPopoverFilter(false), [
    "filter-dropdown-general",
    "react-datepicker-popper",
  ]);

  const addFilterItem = (selectedOption) => {
    if (selectedOption.value) {
      setListFilterItemState([
        ...listFilterItemState,
        listFilterItem.find((filter) => filter.key === selectedOption.value),
      ]);
    }
  };

  const removeFilter = (index) => {
    const listFilterItemStateTemp = _.cloneDeep(listFilterItemState);
    listFilterItemStateTemp.splice(index, 1);
    setListFilterItemState(listFilterItemStateTemp);
  };

  useEffect(() => {
    const listFilterCurrent = listFilterItem.filter((filterItem) => filterItem.value && filterItem.value !== "");
    setListFilterItemState(listFilterCurrent);
  }, [listFilterItem]);

  const submitFilter = () => {
    let listFilterItemTemp = _.cloneDeep(listFilterItem);
    listFilterItemTemp = listFilterItemTemp.map((filter) => {
      const filterItemState = listFilterItemState.find((filterState) => filterState.key === filter.key);
      return {
        ...filter,
        list: filterItemState?.list ?? filter.list,
        value: filterItemState ? filterItemState?.value : "",
        ...(filterItemState && filterItemState.value_extra ? { value_extra: filterItemState.value_extra } : {}),
      };
    });
    onChangeFilter(listFilterItemTemp);
  };

  return (
    <div className="filter-container d-flex">
      {isShowFilterList && (
        <div className="filter-block filter-dropdown filter-dropdown-general" ref={refFilterContainer}>
          <Button
            type="button"
            color="secondary"
            onClick={() => setShowPopoverFilter(!showPopoverFilter)}
            // hasIcon={true}
          >
            Lọc{width > 768 && name ? ` ${name.toLowerCase()}` : ""}
            <Icon name="CaretDown" />
          </Button>
          {showPopoverFilter && (
            <Popover
              position="left"
              isTriangle={true}
              className="popover-filter"
              // refPopover={refFilter}
              refContainer={refFilter}
            >
              {listFilterItemState.map((filter, index) => (
                <FilterOption
                  key={index}
                  filterItem={filter}
                  handleChangeFilter={(filterItem) => changeValueFilter(filterItem)}
                  removeFilter={() => removeFilter(index)}
                />
              ))}
              {listFilterItem.length > listFilterItemState.length && (
                <div className="option-add-filter">
                  <SelectCustom
                    isSearchable={false}
                    id="optionAdd"
                    options={[
                      { value: "", label: "Chọn điều kiện lọc" },
                      ..._.cloneDeep(listFilterItem)
                        .filter((x) => !listFilterItemState.some((y) => y.key === x.key))
                        .map((filter) => {
                          return { value: filter.key, label: filter.name };
                        }),
                    ]}
                    value=""
                    placeholder="Chọn điều kiện lọc"
                    onChange={addFilterItem}
                  />
                </div>
              )}
              <Button
                type="button"
                color="secondary"
                // size="slim"
                className="btn-filter-submit"
                onClick={() => {
                  setShowPopoverFilter(!showPopoverFilter);
                  submitFilter();
                }}
              >
                Lọc
              </Button>
            </Popover>
          )}
        </div>
      )}
      {width > 768 &&
        _.cloneDeep(listFilterItem)
          .filter((filter) => filter.is_featured === true)
          .map((filter, index) => {
            const filterItemState = listFilterItemState.find((filterItem) => filterItem.key === filter.key);
            if (filterItemState) {
              filter = filterItemState;
            } else {
              filter.value = "";
              if (filter.type === "date-two") {
                filter.value_extra = "";
              }
            }
            return (
              <FilterFeatured
                key={index}
                handleChangeFilter={(filterItem) => changeValueFilter(filterItem)}
                filterItem={filter}
                onChangeFilter={() => submitFilter()}
              ></FilterFeatured>
            );
          })}
    </div>
  );
}

// Bộ lọc nổi bật hiển thị cùng thanh tìm kiếm
interface FilterItemFeatureProps {
  handleChangeFilter: (filterItem: IFilterItem) => void;
  filterItem: IFilterItem;
  onChangeFilter: () => void;
}

function FilterFeatured(props: FilterItemFeatureProps) {
  const { handleChangeFilter, filterItem, onChangeFilter } = props;

  const refFilterFeatured = useRef();
  const refFilterFeaturedContainer = useRef();
  const [showPopoverFilterFeature, setShowPopoverFilterFeature] = useState<boolean>(false);
  HookCustom.useOnClickOutside(refFilterFeatured, () => setShowPopoverFilterFeature(false), [
    `filter-dropdown-${filterItem.key}-featured`,
    ...(["date", "date-two"].indexOf(filterItem.type) > -1 ? ["react-datepicker-popper"] : []),
  ]);
  const componentFilter = (type) => {
    switch (type) {
      case "date":
      case "date-two":
        return (
          <Fragment>
            <FilterDate filterItem={filterItem} handleChangeFilter={handleChangeFilter} />
            <Button
              type="button"
              color="secondary"
              // size="slim"
              className="btn-filter-submit"
              disabled={filterItem.type === "date-two" && !filterItem.value && !filterItem.value_extra}
              onClick={() => {
                setShowPopoverFilterFeature(!showPopoverFilterFeature);
                onChangeFilter();
              }}
            >
              Lọc
            </Button>
          </Fragment>
        );
      case "input":
        return (
          <Fragment>
            <FilterInput filterItem={filterItem} handleChangeFilter={handleChangeFilter} />
            <Button
              type="button"
              color="secondary"
              // size="slim"
              className="btn-filter-submit"
              disabled={!filterItem.value}
              onClick={() => {
                setShowPopoverFilterFeature(!showPopoverFilterFeature);
                onChangeFilter();
              }}
            >
              Lọc
            </Button>
          </Fragment>
        );
      case "radio":
        return (
          <Fragment>
            <FilterRadio filterItem={filterItem} handleChangeFilter={handleChangeFilter} />
            <Button
              type="button"
              color="secondary"
              // size="slim"
              className="btn-filter-submit"
              disabled={!filterItem.value}
              onClick={() => {
                setShowPopoverFilterFeature(!showPopoverFilterFeature);
                onChangeFilter();
              }}
            >
              Lọc
            </Button>
          </Fragment>
        );
      default:
        return (
          <Fragment>
            <FilterSelect filterItem={filterItem} handleChangeFilter={handleChangeFilter} />
            <Button
              type="button"
              color="secondary"
              // size="slim"
              className="btn-filter-submit"
              disabled={
                (!filterItem.value &&
                  filterItem.list &&
                  filterItem.list.length > 0 &&
                  filterItem.list.filter((item) => item.value === "").length === 0) ||
                !filterItem.list ||
                filterItem.list.length === 0
              }
              onClick={() => {
                setShowPopoverFilterFeature(!showPopoverFilterFeature);
                onChangeFilter();
              }}
            >
              Lọc
            </Button>
          </Fragment>
        );
    }
  };

  return (
    <div
      className={`filter-block filter-dropdown filter-dropdown-${filterItem.key}-featured`}
      ref={refFilterFeaturedContainer}
    >
      <Button
        type="button"
        color="secondary"
        onClick={() => setShowPopoverFilterFeature(!showPopoverFilterFeature)}
        // hasIcon={true}
      >
        <span className="d-none d-md-block">{filterItem.name}</span>
        <Icon name="CaretDown" />
      </Button>
      {showPopoverFilterFeature && (
        <Popover
          position="left"
          isTriangle={true}
          className="popover-filter popover-filter--featured"
          // refPopover={refFilterFeatured}
          refContainer={refFilterFeatured}
        >
          {componentFilter(filterItem.type)}
        </Popover>
      )}
    </div>
  );
}

// Component các bộ lọc đã thêm trong bộ lọc chung
interface FilterOptionProps {
  handleChangeFilter: (filterItem: IFilterItem) => void;
  filterItem: IFilterItem;
  removeFilter: () => void;
}

function FilterOption(props: FilterOptionProps) {
  const { handleChangeFilter, filterItem, removeFilter } = props;
  const componentFilter = (type) => {
    switch (type) {
      case "date":
      case "date-two":
        return <FilterDate filterItem={filterItem} handleChangeFilter={handleChangeFilter} />;
      case "input":
        return <FilterInput filterItem={filterItem} handleChangeFilter={handleChangeFilter} />;
      default:
        return <FilterSelect filterItem={filterItem} handleChangeFilter={handleChangeFilter} />;
    }
  };
  return (
    <div className="filter-option d-flex align-items-center">
      <label htmlFor={`option-${filterItem.key}`}>{filterItem.name}</label>
      {componentFilter(filterItem.type)}
      <Button type="button" className="btn-remove" color="transparent" onlyIcon={true} onClick={() => removeFilter()}>
        <Icon name="Trash" />
      </Button>
    </div>
  );
}

// Component các loại bộ lọc
interface FilterItemProps {
  handleChangeFilter: (filterItem: IFilterItem) => void;
  filterItem: IFilterItem;
}

function FilterRadio(props: FilterItemProps) {
  const { handleChangeFilter, filterItem } = props;
  return (
    <div className="filter-item filter-item--radio">
      {filterItem.list?.map((item, index) => (
        <Radio
          key={index}
          name={Common.handleize(filterItem.name)}
          value={item.value}
          checked={filterItem.value === item.value}
          label={item.label}
          onChange={() => handleChangeFilter({ ...filterItem, value: item.value })}
        />
      ))}
    </div>
  );
}

function FilterDate(props: FilterItemProps) {
  const { handleChangeFilter, filterItem } = props;
  return (
    <div className="filter-item filter-item--date">
      {filterItem.type === "date-two" && <label>{filterItem.label_1 ?? "Từ ngày"}</label>}
      <DatePickerCustom
        value={filterItem?.value?.toString()}
        // placeholder="DD/MM/YYYY"
        id="FromDate"
        onChange={(e) =>
          handleChangeFilter({
            ...filterItem,
            value: moment(e).format("DD/MM/yyyy"),
          })
        }
      />
      {filterItem.type === "date-two" ? (
        <Fragment>
          <label>{filterItem.label_2 ?? "Đến ngày"}</label>
          <DatePickerCustom
            value={filterItem?.value_extra?.toString()}
            // placeholder="DD/MM/YYYY"
            onChange={(e) =>
              handleChangeFilter({
                ...filterItem,
                value_extra: moment(e).format("DD/MM/yyyy"),
              })
            }
          />
        </Fragment>
      ) : null}
    </div>
  );
}

function FilterSelect(props: FilterItemProps) {
  const { handleChangeFilter, filterItem } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSelectOpen = async () => {
    if (!filterItem.list || filterItem.list.length === 0) {
      setIsLoading(true);
      const dataOption = await SelectOptionData(filterItem.key, filterItem.params);
      if (dataOption && dataOption.length > 0) {
        handleChangeFilter({
          ...filterItem,
          list: [{ value: "", label: `Chọn ${filterItem.name.toLowerCase()}` }, ...dataOption],
        });
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="filter-item filter-item--select">
      <SelectCustom
        options={filterItem.list ?? []}
        value={filterItem?.value}
        name={Common.handleize(filterItem.name)}
        placeholder={`Chọn ${filterItem.name.toLowerCase()}`}
        isSearchable={false}
        onChange={(e) => handleChangeFilter({ ...filterItem, value: e.value })}
        isLoading={isLoading}
        onMenuOpen={onSelectOpen}
      />
    </div>
  );
}

function FilterInput(props: FilterItemProps) {
  const { handleChangeFilter, filterItem } = props;
  return (
    <div className="filter-item filter-item--input">
      <Input
        type="text"
        variant="contained"
        placeholder={`Nhập ${filterItem.name.toLowerCase()}`}
        value={filterItem.value}
        onChange={(e) => handleChangeFilter({ ...filterItem, value: e.target.value })}
      />
    </div>
  );
}

// Danh sách bộ lọc đã chọn
interface ListFilterChooseProps {
  listFilterItem: IFilterItem[];
  updateFilterItem: (listFilter: IFilterItem[]) => void;
}

export function ListFilterChoose(props: ListFilterChooseProps) {
  const { listFilterItem, updateFilterItem } = props;
  const removeValueFilter = (key) => {
    const listFilterItemNew = _.cloneDeep(listFilterItem);
    const index = listFilterItemNew.findIndex((filterItem) => filterItem.key === key);
    if (index > -1) {
      listFilterItemNew[index].value = "";
      if (listFilterItemNew[index].type === "date-two") {
        listFilterItemNew[index].value_extra = "";
      }
      updateFilterItem(listFilterItemNew);
    }
  };

  return (
    <>
      {listFilterItem && listFilterItem.length > 0 && listFilterItem.filter((item) => item.value).length > 0 ? (
        <div className="list-filter-choose">
          <ul>
            {listFilterItem &&
              listFilterItem.length > 1 &&
              listFilterItem.map((item, index) => {
                if (item.value) {
                  if (item.type !== "date" && item.type !== "date-two") {
                    return (
                      <li key={index}>
                        {item.name}:{" "}
                        {item.type === "select" || item.type === "radio"
                          ? item.list && item.list.length > 0
                            ? item.list.find((i) => i.value == item.value)?.label
                            : "đang tải"
                          : item.value}
                        <span className="btn-remove" onClick={() => removeValueFilter(item.key)}>
                          <Icon name="Times" />
                        </span>
                      </li>
                    );
                  } else {
                    return (
                      <li key={index}>
                        {item.name}: {item.value}
                        {item.value_extra ? ` - ${item.value_extra}` : ""}
                        <span className="btn-remove" onClick={() => removeValueFilter(item.key)}>
                          <Icon name="Times" />
                        </span>
                      </li>
                    );
                  }
                }
                return null;
              })}
          </ul>
        </div>
      ) : null}
    </>
  );
}
