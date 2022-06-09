import Button from "components/button/button";
import Icon from "components/icon";
import Input from "components/input/input";
import SelectCustom from "components/selectCustom/selectCustom";
import { AccountCreateListField } from "model/admin/account/adminAccount";
import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AccountManagermentService from "services/admin/AccountManagermentService";
import Common from "utils/common";
import DepartService from "services/DepartService";
import { useCookies } from "react-cookie";

// ! Khi nhấn vào "thêm phòng" thì popup tạo phòng ban hiện lên, ẩn tạo tài khoản đi => done
// ! Khi nhấn "tắt" hoặc "tạo phòng" ở popup tạo phòng thì popup tạo tài khoản hiện lên, popuop tạo phòng ẩn đi => done
// ! Lưu thông tin người dùng đã nhập ở form tạo tài khoản vào cookies => done
// ! Dàn lại thông tin đã lưu ở cookies vào form tạo tài khoản => ...

interface PopupAccountCreateProps {
  modal: boolean;
  toggle: () => void;
  reload: boolean;
  setReload: any;
  createDepartment: () => void;
}

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Tên tài khoản không được để trống")
    .matches(/^[a-zA-Z0-9_.-]*$/, "Tên tài khoản không được chứa kí tự đặc biệt")
    .matches(/^[0-9a-z]+$/, "Tên tài khoản không được nhập chữ hoa")
    .max(50, "Tên tài khoản không được quá 50 kí tự")
    .min(8, "Tên tài khoản không được dưới 8 kí tự"),
  password: Yup.string()
    .min(8, "Mật khẩu tối thiểu 8 kí tự")
    .matches(/^[a-zA-Z0-9_.-]*$/, "Mật khẩu không đúng định dạng")
    .required("Mật khẩu không được để trống")
    .max(50, "Mật khẩu không quá 50 kí tự"),
  confirmPassword: Yup.string()
    .required("Mật khẩu không được để trống")
    .oneOf([Yup.ref("password"), null], "Mật khẩu không trùng khớp")
    .required("Nhập lại mật khẩu không được để trống")
    .min(8, "Mật khẩu tối thiểu 8 kí tự")
    .max(50, "Mật khẩu không quá 50 kí tự"),
  full_name: Yup.string()
    .required("Họ và tên không được bỏ trống")
    .max(255, "Họ và tên không quá 255 kí tự")
    .matches(/^[^\s]+/, "Họ và tên không được để trống"),
  email: Yup.string()
    .required("Email không được để trống")
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email không đúng định dạng")
    .max(256, "Email không nhập quá 256 kí tự"),
  position: Yup.string().required("Chức vụ không được để trống"),
  phone: Yup.string()
    .required("Số điện thoại không được để trống")
    .matches(/^(\+84|84|0)\d{9}$/, "Số điện thoại không hợp lệ"),
});

export default function PopupAccountCreate(props: PopupAccountCreateProps) {
  const { modal, toggle, reload, setReload, createDepartment } = props;
  const [cookies, setCookies] = useCookies();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isDirty, isValid },
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    DepartService.getDepartments().then((res) => {
      const data = res.result;
      if (data) {
        setDepartments(data.map((el) => ({ label: el.name, value: el.id })));
      }
    });
  }, []);

  const handleCreate = (data) => {
    const newData = {
      username: data.username.trim(),
      password: data.password.trim(),
      full_name: data.full_name.trim(),
      email: data.email.trim(),
      phone_number: data.phone.trim(),
      department_id: data.department,
      roles: data.position,
    };

    // AccountManagermentService.createAccount(newData)
    //   .then((res) => {
    //     if (res?.code === 0) {
    //       Common.showToast("Thêm tài khoản thành công", "success");
    //       toggle();
    //       setReload(!reload);
    //     } else {
    //       Common.showToast(res.result[Object.keys(res.result)[0]], "error");
    //     }
    //   })
    //   .catch(() => {
    //     Common.showToast("Có lỗi xảy ra vui lòng thử lại sau!", "error");
    //   });

    console.log(newData);
  };

  return (
    <div className="acccount-create">
      <Modal isOpen={modal} size="md" style={{ maxHeight: "80vh" }} backdrop={true} scrollable={true} toggle={toggle}>
        <ModalHeader
          close={
            <button className="news-detail__close" onClick={toggle}>
              <Icon name="Times" />
            </button>
          }
          toggle={toggle}
          className="account-create__header"
        >
          Tạo tài khoản
        </ModalHeader>
        <ModalBody>
          <div className="account-create__body">
            <form onSubmit={handleSubmit(handleCreate)}>
              {AccountCreateListField.map((item, i) => {
                return (
                  <Input
                    key={i}
                    label={item.label}
                    className="account-create-input"
                    placeholder={item.name === "confirmPassword" ? `${item.label}` : `Nhập ${item.label.toLowerCase()}`}
                    required={item.isRequired}
                    error={!!errors[item.name]}
                    message={errors[item.name]?.message}
                    register={register(item.name)}
                    onBlur={(e) => e.target.value.trim()}
                    type={
                      item.name === "password" || item.name === "confirmPassword"
                        ? "password"
                        : item.name === "phone"
                        ? "number"
                        : "text"
                    }
                  />
                );
              })}
              <Controller
                control={control}
                name="position"
                render={({ field: { onChange, value } }) => (
                  <SelectCustom
                    value={value}
                    error={!!errors.position}
                    message={errors?.position?.message}
                    placeholder="Chọn chức vụ"
                    label="Chức vụ"
                    onChange={(e) => onChange(e.value)}
                    options={[
                      { value: "admin", label: "ADMIN" },
                      { value: "staff", label: "STAFF" },
                      { value: "president", label: "PRESIDENT" },
                    ]}
                    className="account-create__body__select"
                    required
                  />
                )}
              />
              <Controller
                control={control}
                name="department"
                render={({ field: { onChange, value } }) => (
                  <SelectCustom
                    value={value}
                    error={!!errors.department}
                    message={errors?.department?.message}
                    placeholder="Chọn phòng ban"
                    label="Phòng ban"
                    onChange={(e) => onChange(e.value)}
                    options={departments}
                    className="account-create__body__select"
                    action={{
                      title: "Thêm phòng",
                      callback: () => {
                        //set thoong tin người ta đã nhập vào cookies
                        const values = getValues();
                        setCookies("account", values);
                        console.log(cookies.account);
                        createDepartment();
                      },
                    }}
                  />
                )}
              />
              <Button color="primary" type="submit" className="w-100 btn-create" disabled={!isValid || !isDirty}>
                Tạo tài khoản
              </Button>
            </form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
