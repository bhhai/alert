import React, { Fragment } from "react";
import "./titleAction.scss";

interface TitleActionProps {
  title: string;
  actions?: any[];
}

export default function TitleAction(props: TitleActionProps) {
  const { title, actions } = props;
  return (
    <div className="title-action d-flex align-items-center justify-content-between">
      <h1>{title}</h1>
      {actions && actions.length > 0 ? (
        <div className="actions d-flex align-items-center">
          {actions.map((a, idx) => (
            <Fragment key={idx}>{a}</Fragment>
          ))}
        </div>
      ) : null}
    </div>
  );
}
