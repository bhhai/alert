import React from "react";
import { Modal } from "reactstrap";
import Icon from "components/icon";
import Button from "components/button/button";
import DepartService from "services/DepartService";
import Common from "utils/common";

const DeleteDepartment = ({ modal, toggle, department }) => {
  return (
    <Modal isOpen={modal} backdrop={true} scrollable={true} toggle={toggle}>
      <div className="delete-department">
        <div className="delete-department__header delete-department__header-delete">
          <p>Xác nhận xoá phòng</p>
          <Icon name="Xmark" onClick={() => toggle(false)} />
        </div>
        <p className="delete-department__body">Bạn chắc chắn muốn xoá Phòng {department?.name}?</p>
        <div className="delete-department__footer">
          <Button
            variant="outline"
            onClick={() => {
              toggle(false);
            }}
          >
            Huỷ
          </Button>
          <Button
            onClick={async () => {
              try {
                const res = await DepartService.delete(department.id);
                debugger;
                if (res.message === "OK") {
                  Common.showToast("Xoá thành công", "success");
                } else {
                  Common.showToast(res.message, "error");
                }
              } catch {
                Common.showToast("Xoá ko thành công", "error");
              }

              toggle(true);
            }}
          >
            Đồng ý
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteDepartment;
