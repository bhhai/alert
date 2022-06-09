import React from "react";
import DepartmentImage from "assets/images/img-department.png";
import LeaderImage from "assets/images/img-leader.png";
import EmployeeImage from "assets/images/img-employee.png";
import Common from "utils/common";
import { number } from "yup";

interface AdminTotalCardProps {
  type: "department" | "leader" | "employee";
  value: number;
}

export default function AdminTotalCard(props: AdminTotalCardProps) {
  const { type, value } = props;
  return (
    <div className="admin-total-card">
      <div className="admin-total-card__center">
        <div className="admin-total-card__container">
          <div className="admin-total-card__thumb">
            <img
              src={type === "department" ? DepartmentImage : type === "leader" ? LeaderImage : EmployeeImage}
              alt=""
            />
          </div>
          <div className="admin-total-card__content">
            <h4 className="title">
              {type === "department"
                ? "Tổng số phòng ban"
                : type === "leader"
                ? "Tổng số trưởng phòng"
                : "Tổng số nhân viên"}
            </h4>
            <span className="value">{Common.formatCurrency(value)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
