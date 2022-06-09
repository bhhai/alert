import Icon from "components/icon";
import React, { useState } from "react";
import { Modal, ModalHeader, Nav, TabContent } from "reactstrap";

interface AccountDetailProps {
  modal: boolean;
  toggle: any;
  data: any;
}

export default function AccountDetail(props: AccountDetailProps) {
  const { modal, toggle, data } = props;
  const [currentActiveTab, setCurrentActiveTab] = useState<string>("1");
  const toggleTab = (tab) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };
  return (
    <div className="account-detail">
      <Modal
        className="account-detail__modal"
        isOpen={modal}
        size="md"
        style={{ maxHeight: "80vh" }}
        backdrop={true}
        scrollable={true}
        toggle={toggle}
      >
        <div className="account-detail__body">
          <button className="news-detail__close account-detail__close" onClick={toggle}>
            <Icon name="Times" />
          </button>
          <div className="account-detail__header">
            <div className="account-detail__avatar">
              <img
                src={
                  data.raw?.avatar_url || "https://www.ebbenandyorke.co.uk/wp-content/uploads/2018/05/noprofile_lg.gif"
                }
                alt=""
              />
            </div>
            <h4 className="account-detail__name">{data.raw.full_name}</h4>
            <span className="account-detail__des">Đã tham gia từ tháng 7 năm 2021</span>
          </div>

          <div className="account-detail__tab">
            <Nav className="account-detail__nav">
              <li
                className={`account-detail__nav-item ${currentActiveTab === "1" ? " active" : ""}`}
                onClick={() => {
                  toggleTab("1");
                }}
              >
                Thông tin tài khoản
              </li>
              <li
                className={`account-detail__nav-item ${currentActiveTab === "2" ? " active" : ""}`}
                onClick={() => {
                  toggleTab("2");
                }}
              >
                Dự án sở hữu
              </li>
            </Nav>
            <TabContent>
              <div className="account-detail__content">
                {(currentActiveTab === "1" && (
                  <div className="account-detail__info">
                    <div className="account-detail__info__row">
                      <div className="account-detail__info__key">Chức vụ</div>
                      <div className="">Trưởng phòng</div>
                    </div>
                    <div className="account-detail__info__row">
                      <div className="account-detail__info__key">Phòng ban</div>
                      <div className="">Phòng ban 1</div>
                    </div>
                    <div className="account-detail__info__row">
                      <div className="account-detail__info__key">Dự án sở hữu</div>
                      <div className="">11</div>
                    </div>
                  </div>
                )) ||
                  (currentActiveTab == "2" && <p>Chưa có dự án sở hữu</p>)}
              </div>
            </TabContent>
          </div>
        </div>
      </Modal>
    </div>
  );
}
