import React, { useEffect, useState } from "react";
import "./pills.scss";

export interface IPillProps {
  color?: string;
  children: any;
  className?: string;
}

export const Pills = (props: IPillProps) => {
  const { color, children, className } = props;
  return <div className={`pill-container ${className && className} ${color} `}>{children}</div>;
};
