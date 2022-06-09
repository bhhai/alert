import { yupResolver } from "@hookform/resolvers/yup";
import Avatar from "assets/images/avatar.jpg";
import Button from "components/button/button";
import Icon from "components/icon";
import { UserInfoFakeData } from "model/user/UserModel";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Nav, TabContent } from "reactstrap";
import UserService from "services/UserService";
import Common from "utils/common";
import * as Yup from "yup";
import "./index.scss";
import AccountPanel, { Field } from "./partials/AccountPanel";
import DataList from "./partials/DataList";
import NotificationPanel from "./partials/NotificationPanel";
import axios from "axios";

interface AccountPanelState {
  displayname: boolean;
  email: boolean;
  phone: boolean;
  password: boolean;
}
interface AccountPanelNotiState {
  email: boolean;
  sms: boolean;
  spread: boolean;
  pollutionIndex: boolean;
}

export default function AccountSetting() {
  const [currentActiveTab, setCurrentActiveTab] = useState<string>("1");
  const [isEdit, setIsEdit] = useState<AccountPanelState>({
    displayname: false,
    email: false,
    phone: false,
    password: false,
  });

  const [isEditNoti, setIsEditNoti] = useState<AccountPanelNotiState>({
    email: false,
    sms: false,
    spread: false,
    pollutionIndex: false,
  });

  const [userInfo, setUserInfo] = useState(UserInfoFakeData);

  const [query, setQuery] = useState<string>("");

  const [listTitle] = useState(["Tên bộ truy vấn", ""]);
  const [items] = useState([
    {
      name: "Bộ 1",
    },
    {
      name: "Bộ 2",
    },
  ]);

  const [listCheck, setListCheck] = useState([]);

  const [page, setPage] = useState(1);

  // Toggle active state for Tab
  const toggle = (tab) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };

  // Display name
  const validationSchemaName = Yup.object().shape({
    displayname: Yup.string().required("Tên hiển thị không được để trống"),
  });
  const formOptions = { resolver: yupResolver(validationSchemaName) };
  const { register: registerName, handleSubmit: handleSubmitName, formState: formStateName } = useForm(formOptions);
  const { errors } = formStateName;
  const handleNameSubmit = (data) => {
    UserService.updateUserInfo(data)
      .then((res) => {
        console.log(res);
        setIsEdit({ ...isEdit, displayname: !isEdit.displayname });
      })
      .catch(() => {
        Common.showToast("Có lỗi xảy ra vui lòng thử lại sau!", "error");
      });
  };

  // Email
  const validationSchemaEmail = Yup.object().shape({
    email: Yup.string().required("Email không được để trống").email("Email không đúng định dạng"),
  });
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: formStateEmail,
  } = useForm({ resolver: yupResolver(validationSchemaEmail) });
  const { errors: errorsEmail } = formStateEmail;
  const handleEmailSubmit = (data) => {
    console.log(data);
    UserService.updateUserInfo(data)
      .then((res) => {
        console.log(res);
        setIsEdit({ ...isEdit, displayname: !isEdit.displayname });
      })
      .catch(() => {
        Common.showToast("Có lỗi xảy ra vui lòng thử lại sau!", "error");
      });
  };
  // Phone
  const phoneVN = /^(\+84|84|0)\d{9}$/;
  const validationSchemaPhone = Yup.object().shape({
    phone: Yup.string().required("Số điện thoại không được để trống").matches(phoneVN, "Số điện thoại không tồn tại"),
  });
  const {
    register: registerPhone,
    handleSubmit: handleSubmitPhone,
    formState: formStatePhone,
  } = useForm({ resolver: yupResolver(validationSchemaPhone) });
  const { errors: errorsPhone } = formStatePhone;
  const handlePhoneSubmit = (data) => {
    console.log(data);
    UserService.updateUserInfo(data)
      .then((res) => {
        console.log(res);
        setIsEdit({ ...isEdit, displayname: !isEdit.displayname });
      })
      .catch(() => {
        Common.showToast("Có lỗi xảy ra vui lòng thử lại sau!", "error");
      });
  };
  // Password
  const validationSchemaPass = Yup.object().shape({
    password: Yup.string().required("Mật khẩu không được để trống").min(6, "Mật khẩu tối thiểu 6 kí tự"),
    newPassword: Yup.string().required("Mật khẩu mới không được để trống").min(6, "Mật khẩu tối thiểu 6 kí tự"),
    newConfirm: Yup.string().oneOf([Yup.ref("newPassword"), null], "Nhập lại mật khẩu mới không khớp"),
  });
  const {
    register: registerPass,
    handleSubmit: handleSubmitPass,
    formState: formStatePass,
  } = useForm({ resolver: yupResolver(validationSchemaPass) });
  const { errors: errorsPass } = formStatePass;
  const handlePassSubmit = (data) => {
    console.log(data);
    UserService.updateUserPassword(data)
      .then((res) => {
        if (res?.code !== 200) {
          Common.showToast("Mật khẩu không chính xác", "error");
        } else {
          Common.showToast("Thay đổi mật khẩu thành công", "success");
          setIsEdit({ ...isEdit, password: !isEdit.password });
        }
      })
      .catch(() => {
        Common.showToast("Có lỗi xảy ra vui lòng thử lại sau!", "error");
      });
  };

  const handleFileOnChange = (e) => {
    const data = new FormData();
    data.append("files", e.target.files[0]);
    fetch("https://cdnvda.mhsolution.vn/uploadMultipleFiles", {
      method: "POST",
      body: data,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res.message);
      });

    // const formData = new FormData();
    // formData.append("image", e.target.files[0]);
    // axios
    //   .post("https://cdnvda.mhsolution.vn/uploadMultipleFiles", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //   .then(function (res) {
    //     console.log(res);
    //   })
    //   .catch(function () {
    //     console.log("FAILURE!!");
    //   });
  };

  return (
    <div className="account">
      <div className="account__container">
        <div className="row">
          <Nav tabs className="col-2 account__tab-list">
            <div className="account__tab-list__block">
              <h4 className="account__title">Cài đặt tài khoản</h4>
              <ul>
                <li
                  className={`account__tab-list__item ${currentActiveTab === "1" ? " active" : ""}`}
                  onClick={() => {
                    toggle("1");
                  }}
                >
                  Thông tin cá nhân
                </li>
                <li
                  className={`account__tab-list__item ${currentActiveTab === "2" ? " active" : ""}`}
                  onClick={() => {
                    toggle("2");
                  }}
                >
                  Thông báo
                </li>
              </ul>
            </div>
            <div className="account__tab-list__block">
              <h4 className="account__title">Cấu hình hệ thống</h4>
              <ul>
                <li
                  className={`account__tab-list__item ${currentActiveTab === "3" ? " active" : ""}`}
                  onClick={() => {
                    toggle("3");
                  }}
                >
                  Bộ truy vấn
                </li>
                <li
                  className={`account__tab-list__item ${currentActiveTab === "4" ? " active" : ""}`}
                  onClick={() => {
                    toggle("4");
                  }}
                >
                  Nguồn đăng
                </li>
                <li
                  className={`account__tab-list__item ${currentActiveTab === "5" ? " active" : ""}`}
                  onClick={() => {
                    toggle("5");
                  }}
                >
                  Nhãn tin bài
                </li>
                <li
                  className={`account__tab-list__item ${currentActiveTab === "6" ? " active" : ""}`}
                  onClick={() => {
                    toggle("6");
                  }}
                >
                  Vấn đề xã hội
                </li>
              </ul>
            </div>
          </Nav>
          <TabContent activeTab={currentActiveTab} className="col-10 account__tab-panel">
            {(currentActiveTab === "1" && (
              <AccountPanel title="Thông tin cá nhân">
                <>
                  <div className="account-panel__avatar">
                    <div className="account-panel__thumb">
                      <div className="avt">
                        <img src={Avatar} alt="" />
                      </div>
                      <label htmlFor="file-upload" className="custom-file-upload">
                        <Icon name="EditWhite" />
                      </label>
                      <input id="file-upload" onChange={(e) => handleFileOnChange(e)} type="file" accept="image/*" />
                    </div>
                  </div>

                  <div className="account-panel__field">
                    <Field title="Tên đăng nhập" value={userInfo.username} type="username" />

                    <form onSubmit={handleSubmitName(handleNameSubmit)}>
                      <Field
                        title="Tên hiển thị"
                        type="displayname"
                        value={userInfo.full_name}
                        isEdit={isEdit.displayname}
                        setIsEdit={() => setIsEdit({ ...isEdit, displayname: !isEdit.displayname })}
                        errors={!!errors.displayname}
                        register={registerName("displayname")}
                        message={errors.displayname?.message}
                      />
                    </form>

                    <form onSubmit={handleSubmitEmail(handleEmailSubmit)}>
                      <Field
                        title="Email"
                        type="email"
                        value={userInfo.email}
                        isEdit={isEdit.email}
                        setIsEdit={() => setIsEdit({ ...isEdit, email: !isEdit.email })}
                        errors={!!errorsEmail.email}
                        register={registerEmail("email")}
                        message={errorsEmail.email?.message}
                      />
                    </form>

                    <form onSubmit={handleSubmitPhone(handlePhoneSubmit)}>
                      <Field
                        title="Số điện thoại"
                        type="phone"
                        value={userInfo.phone_number}
                        isEdit={isEdit.phone}
                        setIsEdit={() => setIsEdit({ ...isEdit, phone: !isEdit.phone })}
                        errors={!!errorsPhone.phone}
                        register={registerPhone("phone")}
                        message={errorsPhone.phone?.message}
                      />
                    </form>
                    <form onSubmit={handleSubmitPass(handlePassSubmit)}>
                      <Field
                        title="Mật khẩu"
                        type="password"
                        value={userInfo.password}
                        isEdit={isEdit.password}
                        setIsEdit={() => setIsEdit({ ...isEdit, password: !isEdit.password })}
                        errors={errorsPass}
                        register={registerPass("password")}
                        registerNewPass={registerPass("newPassword")}
                        registerConfirm={registerPass("newConfirm")}
                        message={errorsPass}
                      />
                    </form>
                  </div>
                </>
              </AccountPanel>
            )) ||
              (currentActiveTab === "2" && (
                <AccountPanel title="Thông báo">
                  <NotificationPanel isEdit={isEditNoti} setIsEdit={setIsEditNoti} />
                </AccountPanel>
              )) ||
              (currentActiveTab === "3" && (
                <AccountPanel title="Danh sách bộ truy vấn" button="+ Thêm bộ truy vấn">
                  <DataList
                    query={query}
                    setQuery={setQuery}
                    listTitle={listTitle}
                    items={items}
                    listCheck={listCheck}
                    setListCheck={setListCheck}
                    isPagination
                    dataPagination={{
                      name: "",
                      page: page,
                      setPage: setPage,
                      displayNumber: 10,
                      sizeLimit: 10,
                      totalPage: 8,
                      totalItem: 200,
                    }}
                  />
                </AccountPanel>
              )) ||
              (currentActiveTab === "4" && (
                <AccountPanel title="Danh sách nguồn đăng" button="+ Thêm nguồn đăng">
                  <DataList
                    query={query}
                    setQuery={setQuery}
                    listTitle={listTitle}
                    items={items}
                    listCheck={listCheck}
                    setListCheck={setListCheck}
                  />
                </AccountPanel>
              )) ||
              (currentActiveTab === "5" && (
                <AccountPanel title="Danh sách nhãn tin bài" button="+ Thêm nhãn tin bài">
                  <DataList
                    query={query}
                    setQuery={setQuery}
                    listTitle={listTitle}
                    items={items}
                    listCheck={listCheck}
                    setListCheck={setListCheck}
                  />
                </AccountPanel>
              )) ||
              (currentActiveTab === "6" && (
                <AccountPanel title="Danh sách vấn đề xã hội" button="+ Thêm vấn đề xã hội">
                  <DataList
                    query={query}
                    setQuery={setQuery}
                    listTitle={listTitle}
                    items={items}
                    listCheck={listCheck}
                    setListCheck={setListCheck}
                  />
                </AccountPanel>
              ))}
          </TabContent>
        </div>
      </div>
    </div>
  );
}
