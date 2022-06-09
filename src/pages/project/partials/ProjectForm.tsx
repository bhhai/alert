import Input from "components/input/input";
import { UploadImg } from "components/UploadImg/UploadImg";
import { ProjectContext } from "configs/projectContext";
import React, { useContext, useState, useEffect, useRef } from "react";
import Rules from "./Rules";
import "./ProjectForm.scss";
import Tracking from "./Tracking";
import BreadcrumbMenu from "components/breadcrumbs/BreadcrumbMenu";
import BreadcrumbItem from "components/breadcrumbs/BreadcrumbItem";
import ShareProject from "./ShareProject";
import SelectCustom from "components/selectCustom/selectCustom";
import Datepicker2 from "components/datepicker/datepicker";
import ProjectService from "services/ProjectService";
import { useQuery } from "react-query";

const ProjectForm = ({ category }) => {
  const {
    project,
    setName,
    setCategory,
    addRule,
    removeRule,
    setRule,
    addTracking,
    removeTracking,
    setTracking,
    setDateEnd,
    setDateStart,
    setPervasiveThreshold,
    setPollutionThreshold,
  } = useContext(ProjectContext);
  const [isActiveShare, setIsActiveShare] = useState(false);
  const [isActiveProject, setIsActiveProject] = useState(false);
  const refActions = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (refActions.current && !refActions.current.contains(event.target)) {
        setIsActiveProject(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refActions]);
  return (
    <div className="project-form">
      <BreadcrumbMenu className="breadcrum-project">
        <BreadcrumbItem>
          <a href="" className="text-upper">
            Tổng quan
          </a>
        </BreadcrumbItem>
        <BreadcrumbItem active={true} className="dropdown-project-parent">
          <p className="text-upper no-margin" onClick={() => setIsActiveProject(!isActiveProject)}>
            {project?.name}
          </p>
          {isActiveProject ? (
            <div className="dropdown-project" ref={refActions}>
              <div className="dropdown-project-top">
                <p className="btn-share-project" onClick={() => setIsActiveShare(!isActiveShare)}>
                  Chia sẻ dự án
                </p>
                <p>Nhận đường liên kết</p>
                <p>Cài đặt thông báo</p>
              </div>

              <p className="btn-delete">Xoá</p>
            </div>
          ) : null}
        </BreadcrumbItem>
      </BreadcrumbMenu>

      {isActiveShare ? (
        <div className="wp-modal">
          <ShareProject closeShare={() => setIsActiveShare(!isActiveShare)} />
        </div>
      ) : null}
      <div className="project-form__information">
        <div className="project-form__information--left">
          <p className="project-form__information-title">Thông tin chung</p>
          <div className="project-form__information--left-row">
            <Input
              label="Tên dự án"
              placeholder="Nhập tên dự án"
              value={project.name}
              onChange={(e) => setName(e.target.value)}
              className="project-form__information--left-half"
            />
            <SelectCustom
              value={project.category}
              options={category}
              label="Loại danh mục dự án"
              placeholder="Chọn danh mục dự án (cá nhân, tổ chức, vấn đề)"
              onChange={(e) => setCategory(Number(e.value))}
            />
          </div>
          <div className="project-form__information--left-row">
            <Datepicker2
              onChange={(date) => {
                console.log(date);
                setDateStart(
                  `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
                );
              }}
              className="w-50"
              label="Thời gian bắt đầu theo dõi"
            />
            <Datepicker2
              label="Thời gian dò đối tượng mới"
              onChange={(date) =>
                setDateEnd(
                  `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
                )
              }
              className="w-50 align-self-end"
            />
          </div>
          <p className="project-form__information-title">Cài đặt ngưỡng cảnh báo</p>
          <div className="project-form__information--left-row">
            <Input
              label="Độ lan toả"
              type="number"
              value={project.pollution_threshold}
              placeholder="Nhập tên dự án"
              onChange={(e) => setPollutionThreshold(Number(e.target.value))}
            />
            <Input
              label="chỉ số ô nhiễm"
              type="number"
              value={project.pervasive_threshold}
              placeholder="Nhập tên dự án"
              onChange={(e) => setPervasiveThreshold(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="project-form__information--right">
          <p className="project-form__information-title">Ảnh dự án</p>
          <UploadImg />
        </div>
      </div>
      <Rules
        className="project-form-rules"
        rules={project.rules}
        addRule={addRule}
        removeRule={removeRule}
        setRule={setRule}
      />
      <p className="project-form__information-title mt-32">Theo dõi đặc biệt</p>
      <Tracking
        className="project-form__tracking"
        title="facebook"
        name="facebook"
        data={project.facebook}
        placeholder="Nhap link facebook"
        addTracking={addTracking}
        removeTracking={removeTracking}
        setTracking={setTracking}
      />
      <Tracking
        className="project-form__tracking"
        title="domain"
        name="domain"
        data={project.domain}
        placeholder="Nhap domain"
        addTracking={addTracking}
        removeTracking={removeTracking}
        setTracking={setTracking}
      />
      <Tracking
        className="project-form__tracking"
        title="tiktok"
        name="tiktok"
        data={project.tiktok}
        placeholder="Nhap domain"
        addTracking={addTracking}
        removeTracking={removeTracking}
        setTracking={setTracking}
      />
      <Tracking
        className="project-form__tracking"
        title="youtube"
        name="youtube"
        data={project.youtube}
        placeholder="Nhap youtube"
        addTracking={addTracking}
        removeTracking={removeTracking}
        setTracking={setTracking}
      />
    </div>
  );
};

export default ProjectForm;
