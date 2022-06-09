import React from "react";
import Icon from "components/icon";
import { IRouter } from "model/MenuModel";
import Projects from "pages/project";
import CreateProject from "pages/project/CreateProject";
import News from "pages/news";
import AccountSetting from "pages/accountSetting";
import Project from "pages/project/Project";
import ShareProject from "pages/project/partials/ShareProject";
import Dashboard from "pages/dashboard";
import UpdateProject from "pages/project/UpdateProject";
import Employee from "pages/employee/index";
import urls from "configs/urls";
import Account from "pages/admin/account";
import ResetPassword from "pages/admin/reset-password";

export const routes: IRouter[] = [
  {
    path: "/",
    component: <Dashboard />,
  },
  {
    path: "news",
    component: <News />,
  },
  {
    path: "projects",
    component: <Projects />,
  },
  {
    path: "projects/create",
    component: <CreateProject />,
  },
  {
    path: "account",
    component: <AccountSetting />,
  },
  {
    path: "projects/:id",
    component: <Project />,
  },
  {
    path: "projects/update/:id",
    component: <UpdateProject />,
  },
  { path: "share-project", component: <ShareProject /> },
];

export const routesCMS: IRouter[] = [
  {
    path: "/department",
    component: <Employee />,
  },
  {
    path: "/account",
    component: <Account />,
  },
  {
    path: "/reset-password",
    component: <ResetPassword />,
  },
];

export interface IMenuItem {
  title: string;
  path: string;
  icon?: any;
  target?: string;
  is_active?: boolean;
  children?: IMenuItem[];
  is_show_children?: boolean;
  permission?: string[];
}

export const menu: IMenuItem[] = [
  {
    title: "Trang chủ",
    path: "/admin",
    icon: <Icon name="Home" />,
  },
  {
    title: "Quản lý nhân sự",
    path: "employee",
    icon: <Icon name="UserGroup" />,
    children: [
      {
        title: "Quản lý phòng ban",
        path: urls.employee.department,
      },
      {
        title: "Quản lý tài khoản",
        path: urls.employee.account,
      },
      {
        title: "Cấp lại mật khẩu",
        path: urls.employee.resetPassword,
      },
    ],
  },
  {
    title: "Quản lý bộ phân tích",
    path: "/admin/analyzer",
    icon: <Icon name="Analyzer" />,
  },
  {
    title: "Quản lý nguồn",
    path: "/admin/source",
    icon: <Icon name="Source" />,
  },
  {
    title: "Quản lý bot",
    path: "/admin/bot",
    icon: <Icon name="IconBot" />,
  },
  {
    title: "Quản lý proxy",
    path: "/admin/proxy",
    icon: <Icon name="Proxy" />,
  },
];
