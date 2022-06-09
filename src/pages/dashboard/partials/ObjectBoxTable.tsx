import BoxTable from "components/boxTable/boxTable";
import { Task } from "pages/project";
import React, { useState } from "react";
import { useQuery } from "react-query";
import ProjectService from "services/ProjectService";

export default function ObjectBoxTable() {
  const [listTitle] = useState([
    "STT",
    "Đối tượng",
    "Định danh đối tượng",
    "Dự án có liên quan",
    "Tin tiêu cực",
    "Tin tích cực",
    "Người theo dõi",
    "Chủ đề hoạt động phổ biến",
    "Nguồn đăng phổ biến",
    "",
  ]);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

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
            task: <Task id={el.id} />,
          };
        });

        setItems(t);
      }
    },
  });
  return (
    <div className="object-box-table">
      <h3 className="object-box-table__title">Đối tượng đề xuất nghiên cứu</h3>
      <BoxTable
        name="list-project"
        titles={listTitle}
        items={items.slice(0, 5)}
        dataMappingArray={(item) => Object.keys(item).map((key) => [item[key]])}
        isPagination
        dataPagination={{
          name: "",
          page: page,
          setPage: setPage,
          displayNumber: 5,
          sizeLimit: 5,
          totalPage: 15,
          totalItem: 200,
        }}
      />
    </div>
  );
}
