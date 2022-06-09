import Button from "components/button/button";
import Checkbox from "components/checkbox/checkbox";
import Icon from "components/icon";
import React from "react";
import { Field } from "./AccountPanel";
import "./NotificationPanel.scss";

interface NotificationProps {
  isEdit: any;
  setIsEdit: any;
}

export default function NotificationPanel(props: NotificationProps) {
  const { isEdit, setIsEdit } = props;
  return (
    <div>
      <div className="notification">
        <div className="notification__table">
          <div className="notification__table__header">Tài khoản nhận thông báo</div>
          <div className="notification__body">
            <Field
              title="Email"
              value="haibh.dev@gmail.com"
              type="displayname"
              isEdit={isEdit.email}
              setIsEdit={() => setIsEdit({ ...isEdit, email: !isEdit.email })}
            />
            <Field
              title="Sms"
              value="0952342342"
              type="displayname"
              isEdit={isEdit.sms}
              setIsEdit={() => setIsEdit({ ...isEdit, sms: !isEdit.sms })}
            />
          </div>
        </div>
        <div className="notification__table">
          <div className="notification__table__header">
            <div className="row">
              <div className="col-7">
                <h3>Bạn nhận thông báo về</h3>
              </div>
              <div className="col-5">
                <div className="row">
                  <h3 className="col-4 text-center">Trên Alert.vn</h3>
                  <h3 className="col-4 text-center">Qua Email</h3>
                  <h3 className="col-4 text-center">Qua tin nhắn Sms</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="notification__body">
            <>
              <div className="row" style={{ padding: "2.4rem 4rem" }}>
                <div className="col-7 notification__body__title">
                  <h3>Khi có mention</h3>
                  <span>Khi có tin bài có nội dung chứa từ khoá được đề cập trong các Bộ truy vấn</span>
                </div>
                <div className="col-5" style={{ margin: "auto" }}>
                  <div className="row">
                    <div className="col-4">
                      <Checkbox icon={<Icon name="Checked" />} />
                    </div>
                    <div className="col-4">
                      <Checkbox icon={<Icon name="Checked" />} />
                    </div>
                    <div className="col-4">
                      <Checkbox icon={<Icon name="Checked" />} />
                    </div>
                  </div>
                </div>
              </div>
            </>
            <>
              <div className="row" style={{ padding: "2.4rem 4rem" }}>
                <div className="col-7 notification__body__title">
                  <h3>Khi có tin tiêu cực</h3>
                  <span>Khi tin bài về có sắc thái tiêu cực và thuộc Kênh MXH và Bộ truy vấn</span>
                </div>
                <div className="col-5" style={{ margin: "auto" }}>
                  <div className="row">
                    <div className="col-4">
                      <Checkbox icon={<Icon name="Checked" />} />
                    </div>
                    <div className="col-4">
                      <Checkbox icon={<Icon name="Checked" />} />
                    </div>
                    <div className="col-4">
                      <Checkbox icon={<Icon name="Checked" />} />
                    </div>
                  </div>
                </div>
              </div>
            </>
            <>
              <div className="row" style={{ padding: "2.4rem 4rem" }}>
                <div className="col-7 notification__body__title">
                  <h3>Độ lan tỏa</h3>
                  <span>Mô tả</span>
                </div>
                <div className="col-5" style={{ margin: "auto" }}>
                  <div className="row">
                    <div className="col-4">
                      <Checkbox icon={<Icon name="Checked" />} />
                    </div>
                    <div className="col-4">
                      <Checkbox icon={<Icon name="Checked" />} />
                    </div>
                    <div className="col-4">
                      <Checkbox icon={<Icon name="Checked" />} />
                    </div>
                  </div>
                </div>
              </div>
            </>
            <>
              <div className="row" style={{ padding: "2.4rem 4rem" }}>
                <div className="col-7 notification__body__title">
                  <h3>Chỉ số ô nhiễm dự án</h3>
                  <span>Mô tả</span>
                </div>
                <div className="col-5" style={{ margin: "auto" }}>
                  <div className="row">
                    <div className="col-4">
                      <Checkbox icon={<Icon name="Checked" />} />
                    </div>
                    <div className="col-4">
                      <Checkbox icon={<Icon name="Checked" />} />
                    </div>
                    <div className="col-4">
                      <Checkbox icon={<Icon name="Checked" />} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          </div>
        </div>
        <div className="notification__table">
          <div className="notification__table__header">Ngưỡng cảnh báo</div>
          <div className="notification__body">
            <Field
              title="Độ lan tỏa"
              value="0.5"
              type="displayname"
              isEdit={isEdit.spread}
              setIsEdit={() => setIsEdit({ ...isEdit, spread: !isEdit.spread })}
            />
            <Field
              title="Chỉ số ô nhiễm dự án"
              value="0.5"
              type="displayname"
              isEdit={isEdit.pollutionIndex}
              setIsEdit={() => setIsEdit({ ...isEdit, pollutionIndex: !isEdit.pollutionIndex })}
            />
          </div>
        </div>
      </div>
      <div
        className="button"
        style={{ marginTop: "5.4rem", marginLeft: "auto", display: "flex", justifyContent: "flex-end" }}
      >
        <Button color="transparent">Hủy</Button>
        <Button disabled color="primary">
          Lưu
        </Button>
      </div>
    </div>
  );
}
