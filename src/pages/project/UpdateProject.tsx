import React, { useContext, useEffect, useState } from "react";
import "./createProject.scss";
import SelectCustom from "components/selectCustom/selectCustom";
import Button from "components/button/button";
import ProjectService from "services/ProjectService";
import { useMutation, useQuery } from "react-query";
import { ProjectContext, ProjectProvider } from "configs/projectContext";
import ProjectForm from "./partials/ProjectForm";
import { useParams } from "react-router-dom";
import { IProjectModel } from "model/project/ProjectModel";

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

const UpdateProject = () => {
  const { id } = useParams();
  const { project, setProject } = useContext(ProjectContext);
  const [categories, setCategories] = useState([]);
  const projectType = useQuery("getProjectType", ProjectService.getProjectType, {
    onSuccess: (data) => {
      if (data.data) setCategories(data.data.map((el) => ({ label: el.name, value: el.id })));
    },
  });

  const projectQuery = useQuery("getProjectById", ProjectService.getProjectById, {
    onSuccess: (data) => {
      if (data.data) {
          const projectById = data.data.find((el) => el.id === Number(id));
          const projectTmp: IProjectModel = {
              name: projectById.name,
              category: projectById.project_type_id,
              dateStart: projectById.start_at,
              dateEnd: projectById.end_at,
              avatar: projectById.avatar,
              rules: projectById.rules,
              pervasive_threshold: projectById.pervasive_threshold,
              pollution_threshold: projectById.pollution_threshold,
              domain: projectById.news,
              youtube: [],
              facebook: [],
              tiktok: projectById.tiktok_user_infos.map(el => ({url: `https://www.tiktok.com/@${el.unique_id}`})),
              twitter: [],
              share_project: []
          }
        setProject(projectTmp);
      }
    },
  });

  if (projectType.isFetching || projectQuery.isFetching) return <p>loading...</p>;
  if (projectType.isError || projectQuery.isError) return <p>error</p>;
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
              //   mutation.mutate({
              //     name: project.name,
              //     project_type_id: project.category,
              //     start_at: project.dateStart,
              //     end_at: project.dateEnd,
              //     avatar: "",
              //     pervasive_threshold: Number(project.pervasive_threshold),
              //     pollution_threshold: Number(project.pollution_threshold),
              //     rules: project.rules,
              //     news: project.domain,
              //     tiktok_user_infos,
              //     facebook_infos,
              //     youtube_channel_infos,
              //     twitter_infos: [],
              //     share_project: [],
              //   });
            }}
          >
            Hoàn thành
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProject;
