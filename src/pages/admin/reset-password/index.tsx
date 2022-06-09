import BoxTable from "components/boxTable/boxTable";
import SearchTable from "components/searchTable/SearchTable";
import { IUser } from "configs/userContext";
import { ISearchTable } from "pages/project/partials/SearchItem";
import React, { useState } from "react";
import "./index.scss";

const dataMappingArray = (item: IUser) => [
  <div className="user-col" key={item.id}>
    <div className="user-avatar">
      <img src={item.avatar_url || "https://www.ebbenandyorke.co.uk/wp-content/uploads/2018/05/noprofile_lg.gif"} />
    </div>
  </div>,
  "",
  "",
  "",
  "",
  "",
];

const sizeLimit = 10;

const actions = [
  {
    title: "phê duyệt",
    callback: (item) => console.log(item),
  },
  {
    title: "từ chối",
    callback: (item) => console.log(item),
  },
];

const ResetPassword = () => {
  const listTitle = ["", "Tài khoản", "Họ và tên", "Chức vụ", "Phòng ban", "Thời gian yêu cầu"];
  const [items, setItems] = useState([
    {
      avatar: "",
      name: "",
      role: "",
      department: "",
      date: "",
    },
  ]);
  const [listCheck, setListCheck] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItem, setTotalItem] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const listFilter: any = [
    {
      title: "chức vụ",
      type: "checkbox",
      options: [
        { value: "giám đốc", label: "giám đốc" },
        { value: "nhân viên", label: "nhân viên" },
      ],
    },
    {
      title: "ngày",
      type: "select",
      options: [
        { value: "giám đốc", label: "giám đốc" },
        { value: "nhân viên", label: "nhân viên" },
      ],
    },
  ];

  return (
    <div className="reset-password">
      <div className="reset-password-main">
        <div className="reset-password-header">
          <p>Danh sách phòng ban</p>
        </div>
        <SearchTable list={listFilter} onChangeTable={(table) => console.log(table)} />
        <BoxTable
          name="phòng ban"
          titles={listTitle}
          items={items}
          dataMappingArray={(item) => dataMappingArray(item)}
          isBulkAction={true}
          listIdChecked={listCheck}
          setListIdChecked={(list: number[]) => setListCheck([...list])}
          actions={actions}
          bulkActionItems={[
            {
              title: "xoá tất cả",
              onClick: () => {
                console.log("run");
              },
            },
          ]}
          isPagination={true}
          dataPagination={{
            name: "",
            displayNumber: 2,
            page,
            sizeLimit,
            totalPage,
            totalItem,
            setPage: (page) => setPage(page),
          }}
        />
      </div>
    </div>
  );
};

export default ResetPassword;
