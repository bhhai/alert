import Icon from "components/icon";
import React from "react";
import "./Tags.scss";

interface TagsProps {
  children: string;
  disable?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Tags(props: TagsProps) {
  const { children, disable, className, onClick } = props;

  return (
    <div className={`base-tag ${disable ? " base-tag__disable" : ""} ${className ? " " + className : ""}`}>
      <span className="base-tag__content">{children}</span>
      <span className="base-tag__icon">{<Icon name="Times" onClick={onClick} />}</span>
    </div>
  );
}
