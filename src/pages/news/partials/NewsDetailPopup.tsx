import Button from "components/button/button";
import Checkbox from "components/checkbox/checkbox";
import Icon from "components/icon";
import Input from "components/input/input";
import { Pills } from "components/pills/Pills";
import Tags from "components/tags/Tags";
import { StickerDataFake } from "model/news/NewsModel";
import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, Popover } from "reactstrap";
import "./NewsDetailPopup.scss";

interface INewsStailProps {
  toggle: () => void;
  modal: boolean;
  data: any;
  prevNews?: () => void;
  nextNews?: () => void;
}

export default function NewsDetailPopup(props: INewsStailProps) {
  const { toggle, modal, data, prevNews, nextNews } = props;
  const [edit, setEdit] = useState(false);
  const [collapse, SetCollapse] = useState(true);

  const handleToggleEdit = () => {
    setEdit(!edit);
  };

  return (
    <>
      <Modal
        className="news-detail"
        isOpen={modal}
        size="xl"
        style={{ maxHeight: "80vh" }}
        backdrop={true}
        scrollable={true}
        toggle={toggle}
      >
        <ModalHeader
          close={
            <button className="news-detail__close" onClick={toggle}>
              <Icon name="Times" />
            </button>
          }
          toggle={toggle}
        >
          Chi tiết tin bài
        </ModalHeader>
        <ModalBody style={{ position: "relative" }}>
          <div className="news-detail__nav">
            <Button color="transparent" onClick={prevNews}>
              <Icon name="ChevronLeft" /> Tin bài trước
            </Button>
            <Button color="transparent" onClick={nextNews}>
              Tin bài tiếp
              <Icon name="ChevronRight" />
            </Button>
          </div>
          <h2 className="news-detail__title">
            {data?.title}
            <span className="news-detail__title-icon">
              <Icon name="Link" />
            </span>
          </h2>
          <div className="news-detail__description">
            <div className="news-detail__description__info">
              <div className="news-detail__description__info__top">
                <span onClick={() => SetCollapse(!collapse)}>
                  {<Icon name={`${collapse ? "CaretRight" : "CaretDown"}`} />}
                </span>
                Thông tin chung
              </div>
              <div className={`news-detail__collapse ${collapse ? " d-none" : ""}`}>
                <div className="news-detail__description__info__item">
                  <span className="item-name">Thời gian đăng:</span>
                  <span>{data?.date}</span>
                </div>
                <div className="news-detail__description__info__item">
                  <span className="item-name">Nguồn:</span>
                  <span>{data?.source}</span>
                </div>
                {
                  <div className="news-detail__description__info__actions">
                    <span className="item-name">Tương tác:</span>
                    <div className="news-detail__description__action">
                      <span>{<Icon name="Like" />}</span>
                      <span className="action-value">{data?.like}</span>
                    </div>
                    <div className="news-detail__description__action">
                      <span>{<Icon name="Comment" />}</span>
                      <span className="action-value">{data?.comment}</span>
                    </div>
                    <div className="news-detail__description__action">
                      <span>{<Icon name="Share" />}</span>
                      <span className="action-value">{data?.share}</span>
                    </div>
                  </div>
                }
              </div>
            </div>

            <div className="news-detail__description__status">
              <h4>Sắc thái:</h4>
              <Pills color={`${data?.tag === "Trung lập" ? "normal" : data?.tag === "Tiêu cực" ? "error" : "success"}`}>
                {data?.tag}
              </Pills>
            </div>
          </div>
          <div className="news-detail__summaries">
            <div className="news-detail__summary">
              <span className="news-detail__summary__name">Tóm tắt:</span>
              <span className="news-detail__summary__content">{data?.summary}</span>
            </div>

            <div className="news-detail__summary align-items-center mt-1">
              <span className="news-detail__summary__name">Nhãn dán:</span>
              <span className="news-detail__summary__content">
                {edit ? (
                  <Input value={data.stickers.map((item) => " " + item)} />
                ) : (
                  data?.stickers && data.stickers.map((sticker, i) => <span key={i}>#{sticker}</span>)
                )}
              </span>
              <span className="news-detail__edit">
                {edit ? (
                  <Button color="transparent" onClick={handleToggleEdit}>
                    {<Icon name="Save" />} Lưu
                  </Button>
                ) : (
                  <Button color="transparent" onClick={handleToggleEdit}>
                    {<Icon name="Edit" />} sửa
                  </Button>
                )}
              </span>
            </div>
          </div>
          <div className="news-detail__content">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
            qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
            in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
            occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
            est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
          </div>
          {edit ? <StickerModal stickers={StickerDataFake} /> : null}
        </ModalBody>
      </Modal>
    </>
  );
}

const StickerModal = ({ stickers }) => {
  const [options, setOptions] = useState([]);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const list = stickers.map((item) => {
      return {
        value: item.id,
        label: item.name,
        type: "amount",
      };
    });

    setOptions(list);
  }, []);

  const getTop = () => {
    setDropdown(!dropdown);
  };

  return (
    <div className="sticker-modal">
      <div className="sticker-modal__container">
        <h4 className="sticker-modal__title">Gán nhãn cho tin bài:</h4>
        <div className="sticker-modal__sellect">
          <Button id="Popover1" className="sticker-modal__sellect__btn" color="transparent" onClick={getTop}>
            Chọn nhãn dán cho tin bài
            <Icon name="ChevronDown" />
          </Button>
          <div className="sticker-modal__recommended">
            <span className="sticker-modal__recommended__name">Đề xuất:</span>
            <div className="sticker-modal__recommended__list">
              {stickers.slice(0, 3).map((sticker) => (
                <Tags className="mr-2" disable key={sticker.id}>
                  {sticker.name}
                </Tags>
              ))}
            </div>

            <div className="sticker-modal__btn">
              <Button color="transparent">Gán nhãn đề xuất</Button>
            </div>
          </div>

          <Popover
            className="sticker-modal__pop"
            placement="bottom-start"
            target="Popover1"
            isOpen={dropdown}
            toggle={() => setDropdown(!dropdown)}
          >
            <div style={{ padding: "10px 16px" }}>
              {stickers &&
                stickers.map((sticker) => (
                  <Checkbox
                    className="check-box"
                    key={sticker.id}
                    icon={<Icon name="Checked" />}
                    label={sticker.name}
                  />
                ))}
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
};
