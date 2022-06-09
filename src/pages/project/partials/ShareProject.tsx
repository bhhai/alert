import Button from "components/button/button";
import Icon from "components/icon";
import Input from "components/input/input";
import React, { useContext, useEffect, useState } from "react";
import "./shareProject.scss";
import avatar from "assets/images/avatar.jpg";
import Switch from "components/switch/switch";
import Checkbox from "components/checkbox/checkbox";
import TabContent from "components/tabContent/tabContent";
import { IDepartment, IStaff } from "model/GroupModel";
import Permission from "./Permission";
import { useMutation, useQuery } from "react-query";
import ProjectService from "services/ProjectService";
import Common from "utils/common";
import { ProjectContext } from "configs/projectContext";

export interface IShareProjectProps {
  closeShare?: () => void;
}

interface IStaffShared extends IStaff {
  role: number;
  isChecked: boolean;
}

const ShareProject = (props: IShareProjectProps) => {
  const { project, share } = useContext(ProjectContext);
  const { closeShare } = props;
  //hiển thị danh sách department nào
  const [isActiveGroup, setIsActiveGroup] = useState<number>(-1);
  const [departments, setDepartments] = useState<IDepartment[]>([
    {
      id: 2,
      code: "BNS2",
      name: "ban nhan su2",
      list_staff: [
        {
          staff_id: 324,
          username: "test 2",
          email: "asadsakjd@gmail.com",
          status: true,
          department_id: 2,
          department_name: "ban nhan su2",
          department_code: "BNS2",
        },
      ],
    },
    {
      id: 1,
      code: "BNS1",
      name: "ban nhan su3",
      manager_id: 11,
      list_staff: [
        {
          staff_id: 6,
          username: "votienbac",
          email: "anguyenvan@gmail.com",
          status: true,
          department_id: 1,
          department_name: "ban nhan su3",
          department_code: "BNS1",
        },
        {
          staff_id: 22,
          username: "sadas",
          email: "8798@gmail.com",
          status: true,
          department_id: 1,
          department_name: "ban nhan su3",
          department_code: "BNS1",
        },
        {
          staff_id: 234,
          username: "votienádasbac",
          email: "anguyenvan@gmail.com",
          status: true,
          department_id: 1,
          department_name: "ban nhan su3",
          department_code: "BNS1",
        },
        {
          staff_id: 2112,
          username: "nguyen vdas",
          email: "8798@gmail.com",
          status: true,
          department_id: 1,
          department_name: "ban nhan su3",
          department_code: "BNS1",
        },
        {
          staff_id: 8,
          username: "vietcuong",
          fullname: "Nguyễn Việt Cường",
          status: true,
          department_id: 1,
          department_name: "ban nhan su3",
          department_code: "BNS1",
        },
        {
          staff_id: 7567,
          username: "sadas ádaasda",
          email: "anguyenvan@gmail.com",
          status: true,
          department_id: 1,
          department_name: "ban nhan su3",
          department_code: "BNS1",
        },
        {
          staff_id: 89,
          username: "ngueyn van b",
          email: "8798@gmail.com",
          status: true,
          department_id: 1,
          department_name: "ban nhan su3",
          department_code: "BNS1",
        },
      ],
    },
  ]);

  //chia sẻ cá nhân
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<number>(3);

  //danh sach nguoi dung dang chon de duoc chia se, chia sẻ nhiều theo nhóm
  const [staffsSelected, setStaffsSelected] = useState<IStaffShared[]>([]);

  //chia se voi ca nhan
  const mutation = useMutation((email: string) => ProjectService.getUserbyEmail(email), {
    onSuccess: (data) => {
      //kiểm tra xem email có đúng ko
      if (data.data) {
        //kiểm tra xem người dùng đã đc chia sẻ hay chưa
        //nếu chưa đc chia sẻ thì mới thêm vào dự án
        if (!project.share_project.map((el) => el.user_id).includes(data.data.id)) {
          share(data.data.id, role);
          Common.showToast("Chia se thanh cong", "success");
        } else Common.showToast("Tài khoản này đã được chia sẻ", "error");
      } else {
        Common.showToast("Email không chính xác", "error");
      }
    },
  });

  useEffect(() => {
    if (project.share_project.length > 0)
      setStaffsSelected(
        staffsSelected.filter((el) => !project.share_project.map((el) => el.user_id).includes(el.staff_id))
      );
  }, [departments, project.share_project]);

  useEffect(() => {
    let staffs = departments
      .map((el) => el.list_staff)
      .flat()
      .map((el) => ({ ...el, role: 3, isChecked: false }));
    //lọc những staff đã đc share
    if (project.share_project.length > 0)
      staffs = staffs.filter((el) => project.share_project.some((st) => st.user_id !== el.staff_id));
    setStaffsSelected(staffs);
  }, []);
  //lấy danh sách các phòng ban
  // const { isFetching, isError } = useQuery("department", ProjectService.getDepartment, {
  //   onSuccess: (data) => {
  //     if(data.data)
  //       setDepartments(data.data);
  //   }
  // });

  // if (isFetching) return <p>loading</p>;
  // if (isError) return <p>error</p>;
  return (
    <div className={`share-project ${isActiveGroup >= 0 ? "isShowStaff" : ""}`}>
      <div className="share-project-header">
        <p>Chia sẻ dự án</p>
        <Icon name="Xmark" onClick={closeShare} />
      </div>
      <div className="share-project-content ">
        <div className="content-left">
          <div className="share-private">
            <div className="share-private-top">Chia sẻ với cá nhân</div>
            <div className="share-private-bottom">
              <Input
                placeholder="Nhập email"
                className="input-share-private"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Permission onChange={(role) => setRole(role)} className="select-share-private" />
              <Button disabled={email ? false : true} className="btn-share" onClick={() => mutation.mutate(email)}>
                Mời
              </Button>
            </div>
          </div>

          <div className="share-group">
            <div className="share-group-title">
              <p>Chia sẻ với nhóm</p>
              <Button color="primary" className="btn-onlyIcon" onlyIcon>
                <Icon name="Plus" />
              </Button>
            </div>
            <div className="group-list">
              {departments.map((department: IDepartment, departmentIndex) => (
                <div className="wp-group-item" key={departmentIndex}>
                  <div className="group-item">
                    <p
                      className="group-item-name"
                      onClick={() => {
                        //neu ddax chon group thi an
                        if (isActiveGroup >= 0 && isActiveGroup !== departmentIndex) setIsActiveGroup(departmentIndex);
                        else if (isActiveGroup >= 0 && isActiveGroup === departmentIndex) setIsActiveGroup(-1);
                        else if (isActiveGroup < 0) setIsActiveGroup(departmentIndex);
                        else setIsActiveGroup(-1);
                      }}
                    >
                      <Icon name="CaretRight" />
                      {department.name}
                    </p>
                    <div className="list-user">
                      {department.list_staff.slice(0, 4).map((staff, staffIndex) => (
                        <div key={staffIndex} className="wp-avatar">
                          <img className="avatar" src={avatar} alt="" />
                        </div>
                      ))}
                      {department.list_staff.length > 4 ? (
                        <div className="wp-avatar">+{department.list_staff.length - 4}</div>
                      ) : null}
                    </div>
                    <Switch
                      className="ml-20"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setStaffsSelected(
                            staffsSelected.map((el) =>
                              el.department_id === department.id ? { ...el, isChecked: true } : { ...el }
                            )
                          );
                        } else {
                          setStaffsSelected(
                            staffsSelected.map((el) =>
                              el.department_id === department.id ? { ...el, isChecked: false } : { ...el }
                            )
                          );
                        }
                      }}
                    />
                  </div>
                  {isActiveGroup >= 0 && isActiveGroup === departmentIndex ? (
                    <div className="group-list-detail">
                      <div className="group-list-permission">
                        <span>{department.list_staff.length} người</span>
                        <Permission
                          onChange={(role) => {
                            setStaffsSelected(
                              staffsSelected.map((el) =>
                                el.department_id === department.id ? { ...el, role } : { ...el }
                              )
                            );
                          }}
                        />
                      </div>
                      {department.list_staff.map((staff: IStaff, staffIndex) => (
                        <div key={staffIndex} className="user-detail">
                          <Checkbox
                            className="mr-24"
                            //nếu user đã đc chia sẻ dự án rồi thì disable checkbox ko cho thay đổi quyên nữa
                            disable={project.share_project.some((el) => el.user_id === staff.staff_id) ? true : false}
                            //nếu user đã đc chia sẻ rồi thì set checkbox bằng true
                            //nếu user trong danh sách những ng đang được chọn để chia sẻ thì cũng set bằng true
                            checked={
                              (project.share_project.some((el) => el.user_id === staff.staff_id) ? true : null) ||
                              (staffsSelected.some((el) => el?.staff_id === staff.staff_id && el?.isChecked)
                                ? true
                                : false)
                            }
                            value={String(staff.staff_id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setStaffsSelected(
                                  staffsSelected.map((el) =>
                                    el.staff_id === staff.staff_id ? { ...el, isChecked: true } : { ...el }
                                  )
                                );
                              } else {
                                setStaffsSelected(
                                  staffsSelected.map((el) =>
                                    el.staff_id === staff.staff_id ? { ...el, isChecked: false } : { ...el }
                                  )
                                );
                              }
                            }}
                          />
                          <div className="wp-avatar">
                            <img className={avatar} src={avatar} alt="" />
                          </div>
                          <p>{staff.username}</p>
                          <Permission
                            role={
                              project.share_project.some((el) => el.user_id === staff.staff_id)
                                ? {
                                    id: project.share_project.find((el) => el.user_id === staff.staff_id)
                                      .project_role_id,
                                    name: "",
                                  }
                                : staffsSelected.some((el) => el.staff_id === staff.staff_id)
                                ? {
                                    id: staffsSelected.find((el) => el.staff_id === staff.staff_id).role,
                                    name: "",
                                  }
                                : null
                            }
                            onChange={(role) => {
                              setStaffsSelected(
                                staffsSelected.map((st) =>
                                  st.staff_id === staff.staff_id ? { ...st, role } : { ...st }
                                )
                              );
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            <Button
              className="w-full justify-content-center mb-34"
              //chỉ thêm những user đã chọn quyền và tích chọn
              onClick={() => {
                staffsSelected.filter((el) => el.isChecked === true).map((el) => share(el.staff_id, el.role));
              }}
            >
              Mời
            </Button>
          </div>
        </div>
        <div className="content-right">
          <div className="ower">
            <div className="ower-left">
              <div className="wp-avatar">
                <img src={avatar} alt="" />
              </div>
              <p>Dương Bùi (Bạn)</p>
            </div>

            <div className="ower-right">Sở hữu</div>
          </div>
          {project.share_project.map((el, index) => (
            <p key={index}>{el.user_id}</p>
          ))}
          {/* <TabContent
            listTab={listTab}
            variant="border-bottom"
            onChangeTab={(tab) => {
              setListTab([
                ...listTab.map((el) => (el.value === tab.value ? { ...el, active: true } : { ...el, active: false })),
              ]);
              if (tab.value !== "all") setMenbers([...menberFake.filter((el) => el.status === tab.value)]);
              else setMenbers(menberFake);
            }}
          >
            <div className="list-user-overflow">
              {menbersShared
                .filter((el) => el.isOwer !== true)
                .map((menber, idx) => (
                  <div
                    key={idx}
                    className={`user-detail user-hover ${
                      menber.status === "waitforapproval" ? "waitforapproval" : ""
                    } ${menber.status === "notapproval" ? "notapproval" : ""} `}
                  >
                    <div className={`wp-avatar no-border  `}>
                      <img className={menber.avatar} src={avatar} alt="" />
                    </div>
                    <p>{menber.name}</p>
                  </div>
                ))}
            </div>
          </TabContent> */}
        </div>
      </div>
    </div>
  );
};

export default ShareProject;
