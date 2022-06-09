import React, { Fragment, useEffect, useState, useRef } from "react";
import Navigation from "components/navigation/navigation";
import Logo from "assets/images/logo.png";
import LogoCollap from "assets/images/logo-alert.png";
import { menu } from "configs/routes";
import Button from "components/button/button";
import Icon from "components/icon";
import { Link } from "react-router-dom";
import Common from "utils/common";
import CustomScrollbar from "components/customScrollbar";
import HookCustom from "utils/hookCustom";
import { useLocation } from "react-router-dom";
import "./sidebar.scss";

interface SidebarProps {
  isCollapsedSidebar: boolean;
  setIsCollapsedSidebar: any;
  sidebarMobile: boolean;
  setSidebarMobile: any;
}

export default function Sidebar(props: SidebarProps) {
  const { isCollapsedSidebar, setIsCollapsedSidebar, sidebarMobile, setSidebarMobile } = props;
  const location = useLocation();
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const { width, height } = HookCustom.useWindowDimensions();

  const showMenuMobile = () => {
    const overlay = document.querySelector(".overlay-sidebar__mobile");
    if (overlay) {
      const body = document.getElementsByTagName("body")[0];
      if (isCollapsedSidebar) {
        Common.fadeOut(overlay);
        body.style.overflow = "";
      } else {
        Common.fadeIn(overlay);
        body.style.overflow = "hidden";
      }
    }
    setIsCollapsedSidebar(!isCollapsedSidebar);
    setSidebarMobile(!sidebarMobile);
  };

  useEffect(() => {
    if (isCollapsedSidebar && width < 1200) {
      showMenuMobile();
    }
  }, [location, width]);

  const refSidebar = useRef(null);

  return (
    <Fragment>
      <div
        className={`sidebar${isCollapsedSidebar ? " sidebar--collapsed" : ""}${
          isMouseOver && isCollapsedSidebar ? " sidebar--hover" : ""
        }`}
        onMouseOver={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
        ref={refSidebar}
      >
        <div className="sidebar-logo d-flex align-items-center justify-content-between">
          <Link to={location.pathname.includes("admin") ? "/admin" : "/"} className="logo">
            <img src={isCollapsedSidebar && refSidebar.current?.offsetWidth > 82 ? LogoCollap : Logo} alt="" />
          </Link>
          {isMouseOver || !isCollapsedSidebar ? (
            <Button
              type="button"
              color="transparent"
              className="btn-collapsed-sidebar d-none d-xl-flex"
              onlyIcon={true}
              onClick={() => setIsCollapsedSidebar(!isCollapsedSidebar)}
            >
              {isCollapsedSidebar ? <Icon name="ChevronDoubleRight" /> : <Icon name="ChevronDoubleLeft" />}
            </Button>
          ) : null}
        </div>
        <CustomScrollbar className="sidebar-menu d-flex flex-column" width="100%" height={height - 57} autoHide={true}>
          <Navigation menuItemList={menu} />
        </CustomScrollbar>
      </div>
      {sidebarMobile ? (
        <div
          className={`overlay-sidebar__mobile ${isCollapsedSidebar ? " d-block" : ""}`}
          onClick={() => showMenuMobile()}
        >
          <Button type="button" color="transparent" className="btn-close-sidebar" onlyIcon={true}>
            <Icon name="Times" />
          </Button>
        </div>
      ) : null}
    </Fragment>
  );
}
