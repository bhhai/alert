export interface AdminReportCard {
  type: "department" | "leader" | "employee";
  value: number;
}

interface AdminAccountItem {
  fullname: string,
  room: string,
  regency: string,
  username: string,
  email: string,
  phoneNumber: string | number;
  project: number,
  shared: number
}

interface AccountCreateField {
  label: string;
  value: string;
  isRequired: boolean;
  isError?: boolean;
  errMsg: string;
  type: "text" | "select";
  name: string;
}

export const AccountCreateListField : AccountCreateField[] = [
  {
    label: "tên đăng nhập",
    value: "",
    isRequired: true,
    isError: false,
    errMsg: null,
    type: "text",
    name: "username",
  },
  {
    label: "mật khẩu",
    value: "",
    isRequired: true,
    isError: false,
    errMsg: null,
    type: "text",
    name: "password"
  },
  {
    label: "Nhập lại mật khẩu",
    value: "",
    isRequired: true,
    isError: false,
    errMsg: null,
    type: "text",
    name: "confirmPassword",
  },
  {
    label: "họ và tên",
    value: "",
    isRequired: true,
    isError: false,
    errMsg: null,
    type: "text",
    name: "full_name"
  },
  {
    label: "email",
    value: "",
    isRequired: true,
    isError: false,
    errMsg: null,
    type: "text",
    name: "email"
  },
  {
    label: "số điện thoại",
    value: "",
    isRequired: true,
    isError: false,
    errMsg: null,
    type: "text",
    name: "phone"
  },
]

export const AdminAccountListItem : AdminAccountItem[] = [
  {
    fullname: "Bùi Hoàng Hải",
    room: "Phòng 1",
    regency: "Trưởng phòng",
    username: "haibh",
    email: "haibh@gmail.com",
    phoneNumber: "0345345245",
    project: 20,
    shared: 50
  },
  {
    fullname: "Nguyễn Việt Cường",
    room: "Phòng 2",
    regency: "Nhân viên",
    username: "nvcuong",
    email: "vietcuong@gmail.com",
    phoneNumber: "03453458979",
    project: 20,
    shared: 50
  },
]

export const ReportCardList : AdminReportCard[] = [
  {
    type: "department",
    value: 32
  },
  {
    type: "leader",
    value: 32
  },
  {
    type: "employee",
    value: 3202
  }
]