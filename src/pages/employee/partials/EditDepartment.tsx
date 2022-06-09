import React, { useEffect, useState } from "react";
import { Modal } from "reactstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Icon from "components/icon";
import Button from "components/button/button";
import Input from "components/input/input";
import SelectCustom from "components/selectCustom/selectCustom";
import Common from "utils/common";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DepartService from "services/DepartService";
import { departmentSchema } from "utils/validate";

const EditDepartment = ({ modal, toggle, department }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(departmentSchema),
    defaultValues: {
      code: department.code,
      name: department.name,
      phone: department.manager_info?.phone_number,
      manager_id: department.manager_id,
    },
    mode: "onChange",
  });

  const [staffs, setStaffs] = useState([]);
  const [isShow, setIsShow] = useState(false);

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
    <Modal
      className="editdepartment-modal"
      size="xl"
      style={{ maxHeight: "80vh" }}
      isOpen={modal}
      backdrop={true}
      scrollable={true}
      toggle={toggle}
    >
      <div className="edit-department">
        <div className="edit-department__header">
          <p>Chỉnh sửa thông tin phòng</p>
          <Icon name="Xmark" onClick={toggle} />
        </div>
        <div className="edit-department__body">
          <div className="edit-department__body-item">
            <p>Tên phòng</p>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  required={true}
                  placeholder="Nhập tên phòng"
                  label="Tên phòng"
                  value={value}
                  className=""
                  onChange={(e) => onChange(e.target.value)}
                  error={!!errors.name}
                  message={errors?.name?.message}
                />
              )}
            />
          </div>
          <div className="edit-department__body-item">
            <p>Mã phòng</p>
            <Controller
              control={control}
              name="code"
              render={({ field: { onChange, value } }) => (
                <Input
                  required={true}
                  placeholder="Nhập mã phòng"
                  label="Mã phòng"
                  value={value}
                  className=""
                  onChange={(e) => onChange(e.target.value)}
                  error={!!errors.code}
                  message={errors?.code?.message}
                />
              )}
            />
          </div>
          <div className="edit-department__body-item">
            <p>Trưởng phòng</p>
            <Controller
              control={control}
              name="manager_id"
              render={({ field: { onChange, value } }) => (
                <SelectCustom
                  value={value}
                  error={!!errors.manager_id}
                  message={errors?.manager_id?.message}
                  placeholder="Nhập trưởng phòng"
                  onChange={(e) => onChange(e.value)}
                  options={staffs}
                  className=""
                />
              )}
            />
          </div>
          <div className="edit-department__body-item">
            <p>Liên hệ</p>
            <Input placeholder="" name="phone" register={register("phone")} disabled />
          </div>

          <div className="edit-department__body-item">
            <p className="margin-bottom-auto">Nhân viên</p>
            <div className="edit-department__body-item-content">
              <p onClick={() => setIsShow(!isShow)}>
                <Icon name="CaretDown" />
                {department.list_staff.length} nhân viên
              </p>
              {isShow ? (
                <Swiper
                  navigation={true}
                  modules={[Navigation]}
                  className="edit-department__body-item__slider"
                  spaceBetween={50}
                  slidesPerView={4}
                  onSlideChange={() => console.log("slide change")}
                  onSwiper={(swiper) => console.log(swiper)}
                >
                  {department.list_staff.map((el, idx) => (
                    <SwiperSlide key={idx} className="edit-department__body-item__slider-card">
                      <div className="edit-department__body-item__slider-avatar"></div>
                      <p>{el.username}</p>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : null}
            </div>
          </div>
        </div>
        <div className="edit-department__footer">
          <Button variant="outline" onClick={() => toggle(false)}>
            Huỷ
          </Button>
          <Button
            onClick={handleSubmit(async (data) => {
              const tmp = {
                code: data.code,
                name: data.name.trim(),
                manager_id: data.manager_id,
              };
              try {
                const res = await DepartService.update(department.id, tmp);
                if (res.message === "OK") {
                  Common.showToast("Sửa phòng thành công", "success");
                  toggle(true);
                } else {
                  Common.showToast(res.message, "error");
                }
              } catch {
                Common.showToast("Sửa phòng không thành công", "error");
              }
            })}
          >
            Lưu
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditDepartment;
