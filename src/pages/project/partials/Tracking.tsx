import Button from "components/button/button";
import Icon from "components/icon";
import Input from "components/input/input";
import React, { useEffect, useState } from "react";
import { Spinner } from "reactstrap";
import PreviewDomain from "./PreviewDomain";
import "./tracking.scss";

export interface ITrackingProps {
  className?: string;
  title: string;
  data?: [];
  name: "youtube" | "tiktok" | "twitter" | "facebook" | "domain";
  placeholder?: string;
  addTracking?: (name) => void;
  removeTracking?: (name, index) => void;
  setTracking?: (name, index, value) => void;
}

const Tracking = (props: ITrackingProps) => {
  const { className, title, placeholder, data, name, addTracking, removeTracking, setTracking } = props;
  const [isActive, setIsActive] = useState<boolean>(true);

  return (
    <div className={`tracking-container ${className ? className : ""}`}>
      <div className="tracking-container__header">
        <p className="">{title}</p>
        <Button className="btn-onlyIcon" onlyIcon color="secondary" onClick={() => addTracking(name)}>
          <Icon name="Plus" />
        </Button>
        {isActive ? (
          <Icon name="ChevronUp" className="margin-left-auto" onClick={() => setIsActive(!isActive)} />
        ) : (
          <Icon name="ChevronDown" className="margin-left-auto" onClick={() => setIsActive(!isActive)} />
        )}
      </div>
      {isActive
        ? data.map((el: any, i) => (
            <div key={i} className="mt-2">
              <Input
                placeholder={placeholder}
                value={el.url}
                onChange={(e) => setTracking(name, i, { url: e.target.value })}
                className=""
                icon={<Icon name="Xmark" onClick={() => removeTracking(name, i)} />}
                iconPosition="right"
              />
              {el.url ? (
                <PreviewDomain
                  url={el.url}
                  type={name}
                  checked={Object.keys(el).length > 1 ? true : false}
                  set={(value) => {
                    setTracking(name, i, value);
                  }}
                  remove={() => removeTracking(name, i)}
                />
              ) : null}
            </div>
          ))
        : null}
    </div>
  );
};

export default Tracking;
