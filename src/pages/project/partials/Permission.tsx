import React, { useState, useEffect, useRef } from "react";
import "./permission.scss";
import Icon from "components/icon";
import { IMenberModel, IMenberSharedModel, IRole, IStaff } from "model/GroupModel";
import { Portal, PortalWithState } from "react-portal";
import { useQuery } from "react-query";
import ProjectService from "services/ProjectService";

export interface IPermissionProps {
  className?: string;
  onChange?: (d) => void;
  isRemove?: boolean;
  removePermission?: (id) => void;
  role?: IRole;
}

const Permission = (props: IPermissionProps) => {
  const { className, onChange, role, isRemove, removePermission } = props;
  const [selected, setSelected] = useState<string>("xem");

  const [permissions, setPermissions] = useState([
    {
      label: "Đồng sở hữu",
      title: "Đồng sở hữu",
      summary: "Bạn có tất cả các quyền đối với dự án",
      icon: <Icon name="User" />,
      id: 1,
      name: "OWNER",
    },
    {
      label: "Người chỉnh sửa",
      title: "Chỉnh sửa",
      summary: "Bạn có chỉnh sửa các thông số của dự án",
      icon: <Icon name="User" />,
      id: 2,
      name: "EDIT",
    },
    {
      label: "Người xem",
      title: "Xem",
      summary: "Bạn có thể xem thông tin dự án",
      value: 3,
      icon: <Icon name="Eye" />,
      id: 3,
      name: "VIEW",
    },
  ]);

  const [isActive, setIsActive] = useState(false);
  const [coords, setCoords] = useState({
    top: 0,
    left: 0,
  });
  const ref = useRef<any>();
  const refActions = useRef(null);

  useEffect(() => {
    if (role?.id === 1) setSelected("đồng sở hữu");
    else if (role?.id === 2) setSelected("chỉnh sửa");
    else setSelected("xem");
  }, [role]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (refActions.current || !refActions.current.contains(event.target)) {
        setIsActive(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refActions]);

  return (
    <div className={`select-permission ${className ? className : ""} `}>
      <div
        ref={ref}
        className="permission-value"
        onClick={(e) => {
          setIsActive(!isActive);
          const rect = ref.current.getBoundingClientRect();
          setCoords({
            left: rect.x,
            top: rect.y + window.scrollY,
          });
        }}
      >
        {selected}
        <Icon name="CaretDown" />
      </div>
      {isActive ? (
        <Portal>
          <div
            className="permission-list"
            style={{
              top: coords.top + 50,
              left: coords.left,
            }}
          >
            {permissions.map((permission, index) => (
              <div
                key={index}
                className="permission-item"
                onClick={() => {
                  //khi chon thay doi quyen
                  setIsActive(!isActive);
                  setSelected(permission.title);
                  onChange(permission.id);
                }}
              >
                {permission.icon}
                <div className="permission-info">
                  <p>{permission.label}</p>
                  <span>{permission.summary}</span>
                </div>
              </div>
            ))}
            {/* {isRemove ? (
              <div
                className="btn-remove"
                onClick={() => {
                  //removePermission(user.id);
                  setIsActive(!isActive);
                }}
              >
                Xoá quyền
              </div>
            ) : null} */}
          </div>
        </Portal>
      ) : null}
    </div>
  );
};

export default Permission;
