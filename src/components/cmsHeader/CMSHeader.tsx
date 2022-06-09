import Icon from "components/icon";
import Popover from "components/popover/popover";
import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Function from "utils/function";
import "./CMSHeader.scss";
import { useCookies } from "react-cookie";
import { UserContext } from "configs/userContext";

export default function CMSHeader({ width, onClick }) {
  const [isShowPopover, setIsShowPopover] = useState<boolean>(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(UserContext);

  const refActions = useRef(null);
  Function.useOnClickOutside(refActions, () => setIsShowPopover(false), ["cms-header__account"]);
  return (
    <div className={`cms-header `}>
      <div className="cms-header__container">
        <div className="cms-header__menu" onClick={onClick}>
          {width < 1200 ? <Icon name="Menu" /> : null}
        </div>
        <div className="cms-header__account" onClick={() => setIsShowPopover(!isShowPopover)}>
          <div className="cms-header__avt">
            <img src="https://stilearning.com/vision/assets/globals/img/dummy/img-10.jpg" alt="" />
          </div>
          <div className="cms-header__name">
            <h3>{user?.username}</h3>
          </div>
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
                <div
                  className="base-header-account-item__link"
                  onClick={() => {
                    removeCookie("role", {path: '/'});
                    removeCookie("token", {path: '/'});
                    if (location.pathname.includes("admin")) navigate("/admin/login", { replace: true });
                    else navigate("/login", { replace: true });
                  }}
                >
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
