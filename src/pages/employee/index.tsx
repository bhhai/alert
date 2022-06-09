import React, { useEffect, useState } from "react";
import "./index.scss";
import SearchTable from "components/searchTable/SearchTable";
import BoxTable from "components/boxTable/boxTable";
import Icon from "components/icon";
import Button from "components/button/button";
import CreateDepartment from "./partials/CreateDepartment";
import EditDepartment from "./partials/EditDepartment";
import DeleteDepartment from "./partials/DeleteDepartment";
import DepartService from "services/DepartService";
import Common from "utils/common";
import AdminTotalCard from "pages/admin/account/partials/AdminTotalCard";
import AccountManagermentService from "services/admin/AccountManagermentService";

const sizeLimit = 10;

// *! reload phân trang khi add item, remove item => done
// *todo: khi thêm item thì load lại tổng số item và phân trang => done
// *todo: đang có 11 item, xoá 1 item thì quay lại trang page trc đó => done
// *todo: search => done chưa ok lắm

const Employee = () => {
  const [listCheck, setListCheck] = useState([]);
  const [listTitle] = useState(["Phòng ban", "Ngày tạo", "Mã phòng", "Trưởng phòng", "Liên hệ", "Nhân viên"]);
  const [itemsDepartment, setItemsDepartment] = useState([]);
  //số lượng các phòng ban
  const [totalItem, setTotalItem] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalLeader, setTotalLeader] = useState(0);
  const [totalEployee, setTotalEmployee] = useState(0);
  const [totalDepartment, setTotalDepartment] = useState(0);

  useEffect(() => {
    AccountManagermentService.getAccountByPage(sizeLimit, page, '').then(res => {
      const {total} = res;
      setTotalEmployee(total);
    })
    DepartService.getDepartmentByPage(page)
      .then((res) => {
        if (res.result) {
          const { result, total } = res;
          setItemsDepartment(result);
          setTotalDepartment(total);
          setTotalItem(total);
          setTotalPage(Math.ceil(total / sizeLimit));
        }
      })
      .catch(() => {
        Common.showToast("Lỗi", "error");
      });
  }, []);

  useEffect(() => {
    DepartService.getDepartmentByPage(page)
      .then((res) => {
        setItemsDepartment(res.result);
      })
      .catch(() => {
        Common.showToast("Lỗi", "error");
      });
  }, [page]);

  const [modal, setModal] = useState<boolean>(false);

  const toggle = async (d) => {
    if (d) {
      try {
        const res = await DepartService.getDepartmentByPage(page);
        const { result, total } = res;
        setItemsDepartment(result);
        setTotalItem(total);
        setTotalPage(Math.ceil(total / sizeLimit));
      } catch {
        Common.showToast("Lỗi", "error");
      }
    }
    setModal(!modal);
  };

  const [isEditDepartment, setIsEditDepartment] = useState(false);
  const toggleEditDepartment = async (d) => {
    if (d) {
      try {
        const res = await DepartService.getDepartmentByPage(page);
        const { result } = res;
        setItemsDepartment(result);
      } catch {
        Common.showToast("Lỗi", "error");
      }
    }
    setIsEditDepartment(!isEditDepartment);
  };

  const [isDeleteDepartment, setIsDeleteDepartment] = useState(false);
  const toggleDeleteDepartment = async (d) => {
    setIsDeleteDepartment(!isDeleteDepartment);
    if (d) {
      try {
        const res = await DepartService.getDepartmentByPage(page);
        const { result, total } = res;
        setItemsDepartment(result);
        setTotalItem(total);
        setTotalPage(Math.ceil(total / sizeLimit));
        if (total % sizeLimit === 0) setPage(page - 1);
      } catch {
        Common.showToast("Lỗi", "error");
      }
    }
  };

  const dataMappingArray = (item) => [
    item.name,
    item.create_at,
    item.code,
    item.manager_info?.username,
    item.manager_info?.phone_number,
    item.list_staff?.length,
  ];

  const removeAll = (ids: number[]) => {
    Promise.all(
      ids.map((id) => {
        DepartService.delete(id);
      })
    );
  };

  const [departmentSelected, setDepartmentSelected] = useState(null);
  return (
    <div className="department-container">
      <h3>Quản lý tài khoản</h3>
      <div className="department-banner">
        <AdminTotalCard type="department" value={totalDepartment} />
        <AdminTotalCard type="leader" value={totalItem} />
        <AdminTotalCard type="employee" value={totalEployee} />
      </div>
      {modal ? <CreateDepartment modal={modal} toggle={toggle} /> : null}
      {isEditDepartment ? (
        <EditDepartment department={departmentSelected} modal={isEditDepartment} toggle={toggleEditDepartment} />
      ) : null}
      {isDeleteDepartment ? (
        <DeleteDepartment department={departmentSelected} modal={isDeleteDepartment} toggle={toggleDeleteDepartment} />
      ) : null}

      <div className="department-main">
        <div className="department-header">
          <p>Danh sách phòng ban</p>
          <Button color="primary" onClick={toggle}>
            + Thêm phòng ban
          </Button>
        </div>
        <SearchTable
          onChangeTable={async (tags) => {
            try {
              const res = await DepartService.getDepartmentByPage(
                page,
                Common.removeAccents(tags.search).trim().toLocaleLowerCase()
              );
              const { result, total } = res;
              setItemsDepartment(result);
              setTotalItem(total);
              setTotalPage(Math.ceil(total / sizeLimit));
            } catch {
              Common.showToast("Lỗi", "error");
            }
          }}
        />
        <BoxTable
          name="phòng ban"
          titles={listTitle}
          items={itemsDepartment}
          dataMappingArray={(item) => dataMappingArray(item)}
          isBulkAction={true}
          listIdChecked={listCheck}
          setListIdChecked={(list: number[]) => setListCheck([...list])}
          bulkActionItems={[
            {
              title: "xoá tất cả",
              onClick: () => {
                removeAll(listCheck);
              },
            },
          ]}
          actions={[
            {
              title: "sửa",
              callback: (data) => {
                setIsEditDepartment(true);
                setDepartmentSelected(itemsDepartment.find((el) => el.id === data.id));
              },
              icon: <Icon name="Edit" />,
              color: "#2F80ED",
            },
            {
              title: "xoá",
              callback: (data) => {
                setIsDeleteDepartment(true);
                setDepartmentSelected(itemsDepartment.find((el) => el.id === data.id));
              },
              icon: <Icon name="Delete" />,
              color: "#EB5757",
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

export default Employee;
