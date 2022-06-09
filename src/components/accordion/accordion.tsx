import React from "react";
import "./accordion.scss";

export interface IAccordionItem {
  title: string;
  active?: boolean;
}

export interface IAccordionprops {
  className?: string;
  listItem?: IAccordionItem[];
  onClick?: (tab) => void;
  children?: any;
}

const Accordion = (props: IAccordionprops) => {
  const { className, listItem, onClick, children } = props;
  return (
    <div className={`base-accordion ${className ? className : ""}`}>
        {
            listItem.filter(el => el )
        }
      {listItem.map((el, index) => (
        <div key={index} className="accordion-item">
          <div
            className="accordion-item__title"
            onClick={() => {
              listItem.map((el, idx) => (idx === index ? { ...el, active: true } : { ...el, active: false }));
              console.log(index);
            }}
          >
            {el.title}
          </div>
          <div className={`accordion-item__content ${el.active ? "active" : ""} `}>{children}</div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
