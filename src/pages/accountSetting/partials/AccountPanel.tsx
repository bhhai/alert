import { yupResolver } from "@hookform/resolvers/yup";

import Button from "components/button/button";
import Icon from "components/icon";
import Input from "components/input/input";
import React, { useState } from "react";
import { Controller, useForm, UseFormRegisterReturn } from "react-hook-form";
import { formatDate } from "utils/dateFormat";
import * as Yup from "yup";
import "./AccountPanel.scss";

interface AccountPanelProps {
  children: any;
  title: string;
  button?: string;
}

const validationSchema = Yup.object().shape({
  displayname: Yup.string().required("Tên hiển thị không được để trống"),
  password: Yup.string().min(6, "Mật khẩu tối thiểu 6 kí tự").required("Mật khẩu không được để trống"),
  newPassword: Yup.string().required("Mật khẩu mới không được để trống"),
  repeatNewPassword: Yup.string().oneOf([Yup.ref("newPassword"), null], "Nhập lại mật khẩu không trùng khớp"),
  email: Yup.string().email("Email không tồn tại").required("Email không được để trống"),
  phone: Yup.string().required("Số điện thoại không được để trống"),
});

export default function AccountPanel(props: AccountPanelProps) {
  const { children, title, button } = props;

  return (
    <div className="account-panel">
      <div className="account-panel__container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h4 className="account-panel__title">{title}</h4>
          {button ? (
            <Button className="title-btn" color="transparent">
              {button}
            </Button>
          ) : null}
        </div>
        {children}
      </div>
    </div>
  );
}

interface FieldProps {
  title: string;
  value: string | number;
  isEdit?: boolean;
  setIsEdit?: (isEdit: boolean) => void;
  type: "username" | "displayname" | "email" | "password" | "phone";
  register?: UseFormRegisterReturn;
  registerNewPass?: UseFormRegisterReturn;
  registerConfirm?: UseFormRegisterReturn;
  errors?: any;
  message?: string | any;
}

export const Field = (props: FieldProps) => {
  const { title, value, isEdit, setIsEdit, type, register, errors, message, registerNewPass, registerConfirm } = props;

  if (isEdit) {
    return (
      <div className="field__edit">
        <div className="field__title">{title}</div>
        <div className="field__edit__content">
          <div className="row" style={{ marginBottom: "1.6rem" }}>
            {type === "password" ? (
              <>
                <div className="col-4">
                  <Input
                    label="Mật khẩu hiện tại"
                    placeholder="Nhập mật khẩu hiện tại"
                    labelPosition="default"
                    required
                    type={type}
                    register={register}
                    error={!!errors.password}
                    message={message.password?.message}
                  />
                </div>
                <div className="col-4">
                  <Input
                    label="Mật khẩu mới"
                    placeholder="Nhập mật khẩu mới"
                    labelPosition="default"
                    required
                    type={type}
                    register={registerNewPass}
                    error={!!errors.newPassword}
                    message={message.newPassword?.message}
                  />
                </div>
                <div className="col-4">
                  <Input
                    label="Nhập lại mật khẩu mới"
                    placeholder="Nhập lại mật khẩu mới"
                    labelPosition="default"
                    required
                    type={type}
                    register={registerConfirm}
                    error={!!errors.newConfirm}
                    message={message.newConfirm?.message}
                  />
                </div>
              </>
            ) : (
              <div className="col-4">
                <Input
                  label={title}
                  name={type}
                  placeholder={`Nhập ${title.toLowerCase()}`}
                  labelPosition="default"
                  required
                  register={register}
                  error={errors}
                  message={message}
                />
              </div>
            )}
          </div>
          {type === "password" ? <span className="forgot-password">Quên mật khẩu?</span> : null}

          <div className="field__edit__content__btn">
            <Button color="transparent" type="button" onClick={setIsEdit}>
              Hủy
            </Button>
            <Button type="submit" color="primary">
              Lưu
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="field__container">
      <div className="field__title">{title}</div>
      <span className="field__value">{value}</span>
      {type !== "username" && (
        <div className="field__button">
          <Button color="transparent" onClick={setIsEdit}>
            <Icon name="Edit" />
            SỬA
          </Button>
        </div>
      )}
    </div>
  );
};

export const InputField = ({ title, type, register, errors, setIsEdit }) => {
  return (
    <div className="col-4">
      <Input
        label={title}
        name={type}
        placeholder={`Nhập ${title.toLowerCase()}`}
        labelPosition="default"
        required
        register={register}
        error={!!errors[type]}
        message={errors[type]?.message}
      />
      <div className="field__edit__content__btn">
        <Button color="transparent" type="button" onClick={setIsEdit}>
          Hủy
        </Button>
        <Button type="submit" color="primary">
          Lưu
        </Button>
      </div>
    </div>
  );
};
