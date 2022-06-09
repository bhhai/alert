import BoxTable from "components/boxTable/boxTable";
import Button from "components/button/button";
import Icon from "components/icon";
import SearchTable from "components/searchTable/SearchTable";
import { ReportCardList } from "model/admin/account/adminAccount";
import { IUser } from "model/user/UserModel";
import CreateDepartment from "pages/employee/partials/CreateDepartment";
import React, { useEffect, useState } from "react";
import AccountManagermentService from "services/admin/AccountManagermentService";
import DepartService from "services/DepartService";
import Common from "utils/common";
import "./index.scss";
import AccountDetail from "./partials/AccountDetail";
import AdminTotalCard from "./partials/AdminTotalCard";
import DeletePopup from "./partials/DeletePopup";
import PopupAccountCreate from "./partials/PopupAccountCreate";
import PopupAccountUpdate from "./partials/PopupAccountUpdate";

export default function Account() {
  const [page, setPage] = useState<number>(1);
  const [listTitle, setListTitle] = useState([
    "",
    "Họ và tên",
    "Phòng ban",
    "Chức vụ",
    "Tên đăng nhập",
    "Email",
    "Số điện thoại",
    "Dự án sở hữu",
    "Dự án được chia sẻ",
  ]);
  const [accountList, setAccountList] = useState<IUser[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [modalAccountUpdate, setModalAccountUpdate] = useState<boolean>(false);
  const [modalDetail, setModalDetail] = useState<boolean>(false);
  const [modalCreateDepartment, setModalCreateDepartment] = useState(false);
  const toggleCreateDepartment = () => setModalCreateDepartment(!modalCreateDepartment);

  const [rowDetailId, setRowDetailId] = useState<number>(null);

  const [rowItem, setRowItem] = useState(null);
  const [reload, setReload] = useState(false);

  const toggle = () => setModal(!modal);
  const toggleDelete = () => setModalDelete(!modalDelete);
  const toggleDetail = () => setModalDetail(!modalDetail);

  const [listIdChecked, setListIdChecked] = useState([]);

  const [itemDelete, setItemDelete] = useState();

  const [pageData, setPageData] = useState<IUser[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageTotal, setPageTotal] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [departments, setDepartments] = useState([]);

  const handleAccountUpdate = (item) => {
    setModalAccountUpdate(true);
    setRowItem(item);
  };

  useEffect(() => {
    AccountManagermentService.getAccountList()
      .then((res) => {
        setAccountList(res.result);
      })
      .catch(() => {
        Common.showToast("Có lỗi xảy ra vui lòng thử lại sau!", "error");
      });
  }, [reload]);

  useEffect(() => {
    AccountManagermentService.getAccountByPage(pageSize, page, keyword)
      .then((res) => {
        if (res.message === "OK") {
          setPageData(res.result);
          setPageTotal(res.total);
        } else {
          Common.showToast("Lỗi tải dữ liệu tài khoản", "error");
        }
      })
      .catch(() => Common.showToast("Hệ thống lỗi", "error"));
  }, [page, reload, keyword]);

  const dataMappingArray = (item: IUser) => [
    <div className="user-col" key={item.id}>
      <div className="user-avatar">
        <img src={item.avatar_url || "https://www.ebbenandyorke.co.uk/wp-content/uploads/2018/05/noprofile_lg.gif"} />
      </div>
    </div>,
    <span className="user-name" key={item.id}>
      {item?.full_name?.length >= 12 ? item?.full_name.substring(0, 12) + "..." : item?.full_name}
    </span>,
    item.department_id,
    item.roles,
    item.username,
    item?.email?.length >= 10 ? item.email.substring(0, 10) + "..." : item.email,
    item.phone_number,
    40,
    98,
  ];

  const handleDelete = (item) => {
    setModalDelete(true);
    setItemDelete(item);
  };

  const showDetail = (item) => {
    setModalDetail(true);
    setRowDetailId(item);
  };

  const dataFormat = [
    "",
    "text-center",
    "text-center",
    "text-center",
    "text-center",
    "text-center",
    "text-center",
    "text-right",
    "text-right",
  ];

  const actionTable = [
    { title: "Sửa", callback: (item) => handleAccountUpdate(item.raw), icon: <Icon name="Edit" /> },
    { title: "Xóa", callback: (item) => handleDelete(item.raw), icon: <Icon name="Delete" /> },
  ];

  return (
    <div className="admin-account">
      <div className="admin-account__container">
        <div className="admin-account__card">
          <h3 className="admin-account__card__title">Quản lý tài khoản</h3>
          <div className="admin-account__card__content">
            <div className="row">
              {ReportCardList.map((item, i) => (
                <div className="col-4" key={i}>
                  <AdminTotalCard type={item.type} value={item.value} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="admin-account__panel">
          <div className="admin-account__panel__container">
            <div className="admin-account__panel__header">
              <h4 className="title">Danh sách tài khoản</h4>
              <Button color="primary" onClick={toggle}>
                + Thêm tài khoản
              </Button>
            </div>
            <div className="admin-account__panel__filter">
              <SearchTable
                onSearch={async (value) => {
                  const res = await DepartService.getDepartmentByPage(1, value);
                  const { result } = res;
                  console.log(result);
                }}
                list={[
                  {
                    title: "chức vụ",
                    type: "checkbox",
                    options: [
                      { label: "nhân viên", value: "nhân viên" },
                      { label: "trưởng phòng", value: "trưởng phòng" },
                      { label: "giám đốc", value: "giám đốc" },
                    ],
                  },
                  {
                    title: "phòng ban",
                    type: "select",
                    options: [],
                  },
                ]}
                onChangeTable={async (tags) => {
                  try {
                    setKeyword(tags.search.trim().toLocaleLowerCase());
                    const res = await AccountManagermentService.getAccountByPage(pageSize, page, keyword);
                    const result = res.result;
                    // setItemsDepartment(result.records);
                  } catch {
                    Common.showToast("Lỗi", "error");
                  }
                }}
              />
            </div>
            <BoxTable
              name="tài khoản"
              titles={listTitle}
              items={pageData}
              dataMappingArray={(item) => dataMappingArray(item)}
              isPagination
              dataFormat={dataFormat}
              dataPagination={{
                name: "",
                page: page,
                setPage: setPage,
                displayNumber: 3,
                sizeLimit: pageSize,
                totalPage: Math.ceil(pageTotal / pageSize),
                totalItem: pageTotal,
              }}
              isBulkAction={true}
              listIdChecked={listIdChecked}
              setListIdChecked={(list: number[]) => setListIdChecked([...list])}
              bulkActionItems={[{ title: "show id", onClick: () => console.log(listIdChecked) }]}
              actions={actionTable}
              onClickRow={(item) => showDetail(item)}
            />
          </div>
        </div>
      </div>

      {modalCreateDepartment ? (
        <CreateDepartment
          modal={modalCreateDepartment}
          toggle={toggleCreateDepartment}
          toggleCreateAccount={() => setModal(!modal)}
        />
      ) : null}
      {modal && (
        <PopupAccountCreate
          createDepartment={() => {
            setModal(!modal);
            setModalCreateDepartment(!modalCreateDepartment);
          }}
          modal={modal}
          toggle={toggle}
          reload={reload}
          setReload={setReload}
        />
      )}
      {rowItem && (
        <PopupAccountUpdate
          modal={modalAccountUpdate}
          toggle={() => setModalAccountUpdate(!modalAccountUpdate)}
          data={rowItem}
          reload={reload}
          setReload={setReload}
        />
      )}
      {modalDelete && (
        <DeletePopup
          modalDelete={modalDelete}
          toggleDelete={toggleDelete}
          item={itemDelete}
          handleClick={handleDelete}
          reload={reload}
          setReload={setReload}
        />
      )}
      {rowDetailId && <AccountDetail modal={modalDetail} toggle={toggleDetail} data={rowDetailId} />}
    </div>
  );
}
