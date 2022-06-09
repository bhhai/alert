import avatar from "assets/images/avatar.jpg";

export interface IStaff {
  staff_id: number,
  username: string,
  email?: string,
  status: boolean,
  department_id: number,
  department_name: string,
  department_code: string,
  fullname?: string;
}

export interface IDepartment {
  id: number;
  code: string;
  name: string;
  list_staff: IStaff[],
  manager_id?: number;
}


export interface IMenberModel {
  id: number;
  name: string;
  avatar: any;
}

export interface IRole {
  id: number;
  name: string;
}

export interface IMenberSharedModel extends IStaff {
  role: IRole;
  status2?: "waitforapproval" | "approval" | "notapproval";
}

