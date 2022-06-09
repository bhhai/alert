import Button from "components/button/button";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BoxTable from "components/boxTable/boxTable";
import "./index.scss";
import avatar from "assets/images/avatar.jpg";
import SearchItem from "./partials/SearchItem";
import Tags from "components/tags/Tags";
import { Pills } from "components/pills/Pills";
import Input from "components/input/input";
import Icon from "components/icon";
import CardProject from "./partials/CardProject";
import { useQuery } from "react-query";
import ProjectService from "services/ProjectService";
import { useNavigate } from "react-router-dom";
import { UserContext } from "configs/userContext";

const searchTable = [
  {
    title: "trạng thái",
    type: "select",
    options: [
      { label: "đang theo dõi", value: "đang theo dõi" },
      { label: "đã huỷ", value: "đã huỷ" },
    ],
  },
  {
    title: "chủ đề",
    type: "checkbox",
    options: [
      { label: "ma tuý", value: "ma tuý" },
      { label: "giết người", value: "giết người" },
    ],
  },
  {
    title: "nguồn đăng",
    type: "select",
    options: [
      { label: "youtube", value: "youtube" },
      { label: "facebook", value: "facebook" },
      { label: "tiktok", value: "tiktok" },
      { label: "twitter", value: "twitter" },
    ],
  },
];

export const Task = ({ id }) => {
  return (
    <div className="task-container">
      <p className="btn task-container__btn-delete">
        <Icon name="Delete" />
        xoá
      </p>
      <Link to={`/projects/update/${id}`} className="task-container__btn-delete">
        <Icon name="Edit" />
        sửa
      </Link>
    </div>
  );
};

