import Logo from "assets/images/logo.png";
import Icon from "components/icon";
import Popover from "components/popover/popover";
import SelectCustom from "components/selectCustom/selectCustom";
import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import Function from "utils/function";
import "./Header.scss";
import { PortalWithState } from "react-portal";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";

export default function Header() {
  const [isActiveProject, setIsActiveProject] = useState<boolean>(false);
  const [isShowPopover, setIsShowPopover] = useState<boolean>(false);
  const [cookies, setCookie, removeCookie] = useCookies();

  const refActions = useRef(null);
  const refActions2 = useRef(null);
  Function.useOnClickOutside(refActions, () => setIsShowPopover(false), ["icon-close"]);
  useEffect(() => {
    function handleClickOutside(event) {
      if (isActiveProject && refActions2.current && !refActions2.current.contains(event.target)) {
        setIsActiveProject(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActiveProject]);
  const handleLogout = () => {
    setIsShowPopover(!isShowPopover);
    removeCookie("user");
    removeCookie("token");
    window.location.href = "/";
  };

  return (
    <div className="base-header">
      <Link to="/" className="base-header-logo">
        <img src={Logo} alt="Alert.vn" />
      </Link>
      <div className="base-header-navigation">
        <Link className="base-header-navigation-item" to="">
          Tổng quan
        </Link>
        <div
          className="base-header-navigation-item no-margin-bottom"
          ref={refActions2}
          onClick={() => setIsActiveProject(!isActiveProject)}
        >
          Dự án <Icon name="ChevronDown" />
          {isActiveProject ? (
            <div className="project-menu">
              <Link to="">Thông tin thống kê</Link>
              <Link to="/projects">Danh sách dự án</Link>
            </div>
          ) : null}
        </div>
        <Link className="base-header-navigation-item" to="/news">
          Tin bài
        </Link>
      </div>
      <div className="base-header-account">
        <div className="base-header-account-item it3">
          <Icon name="CircleHelp" />
        </div>
        <div className="base-header-account-item it2">
          <Icon name="Bell" />
        </div>
        <div id="account" className="base-header-account-item it1">
          <Icon name="UserCircle" className="icon-close" onClick={() => setIsShowPopover(!isShowPopover)} />
          {isShowPopover ? (
            <Popover refContainer={refActions} className="account-popover" position="right">
              <div>
                <Link
                  className="base-header-account-item__link"
                  to={"/account"}
                  onClick={() => setIsShowPopover(!isShowPopover)}
                >
                  <Icon name="Settings" />
                  Quản lý tài khoản
                </Link>
                <div className="base-header-account-item__link" onClick={handleLogout}>
                  <Icon name="Logout" /> Đăng xuất
                </div>
              </div>
            </Popover>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export const HeaderBottom = () => {
  return (
    <div className="header-bottom">
      <div className="header-bottom__container">
        <div className="header-bottom__left">
          <SelectCustom
            placeholder="Chọn khoảng thời gian"
            options={[
              { value: "1", label: "Tuần này" },
              { value: "2", label: "Tuần trước" },
              { value: "3", label: "15 ngày trước" },
            ]}
          />
        </div>
        <div className="header-bottom__right">
          <span className="header-bottom__label">Tải xuống file báo cáo:</span>
          <button className="header-bottom__btn">
            <Icon name="Download" />
            Xuất file ảnh
          </button>
          <button className="header-bottom__btn">
            <Icon name="Download" />
            Xuất file pdf
          </button>
        </div>
      </div>
    </div>
  );
};
