import React, { useState, useEffect, useRef, useContext } from "react";
import Icon from "components/icon";
import Button from "components/button/button";
import Popover from "components/popover/popover";
import HookCustom from "utils/hookCustom";
import "./pagination.scss";
// import { ContextType, UserContext } from "contexts/userContext";

export interface PaginationProps {
  name?: string;
  displayNumber: number;
  page: number;
  sizeLimit: number;
  totalPage: number;
  totalItem: number;
  setPage?: (page: number) => void;
  chooseSizeLimit?: (limit: number) => void;
  isChooseSizeLimit?: boolean;
}

export const DataPaginationDefault: PaginationProps = {
  name: "",
  displayNumber: 3,
  page: 1,
  sizeLimit: 10,
  totalPage: 10,
  totalItem: 100,
  setPage: () => undefined,
};

const listSizeLimit: number[] = [10, 30, 50];

export function Pagination(props: PaginationProps) {
  const isCollapsedSidebar = false;
  const { width } = HookCustom.useWindowDimensions();
  const { name, displayNumber, page, sizeLimit, totalPage, totalItem, setPage, chooseSizeLimit, isChooseSizeLimit } =
    props;
  const isEven = (n) => {
    return n % 2 === 0;
  };

  const [listPage, setListPage] = useState<number[]>([]);
  const caculateDisplayListPage = () => {
    const arrPage: number[] = [];
    let numberSub = 1;
    let numberPlus = 0;
    if (isEven(displayNumber)) {
      numberSub = 2;
      numberPlus = 1;
    }
    let startPage = 1;
    let endPage = totalPage;
    if (totalPage > displayNumber) {
      startPage = page - (displayNumber - numberSub) / 2 > 0 ? page - (displayNumber - numberSub) / 2 : 1;
      endPage = page + displayNumber / 2 <= displayNumber ? displayNumber : page + displayNumber / 2;
      startPage =
        page + (displayNumber - numberSub) / 2 >= totalPage
          ? totalPage - (displayNumber - numberSub + numberPlus)
          : startPage;
      endPage = endPage >= totalPage ? totalPage : endPage;
    }
    for (let i = startPage; i <= endPage; i++) {
      if (i > 1 && i < totalPage) {
        arrPage.push(i);
      }
    }
    setListPage(arrPage);
  };

  useEffect(() => {
    caculateDisplayListPage();
  }, [props]);

  const refSizeLimit = useRef();
  const refSizeLimitContainer = useRef();
  const [showSizeLimit, setShowSizeLimit] = useState<boolean>(false);
  HookCustom.useOnClickOutside(refSizeLimit, () => setShowSizeLimit(false), ["display-item__button"]);

  const [showGotoNext, setShowGotoNext] = useState(false);
  const [showGotoPrev, setShowGotoPrev] = useState(false);
  const refButtonNext = useRef();
  const refButtonPrev = useRef();
  HookCustom.useOnClickOutside(refButtonPrev, () => setShowGotoPrev(false), ["page-item__ellipsis-prev"]);
  HookCustom.useOnClickOutside(refButtonNext, () => setShowGotoNext(false), ["page-item__ellipsis-next"]);

  return (
    <div
      className={`pagination d-flex align-items-center justify-content-between flex-wrap${
        isChooseSizeLimit ? " has-choose-size-limit" : ""
      }${isCollapsedSidebar ? " has-sidebar-collapsed" : ""}`}
    >
      <div className="count-item">
        Hiển thị kết quả từ {page > 1 ? (page - 1) * sizeLimit + 1 : 1} -{" "}
        {page * sizeLimit < totalItem ? page * sizeLimit : totalItem} trên tổng
        {` ${totalItem}`}
      </div>
      {isChooseSizeLimit ? (
        <div className="display-item d-flex align-items-center">
          Hiển thị
          <div className="display-item__button" ref={refSizeLimitContainer}>
            <Button type="button" color="secondary" onClick={() => setShowSizeLimit(!showSizeLimit)}>
              {sizeLimit} <Icon name="CaretUp" />
            </Button>
          </div>
          {name ? ` ${name.toLowerCase()}` : " dòng"}
        </div>
      ) : null}
      <div className="pager d-flex align-items-center justify-content-center justify-content-md-end">
        {totalPage > 1 ? (
          <ul className="d-flex align-items-center flex-wrap">
            {totalPage > displayNumber ? (
              <li
                className={`page-prev ${page === 1 ? "disabled" : ""}`}
                onClick={page > 1 ? () => setPage(page - 1) : undefined}
              >
                <Icon name="ChevronLeft" />
                {(width > 1550 && isCollapsedSidebar) || width > 1750 ? "Trang trước " : ""}
              </li>
            ) : null}
            <li className={`page-item${page === 1 ? " active" : ""}`} onClick={() => setPage(1)}>
              1
            </li>
            {page - 4 >= 1 ? (
              <li className="page-item page-item__ellipsis page-item__ellipsis-prev">
                <Button
                  type="button"
                  color="transparent"
                  onlyIcon={true}
                  onClick={() => setShowGotoPrev(!showGotoPrev)}
                >
                  ...
                </Button>
                {showGotoPrev ? (
                  <GotoPage
                    number={+page - 3}
                    lastPage={totalPage}
                    onChange={(e) => {
                      setPage(e);
                      setShowGotoPrev(false);
                    }}
                    refContainer={refButtonPrev}
                  />
                ) : null}
              </li>
            ) : null}
            {totalPage > 1 &&
              listPage.map((number) => {
                return (
                  <li
                    key={number}
                    className={`page-item${page === number ? " active" : ""}`}
                    onClick={() => setPage(number)}
                  >
                    {number}
                  </li>
                );
              })}
            {+page + 4 < totalPage ? (
              <li className="page-item page-item__ellipsis page-item__ellipsis-next">
                <Button
                  type="button"
                  color="transparent"
                  onlyIcon={true}
                  onClick={() => setShowGotoNext(!showGotoNext)}
                >
                  ...
                </Button>
                {showGotoNext ? (
                  <GotoPage
                    number={+page + 3}
                    lastPage={totalPage}
                    onChange={(e) => {
                      setPage(e);
                      setShowGotoNext(false);
                    }}
                    refContainer={refButtonNext}
                  />
                ) : null}
              </li>
            ) : null}
            {totalPage > 1 ? (
              <li className={`page-item${page === totalPage ? " active" : ""}`} onClick={() => setPage(totalPage)}>
                {totalPage}
              </li>
            ) : null}
            {totalPage > displayNumber ? (
              <li
                className={`page-next ${page === totalPage ? "disabled" : ""}`}
                onClick={page < totalPage ? () => setPage(page + 1) : undefined}
              >
                {(width > 1550 && isCollapsedSidebar) || width > 1750 ? "Trang sau " : ""}
                <Icon name="ChevronRight" />
              </li>
            ) : null}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export const GotoPage = ({ number, lastPage, onChange, refContainer }) => {
  const [numberTemp, setNumberTemp] = useState(number);
  return (
    <div className="goto-container" ref={refContainer}>
      <div className="goto-wrapper">
        <h4>Chuyển tới trang</h4>
        <div className="d-flex">
          <input
            type="text"
            className="count"
            autoFocus
            value={numberTemp}
            onChange={(e) => setNumberTemp(e.target.value)}
          />
          <span
            className="button-count"
            onClick={() => {
              if (numberTemp > 1) setNumberTemp(numberTemp - 1);
            }}
          >
            <Icon name="Minus" />
          </span>
          <span
            className="button-count"
            onClick={() => {
              if (numberTemp < lastPage) setNumberTemp(numberTemp + 1);
            }}
          >
            <Icon name="Plus" />
          </span>
          <Button
            type="button"
            color="secondary"
            onClick={() => onChange(numberTemp > lastPage ? lastPage : numberTemp < 1 ? 1 : numberTemp)}
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  );
};
