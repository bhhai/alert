import React from "react";
import "./popover.scss";

interface PopoverProps {
  className?: string;
  position: "left" | "right" | "center";
  refContainer?: any;
  children?: any;
  isTriangle?: boolean;
}
export default function Popover(props: PopoverProps) {
  const { className, position, refContainer, children, isTriangle } = props;
  return (
    <>
      <div className="popover-container" ref={refContainer}>
        <div
          className={`popover popover__${position}${isTriangle ? " has-triangle" : ""}${
            className ? " " + className : ""
          }`}
        >
          {isTriangle ? <span className="triangle"></span> : null}
          {children}
        </div>
      </div>
    </>
  );
}
