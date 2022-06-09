import React from "react";
import "./breadcrumbs.scss";

export interface IBreadcrumbMenuProps {
  className?: string;
  children?: any;
  icon?: any;
}

const BreadcrumbMenu = (props: IBreadcrumbMenuProps) => {
  const { className, children, icon } = props;
  return (
    <div className={`base-breadcrumb-menu ${className ? className : ""}`}>
      {icon ? icon : null}
      {children}
    </div>
  );
};

export default BreadcrumbMenu;
