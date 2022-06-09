import React, { useState, useEffect } from "react";
import Icon from "components/icon";
import Button from "components/button/button";
import Input from "components/input/input";
import SelectCustom from "components/selectCustom/selectCustom";
import { Modal } from "reactstrap";
import Common from "utils/common";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DepartService from "services/DepartService";
import { departmentSchema } from "utils/validate";

export interface ICreateDepartment {
  modal: any;
  toggle: any;
  toggleCreateAccount?: () => void;
}

const CreateDepartment = (props: ICreateDepartment) => {
  const { modal, toggle, toggleCreateAccount } = props;
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: yupResolver(departmentSchema),
    mode: "onChange",
    defaultValues: {
      code: "",
      name: "",
      manager_id: null,
    },
  });

  const [staffs, setStaffs] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await DepartService.getAllStaff();
        const data = res.result;
        if (data) {
          setStaffs(data.map((el) => ({ label: el.username, value: el.staff_id })));
        }
      } catch {
        Common.showToast("Lỗi", "error");
      }
    })();
  }, []);

  return (
    <Modal isOpen={modal} backdrop={true} scrollable={true} toggle={toggle}>
      <div className="create-department">
        <div className="create-department__header">
          <p>Tạo phòng</p>
          <Icon
            name="Xmark"
            onClick={() => {
              toggle(false);
              toggleCreateAccount();
            }}
          />
        </div>
        <div className="create-department__body">
          <Controller
            control={control}
            name="code"
            render={({ field: { onChange } }) => (
              <Input
                required={true}
                placeholder="Nhập mã phòng"
                label="Mã phòng"
                className="create-department__body-input"
                onChange={(e) => onChange(e.target.value)}
                error={!!errors.code}
                message={errors?.code?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange } }) => (
              <Input
                required={true}
                placeholder="Nhập tên phòng"
                label="Tên phòng"
                className="create-department__body-input"
                onChange={(e) => onChange(e.target.value)}
                error={!!errors.name}
                message={errors?.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="manager_id"
            render={({ field: { onChange, value } }) => (
              <SelectCustom
                value={value}
                error={!!errors.manager_id}
                message={errors?.manager_id?.message}
                placeholder="Chọn trưởng phòng"
                label="Trưởng phòng"
                onChange={(e) => onChange(e.value)}
                options={staffs}
                className="create-department__body-input"
              />
            )}
          />

          <Button
            disabled={!isDirty || !isValid}
            className="create-department__body-btn"
            onClick={handleSubmit(async (data) => {
              const tmp = {
                code: data.code,
                name: data.name.trim(),
                manager_id: data.manager_id,
              };
              try {
                const res = await DepartService.create(tmp);
                if (res.message === "OK") {
                  Common.showToast("Tạo phòng thành công", "success");
                  toggle(true);
                } else {
                  Common.showToast(res.message, "error");
                }
              } catch {
                Common.showToast("Tạo phòng không thành công", "error");
              }
              toggleCreateAccount();
            })}
          >
            Tạo phòng
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateDepartment;