const Projects = () => {
  const {user} = useContext(UserContext);
  console.log(user);
  let navigate = useNavigate();
  const [listCheck, setListCheck] = useState([]);
  const [listTitle] = useState([
    "id",
    "Tên dự án",
    "Ngày nghiên cứu",
    "Ngày kết thúc",
    "Trạng thái",
    "Tin tiêu cực",
    "Người theo dõi",
    "Tốc độ lan toả",
    "Chỉ số ô nhiễm",
    "Chủ đề hoạt động phổ biến",
    "Nguồn đăng phổ biến",
  ]);
  const [items, setItems] = useState([]);

  const projectsQuery = useQuery("getProjectForUser", ProjectService.getProjectForUser, {
    onSuccess: (data) => {
      if (data.data) {
        const t = data.data.map((el) => {
          return {
            id: el.id,
            name: el.name,
            start_at: el.start_at ? el.start_at.substr(0, 10) : "",
            end_at: el.end_at ? el.end_at.substr(0, 10) : "",
            status: el.status,
            negative: 0,
            follower: 0,
            pollution_threshold: el.pollution_threshold,
            pervasive_threshold: el.pervasive_threshold,
            summary: "",
            source: "",
            //task: <Task id={el.id} />,
          };
        });

        setItems(t);
      }
    },
  });

  const [tagsData, setTagsData] = useState<string[]>([]);

  const [tags, setTags] = useState<{ label: string; value: string }[]>([]);

  const [isActiveSearchTable, setisActiveSearchTable] = useState<number>(null);
  if (projectsQuery.isFetching) return <p>loading....</p>;
  if (projectsQuery.isError) return <p>error</p>;

  return (
    <div className="main-container">
      <div className="projects-news">
        <div className="projects-danger">
          <p className="projects-danger__title">top dự án nguy hiểm</p>
          <div className="projects-danger__cards">
            <CardProject type="vertical">
              <p>
                Chủ đề hoạt động phổ biến:<span> chủ đề 1, chủ đề 2, chủ đề 3, ...</span>{" "}
              </p>
              <p>Nguồn đăng phổ biến</p>
              <ul>
                <li>hôm nay tôi buồn một mình trên phố đông nơi ánh đèn soi</li>
                <li>sáng long lanh những gương mặt lạ lẫm</li>
                <li>xin cho mối tình của tôi chẳng có vui hỡi anh này anh có</li>
              </ul>
            </CardProject>
            <CardProject type="vertical">
              <p>
                Chủ đề hoạt động phổ biến:<span> chủ đề 1, chủ đề 2, chủ đề 3, ...</span>{" "}
              </p>
              <p>Nguồn đăng phổ biến</p>
              <ul>
                <li>hôm nay tôi buồn một mình trên phố đông nơi ánh đèn soi</li>
                <li>sáng long lanh những gương mặt lạ lẫm</li>
                <li>xin cho mối tình của tôi chẳng có vui hỡi anh này anh có</li>
              </ul>
            </CardProject>
            <CardProject type="vertical">
              <p>
                Chủ đề hoạt động phổ biến:<span> chủ đề 1, chủ đề 2, chủ đề 3, ...</span>{" "}
              </p>
              <p>Nguồn đăng phổ biến</p>
              <ul>
                <li>hôm nay tôi buồn một mình trên phố đông nơi ánh đèn soi</li>
                <li>sáng long lanh những gương mặt lạ lẫm</li>
                <li>xin cho mối tình của tôi chẳng có vui hỡi anh này anh có</li>
              </ul>
            </CardProject>
          </div>
        </div>
        <div className="projects-recent">
          <p className="projects-recent__title">dự án gần đây</p>
          <div className="projects-recent__cards">
            <CardProject type="horizontal">
              <span>hôm nay tôi buồn một mình trên phố đông nơi ánh đèn soi</span>
              <span>sáng long lanh những gương mặt lạ lẫm</span>
              <span>xin cho mối tình của tôi chẳng có vui hỡi anh này anh có</span>
            </CardProject>
            <CardProject type="horizontal">
              <span>hôm nay tôi buồn một mình trên phố đông nơi ánh đèn soi</span>
              <span>sáng long lanh những gương mặt lạ lẫm</span>
              <span>xin cho mối tình của tôi chẳng có vui hỡi anh này anh có</span>
            </CardProject>
            <CardProject type="horizontal">
              <span>hôm nay tôi buồn một mình trên phố đông nơi ánh đèn soi</span>
              <span>sáng long lanh những gương mặt lạ lẫm</span>
              <span>xin cho mối tình của tôi chẳng có vui hỡi anh này anh có</span>
            </CardProject>
          </div>
        </div>
      </div>

      <div className="projects">
        <div className="projects-title">
          <p>Danh sách dự án</p>
          <Link to="/projects/create">
            <Button color="primary">+ Thêm dự án</Button>
          </Link>
        </div>
        <div className="search-table">
          {searchTable.map((el, i) => (
            <SearchItem
              key={i}
              label={el.title}
              type={el.type}
              options={el.options}
              data={tags}
              callback={(label, value) => {
                const tmp = value.map((el) => {
                  return { value: el, label };
                });
                setTags([...tags.filter((el) => el.label !== label), ...tmp]);
              }}
            />
          ))}
          <Input
            icon={<Icon name="Search" className="search-item-input__icon" />}
            placeholder="Nhập từ khoá cần tìm kiếm"
            className="search-item-input"
          />
          <div
            className="btn-short"
            onClick={() => {
              const t = items.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
              setItems(t);
            }}
          >
            <Icon name="Short" />
          </div>
        </div>
        <div className="tags">
          {tags.map((t, index) => (
            <Tags key={index} onClick={() => setTags(tags.filter((el) => el !== t))}>
              {t.label + " " + t.value}
            </Tags>
          ))}
        </div>
        <BoxTable
          name="list-project"
          titles={listTitle}
          items={items}
          onClickRow={(id) => navigate(`/projects/${id}`, { replace: true })}
          actions={[
            { title: "xoa", callback: (id) => console.log(id), icon: <Icon name="Delete" /> },
            { title: "sua", callback: (id) => navigate(`/projects/update/${id}`), icon: <Icon name="Edit" /> },
          ]}
          dataMappingArray={(item) => Object.keys(item).map((key) => [item[key]])}
          isBulkAction={true}
          listIdChecked={listCheck}
          setListIdChecked={(list: number[]) => setListCheck([...list])}
          bulkActionItems={[{ title: "show id", onClick: () => console.log(listCheck) }]}
        />
      </div>
    </div>
  );
};

export default Projects;
