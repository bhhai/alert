import Icon from "components/icon";
import React from "react";
import "./ImportFile.scss";

export default function ImportFile() {
  return (
    <div className="import-file">
      <button className="import-file__button import-file__button__upload">
        <Icon name="Upload" />
        <span>Tải lên dữ liệu</span>
      </button>
      <button className="import-file__button import-file__button__menu">
        <Icon name="Menu" />
      </button>
    </div>
  );
}
