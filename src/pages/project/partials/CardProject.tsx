import React from "react";
import avatar from "assets/images/avatar.jpg";
import './CardProject.scss';

interface ICardProjectProps {
  className?: string;
  type: "vertical" | "horizontal";
  children?: any;
}

const CardProject = (props: ICardProjectProps) => {
  const { className, type, children } = props;

  if (type === "horizontal")
    return (
      <div className="project-recent__card">
        <div className="project-recent__card-img">
          <img src={avatar} alt="" />
        </div>
        <div className="project-recent__card-body">
          <p>Tên dự án</p>
          <div className="project-recent__card-body__content">{children}</div>
        </div>
      </div>
    );

  if (type === "vertical")
    return (
      <div className="project-danger__card">
        <div className="project-danger__card-header">
          <div className="project-danger__card-header__img">
            <img src={avatar} alt="" />
          </div>
          <div className="project-danger__card-header__title">
            <p>Tên dự án</p>
            <span className="">Ngày nghiên cứu: dd/mm/yy</span>
          </div>
        </div>
        <div className="project-danger__card-body">{children}</div>
        <div className="project-danger__card-footer">
          <div className="project-danger__card-footer--left">
            <p>Số tin bài</p>
            <h4>1,612</h4>
          </div>
          <div className="project-danger__card-footer--right">
            <p>Tin bài tiêu cực</p>
            <h4>1,012</h4>
          </div>
        </div>
      </div>
    );

  
};

export default CardProject;
