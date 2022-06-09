import BreadcrumbItem from "components/breadcrumbs/BreadcrumbItem";
import BreadcrumbMenu from "components/breadcrumbs/BreadcrumbMenu";
import React, { useContext, useEffect, useState } from "react";
import "./createProject.scss";
import SelectCustom from "components/selectCustom/selectCustom";
import Button from "components/button/button";
import ProjectService from "services/ProjectService";
import { useMutation, useQuery } from "react-query";
import { ProjectContext, ProjectProvider } from "configs/projectContext";
import ProjectForm from "./partials/ProjectForm";
import { IPreviewDomain } from "./partials/PreviewDomain";

const options = [
  {
    label: "đang theo dõi",
    value: "1",
  },
  {
    label: "tạm dừng theo dõi",
    value: "2",
  },
  {
    label: "kết thức theo dõi",
    value: "3",
  },
];

const CreateProject = () => {
  const { project } = useContext(ProjectContext);
  const mutation = useMutation(
    (data: any) => {
      return ProjectService.createProject(data);
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  const [categories, setCategories] = useState([]);
  const projectType = useQuery("getProjectType", ProjectService.getProjectType, {
    onSuccess: (data) => {
      if (data.data) setCategories(data.data.map((el) => ({ label: el.name, value: el.id })));
    },
  });

  if (projectType.isFetching) return <p>loading...</p>;
  if (projectType.isError) return <p>error</p>;
  return (
    <div className="base-create-project">
      <ProjectForm category={categories} />
      <div className="content-footer">
        <SelectCustom options={options} className="col-4" />

        <div className="content-footer-right">
          <Button color="transparent">Huỷ</Button>
          <Button
            className="ml-32"
            onClick={() => {
              const facebook_infos = project.facebook
                .map((el: any) => {
                  delete el.url;
                  return el;
                })
                .filter((el) => Object.keys(el).length !== 0);
              const tiktok_user_infos = project.tiktok
                .map((el: any) => {
                  delete el.url;
                  return el;
                })
                .filter((el) => Object.keys(el).length !== 0);

              const youtube_channel_infos = project.youtube
                .map((el: any) => {
                  delete el.url;
                  return el;
                })
                .filter((el) => Object.keys(el).length !== 0);
              mutation.mutate({
                name: project.name,
                project_type_id: project.category,
                start_at: project.dateStart,
                end_at: project.dateEnd,
                avatar: "",
                pervasive_threshold: Number(project.pervasive_threshold),
                pollution_threshold: Number(project.pollution_threshold),
                rules: project.rules,
                news: project.domain,
                tiktok_user_infos,
                facebook_infos,
                youtube_channel_infos,
                twitter_infos: [],
                share_project: [],
              });
            }}
          >
            Hoàn thành
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
