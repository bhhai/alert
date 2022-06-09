import Button from "components/button/button";
import Icon from "components/icon";
import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import AccountManagermentService from "services/admin/AccountManagermentService";
import Common from "utils/common";

interface DeletePopupProps {
  modalDelete: boolean;
  toggleDelete: any;
  item?: any;
  handleClick?: any;
  reload: boolean;
  setReload: any;
}

export default function DeletePopup(props: DeletePopupProps) {
  const { modalDelete, toggleDelete, item, reload, setReload } = props;
  const handleDelete = async (id) => {
    await AccountManagermentService.delete(id)
      .then((res) => {
        if (res.code === 0) {
          console.log(res);
          Common.showToast(`Xóa thành công`, "success");
          toggleDelete();
          setReload(!reload);
        } else {
          Common.showToast("Xóa thất bại", "error");
          toggleDelete;
        }
      })
      .catch(() => console.log("loi"));
  };
  return (
    <div className="account-delete-popup">
      <Modal isOpen={modalDelete} size="md" backdrop={true} toggle={toggleDelete}>
        <ModalHeader
          close={
            <button className="news-detail__close" onClick={toggleDelete}>
              <Icon name="Times" />
            </button>
          }
          toggle={toggleDelete}
          className="account-create__header"
        >
          Xác nhận xóa tài khoản
        </ModalHeader>
        <ModalBody className="account-delete__modal-body">
          <span className="account-delete__text">Bạn có chắc muốn xóa tài khoản {item?.full_name}?</span>

          <div className="account-delete__bottom">
            <Button color="transparent" variant="outline" onClick={toggleDelete}>
              Hủy
            </Button>
            <Button color="primary" onClick={(id) => handleDelete(item.id)}>
              Xác nhận
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
