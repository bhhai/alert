import React, { useState } from "react";
import Button from "components/button/button";
import Icon from "components/icon";
import "./dialog.scss";

interface DialogProps {
  color: "success" | "error";
  className: string;
  title: any;
  message: any;
  cancelText?: string;
  cancelAction?: () => void;
  defaultText: string;
  defaultAction: () => void;
}

export default function Dialog(props: DialogProps) {
  const { color, className, title, message, cancelText, cancelAction, defaultText, defaultAction } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <div className={`base-dialog${color ? " base-dialog--color-" + color : ""}${className ? " " + className : ""}`}>
        <h3 className="d-flex align-items-center">
          {color === "success" ? <Icon name="check-circle" /> : color === "error" ? <Icon name="times-circle" /> : null}
          {title}
        </h3>
        <div className="base-dialog__content">{message}</div>
        <div className="base-dialog__actions">
          {cancelText && cancelAction !== null ? (
            <Button type="button" className="btn-cancel" color="primary" variant="outline" onClick={() => cancelAction()}>
              {cancelText}
            </Button>
          ) : null}
          <Button
            type="button"
            className="btn-default"
            disabled={isLoading}
            color={color === "success" ? "primary" : "destroy"}
            onClick={() => {
              defaultAction();
              setIsLoading(true);
            }}
          >
            {defaultText}
            {isLoading ? <Icon name="spinner" /> : null}
          </Button>
        </div>
      </div>
      <div className="base-dialog__overlay"></div>
    </>
  );
}
