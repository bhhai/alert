import Icon from "components/icon";
import React from "react";
import "./breadcrumbs.scss";

export interface IBreadcrumbItemProps {
  className?: string;
  children?: any;
  active?: boolean;
}

const BreadcrumbItem = (props: IBreadcrumbItemProps) => {
  const { className, children, active } = props;
  return (
    <div className={`base-breadcrumb-item ${className ? className : ''} ${active ? "breadcrumb-active" : ""} `}>
      {children}
      <Icon name="ChevronRight" />
    </div>
  );
};

export default BreadcrumbItem;
