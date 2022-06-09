import React from "react";
import NotFoundImg from "assets/images/404.png";
import "./index.scss";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__bg">
        <img src={NotFoundImg} alt="" />
      </div>
    </div>
  );
}
