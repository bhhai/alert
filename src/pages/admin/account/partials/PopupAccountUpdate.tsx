import { yupResolver } from "@hookform/resolvers/yup";
import Avatar from "assets/images/avatar.jpg";
import Button from "components/button/button";
import Icon from "components/icon";
import Input from "components/input/input";
import SelectCustom from "components/selectCustom/selectCustom";
import { register } from "fetch-intercept";
import { IUser } from "model/user/UserModel";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import AccountManagermentService from "services/admin/AccountManagermentService";
import DepartService from "services/DepartService";
import Common from "utils/common";
import * as Yup from "yup";

interface PopupAccountUpdateProps {
  modal: boolean;
  toggle: any;
  data: any;
  reload: boolean;
  setReload: any;
}

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Tên tài khoản không được để trống")
    .matches(/^[a-zA-Z0-9_.-]*$/, "Tên tài khoản không được chứa kí tự đặc biệt")
    .max(50, "Tên tài khoản không được quá 50 kí tự")
    .min(8, "Tên tài khoản không được dưới 8 kí tự"),
  full_name: Yup.string().required("Họ và tên không được để trống").max(255, "Họ và tên không quá 255 kí tự"),
  email: Yup.string()
    .required("Email không được để trống")
    .email("Email không tồn tại")
    .max(255, "Email không quá 255 kí tự"),
  roles: Yup.string().required("Chức vụ không được để trống"),
});

export default function PopupAccountUpdate(props: PopupAccountUpdateProps) {
  const { modal, toggle, data, setReload, reload } = props;
  const [item, setItem] = useState<IUser>();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleFileOnChange = (e) => {
    console.log(e);
  };

  const handleFormSubmit = (data) => {
    console.log(data);
    AccountManagermentService.updateAccount(data.id, data)
      .then((res) => {
        if (res.message === "OK") {
          Common.showToast(`Cập nhật thành công tài khoản ${data.full_name}`, "success");
          setReload(!reload);
        } else {
          Common.showToast(res.result[Object.keys(res.result)[0]], "error");
        }
        toggle();
      })
      .catch(() => Common.showToast("Sửa lỗi", "error"));
  };

  const handleReset = () => {
    reset();
    toggle();
  };

  useEffect(() => {
    setItem(data);
    reset(data);
  }, [data]);

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    DepartService.getDepartments().then((res) => {
      const data = res.result;
      if (data) {
        setDepartments(data.map((el) => ({ label: el.name, value: el.id })));
      }
    });
  }, []);

  return (
    <div className="account-update">
      {item && (
        <Modal isOpen={modal} size="xl" style={{ maxHeight: "80vh" }} backdrop={true} scrollable={true} toggle={toggle}>
          <ModalHeader
            close={
              <button className="news-detail__close" onClick={toggle}>
                <Icon name="Times" />
              </button>
            }
            toggle={toggle}
            className="account-create__header"
          >
            Chỉnh sửa thông tin tài khoản
          </ModalHeader>
          <ModalBody>
            <div className="account-update__body">
              <div className="account-panel__avatar">
                <div className="account-panel__thumb">
                  <div className="avt">
                    <img src={data.avatar_url ? data.avatar_url : Avatar} alt="" />
                  </div>
                  <label htmlFor="file-upload" className="custom-file-upload">
                    <Icon name="EditWhite" />
                  </label>
                  <input id="file-upload" onChange={(e) => handleFileOnChange(e)} type="file" accept="image/*" />
                </div>
              </div>
              <div className="account-update__body__content">
                <AccountField
                  label={"Tên đăng nhập"}
                  type="text"
                  value={item.username}
                  register={register("username")}
                  error={!!errors.username}
                  msg={errors?.username?.message}
                />
                <AccountField
                  label={"Họ và tên"}
                  type="text"
                  value={item.full_name}
                  register={register("full_name")}
                  error={!!errors.full_name}
                  msg={errors?.full_name?.message}
                />
                <AccountField
                  label={"Email"}
                  type="text"
                  register={register("email")}
                  value={item.email}
                  error={!!errors.email}
                  msg={errors?.email?.message}
                />
                <AccountField
                  label={"Số điện thoại"}
                  type="number"
                  register={register("phone_number")}
                  value={item.phone_number || ""}
                  error={!!errors.phone_number}
                  msg={errors?.phone_number?.message}
                />
                <Controller
                  control={control}
                  name="roles"
                  render={({ field: { onChange, value } }) => (
                    <AccountField
                      // defaultValue={data.roles[0]}
                      value={value}
                      error={!!errors.roles}
                      msg={errors?.roles?.message}
                      label="Chức vụ"
                      onChange={(e) => onChange(e.value)}
                      options={[
                        { value: "admin", label: "ADMIN" },
                        { value: "staff", label: "STAFF" },
                        { value: "president", label: "PRESIDENT" },
                      ]}
                      type="select"
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="department_id"
                  render={({ field: { onChange, value } }) => (
                    <AccountField
                      type="select"
                      value={value}
                      error={!!errors.department_id}
                      msg={errors?.department_id?.message}
                      label="Phòng ban"
                      onChange={(e) => onChange(e.value)}
                      options={departments}
                    />
                  )}
                />
              </div>
            </div>
          </ModalBody>
          <div className="account-update__bottom-btn">
            <Button variant="outline" onClick={handleReset}>
              Hủy
            </Button>
            <Button color="primary" onClick={handleSubmit((data) => handleFormSubmit(data))}>
              Lưu
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

interface AccountFieldProps {
  label: string;
  value?: string;
  type: "text" | "select" | "number";
  className?: string;
  register?: any;
  error?: boolean;
  msg?: string;
  options?: any;
  onChange?: any;
  defaultValue?: string;
}

const AccountField = (props: AccountFieldProps) => {
  const { label, value, type, className, register, error, msg, options, onChange, defaultValue } = props;

  return (
    <div className="account-field">
      <div className="account-field__container">
        <div className="account-field__item">
          <div className="account-field__item__label">
            <span className="account-field__label">{label}</span>
          </div>
          <div className="account-field__item__input">
            {type !== "select" ? (
              <Input
                className={className}
                type={type}
                defaultValue={value !== null && value}
                register={register}
                error={error}
                message={msg ? msg : null}
              />
            ) : (
              <SelectCustom
                value={value}
                placeholder={`Chọn ${label.toLowerCase()}`}
                className="account-create__body__select"
                options={options}
                error={error}
                message={msg}
                onChange={onChange}
                defaultValue={defaultValue}
                required
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
