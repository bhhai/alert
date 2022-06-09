import React from "react";
import { ITabContent } from "model/TabContentModel";
import "./tabContent.scss";

interface TabContentProps {
  listTab: ITabContent[];
  onChangeTab: (tabContent: ITabContent) => void;
  children?: React.ReactElement;
  variant: "fill" | "border-bottom";
  className?: string;
}

export default function TabContent(props: TabContentProps) {
  const { listTab, onChangeTab, children, className, variant } = props;
  return (
    <>
      <div
        className={`base-tabs ${className ? className : ""} ${
          variant ? `base-tabs--${variant}` : "base-tabs--border-bottom"
        }`}
      >
        <ul>
          {listTab
            .filter((t) => !t.show || t.show === true)
            .map((t, idx) => (
              <li key={idx} className={`${t.active === true ? "active" : ""} `} onClick={() => onChangeTab(t)}>
                {t.label}
              </li>
            ))}
        </ul>
      </div>
      {children ? <div className="">{children}</div> : null}
    </>
  );
}
