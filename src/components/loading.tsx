import React from "react";
import Icon from "./icon";

export default function Loading() {
  return (
    <div className="loading__wrapper d-flex align-items-center justify-content-center">
      <div className="loading d-flex flex-column align-items-center justify-content-center">
        <Icon name="spinner" />
        <span>Đang tải</span>
      </div>
    </div>
  );
}
