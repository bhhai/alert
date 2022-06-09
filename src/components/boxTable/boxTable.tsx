import React, { Fragment, useEffect, useRef, useState } from "react";
import { PaginationModel } from "model/PaginationModel";
import { Pagination } from "../pagination/pagination";
import BulkAction, { BulkActionItemModel } from "../bulkAction/bulkAction";
import Checkbox from "../checkbox/checkbox";
import Popover from "../popover/popover";
import Function from "utils/function";
import Button from "../button/button";
import Icon from "../icon";
import ReactTooltip from "react-tooltip";
import "./boxTable.scss";

export interface BoxTableProps {
  name: string;
  titles: string[];
  actions?: IAction[];
  items: any[];
  className?: string;
  dataMappingArray: (item: any) => void;
  dataFormat?: string[];
  onClickRow?: (id: number) => void;
  striped?: boolean;
  isBulkAction?: boolean;
  bulkActionItems?: BulkActionItemModel[]; //thao tacs
  isPagination?: boolean;
  dataPagination?: PaginationModel;
  listIdChecked?: number[];
  setListIdChecked?: (listId: number[]) => void;
  renderDetail?: any;
  listDetailData?: any[];
  listIdDetailShow?: number[];
}

export interface IAction {
  title: string;
  callback: (item: any) => void;
  icon?: any;
  color?: string;
}

export default function BoxTable(props: BoxTableProps) {
  const {
    name,
    titles,
    actions,
    items,
    className,
    onClickRow,
    striped,
    isBulkAction,
    bulkActionItems,
    isPagination,
    dataPagination,
    dataMappingArray,
    dataFormat,
    listIdChecked,
    setListIdChecked,
    renderDetail,
    listDetailData,
    listIdDetailShow,
  } = props;
  const [listItem, setListItem] = useState<any[]>();
  const checkAll = (isChecked: boolean) => {
    if (isChecked) {
      setListIdChecked &&
        setListIdChecked(
          items.map((i) => {
            return i.id;
          })
        );
    } else {
      setListIdChecked && setListIdChecked([]);
    }
  };

  const checkOne = (id: number, isChecked: boolean) => {
    if (isChecked) {
      setListIdChecked && setListIdChecked([...(listIdChecked ?? []), id]);
    } else {
      setListIdChecked && setListIdChecked(listIdChecked?.filter((i) => i !== id) ?? []);
    }
  };

  const mapData = (data: any[]) => {
    return data?.map((item) => ({
      id: item.id,
      data: dataMappingArray(item),
      raw: item,
      showActionRow: false,
      onShowDetail: false,
    }));
  };

  useEffect(() => {
    setListItem(mapData(items));
    return () => {
      setListItem([]);
    };
  }, [items]);

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [listItem]);

  const refActions = useRef();
  Function.useOnClickOutside(refActions, () => handleShowActionRow(0), ["actions"]);

  const handleShowActionRow = (id: number, isShow?: boolean) => {
    const listItemTemp = listItem?.map((item) => {
      return {
        ...item,
        showActionRow: id === 0 ? false : item.id === id ? isShow : false,
      };
    });
    setListItem(listItemTemp);
  };

  return (
    <div className="box-table__wrapper">
      <div className="box-table">
        <table
          className={`table${striped ? " table-striped" : ""}${isPagination ? " has-pagination" : ""}${
            className ? ` ${className}` : ""
          }`}
        >
          <thead>
            <tr>
              {isBulkAction && bulkActionItems && bulkActionItems?.length > 0 && listIdChecked && setListIdChecked ? (
                <th className="checkbox">
                  <Checkbox
                    icon={<Icon name="Minus" className="minuns" />}
                    indeterminate={listIdChecked?.length > 0 && listIdChecked?.length < items.length}
                    checked={listIdChecked?.length === items.length}
                    onChange={(e) => checkAll(e.target.checked)}
                  />
                  <BulkAction name={name} selectedCount={listIdChecked?.length} bulkActionItems={bulkActionItems} />
                </th>
              ) : null}
              {titles?.map((title, idx) => (
                <th key={idx} className={`${dataFormat ? dataFormat[idx] : ""}`}>
                  {title}
                </th>
              ))}
              {actions && actions?.length > 0 ? <th className="actions"></th> : null}
            </tr>
          </thead>
          <tbody>
            {listItem?.map((item, index) => {
              const isChecked =
                listIdChecked && setListIdChecked && listIdChecked.some((id) => id === item.id) ? true : false;
              const itemDetail = listDetailData?.find((d) => d.id === item.id);
              return (
                <Fragment key={index}>
                  <tr
                    onClick={() => (onClickRow ? onClickRow(item) : null)}
                    className={`${onClickRow ? "cursor-pointer" : ""}${
                      isBulkAction && bulkActionItems && bulkActionItems?.length > 0 && isChecked ? " has-choose" : ""
                    }`}
                  >
                    {isBulkAction &&
                    bulkActionItems &&
                    bulkActionItems?.length > 0 &&
                    listIdChecked &&
                    setListIdChecked ? (
                      <td className="checkbox" onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={isChecked}
                          onChange={(e) => checkOne(item.id, e.target.checked)}
                          icon={<Icon name="Checked" />}
                        />
                      </td>
                    ) : null}
                    {item.data?.map((d: any, idx: number) => (
                      <td className={`${dataFormat ? dataFormat[idx] : ""}`} key={idx}>
                        {typeof d === "string" || typeof d === "number" ? <span>{d}</span> : d}
                      </td>
                    ))}
                    {actions && actions?.length > 0 ? (
                      <td className="actions task" onClick={(e) => e.stopPropagation()}>
                        {actions.map((el, idx) => (
                          <div style={{ color: el.color }} onClick={() => el.callback(item)} key={idx}>
                            {el.icon}
                            {el.title}
                          </div>
                        ))}
                      </td>
                    ) : null}
                  </tr>
                  {itemDetail ? (
                    <tr className={`row-detail${listIdDetailShow?.find((id) => id === item.id) ? "" : " d-none"}`}>
                      <td colSpan={item.data.length + (isBulkAction ? 1 : 0) + (actions ? 1 : 0)}>
                        {renderDetail(itemDetail)}
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      {isPagination && dataPagination ? (
        <Pagination
          name={dataPagination.name}
          displayNumber={3}
          page={dataPagination.page}
          setPage={(page) => dataPagination.setPage(page)}
          sizeLimit={dataPagination.sizeLimit}
          totalItem={dataPagination.totalItem}
          totalPage={dataPagination.totalPage}
          isChooseSizeLimit={dataPagination.isChooseSizeLimit}
          chooseSizeLimit={(limit) => dataPagination.chooseSizeLimit && dataPagination.chooseSizeLimit(limit)}
        />
      ) : null}
      <ReactTooltip />
    </div>
  );
}
