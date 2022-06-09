import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { routesCMS } from "configs/routes";
import Sidebar from "components/sidebar/sidebar";
import CustomScrollbar from "components/customScrollbar";
import HookCustom from "utils/hookCustom";
import CMSHeader from "components/cmsHeader/CMSHeader";

const LayoutCMS = () => {
  const { height, width } = HookCustom.useWindowDimensions();
  document.getElementsByTagName("html")[0].style.height = "";
  const [isCollapsedSidebar, setIsCollapsedSidebar] = useState(false);
  const [sidebarMobile, setSidebarMobile] = useState(false);

  const handleMenuClick = () => {
    setIsCollapsedSidebar(!isCollapsedSidebar);

    width < 1200 ? setSidebarMobile(true) : setSidebarMobile(false);
  };
  return (
    <div>
      <Sidebar
        isCollapsedSidebar={isCollapsedSidebar}
        setIsCollapsedSidebar={setIsCollapsedSidebar}
        sidebarMobile={sidebarMobile}
        setSidebarMobile={setSidebarMobile}
      />
      <div
        className={`main-content-cms ${isCollapsedSidebar ? " main-content-cms--collap" : " null"} ${
          width < 1200 ? " main-content-cms--tablet" : null
        }`}
      >
        <CMSHeader width={width} onClick={handleMenuClick} />
        <div className="main-content__wrapper">
          <Routes>
            {routesCMS.map((r, index) => (
              <Route key={index} path={r.path} element={r.component} />
            ))}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default LayoutCMS;
