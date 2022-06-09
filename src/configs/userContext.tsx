import React, { useContext, useState, createContext, useEffect } from "react";
import UserService from "services/UserService";
import { useCookies } from "react-cookie";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Common from "utils/common";
import fetchConfig from "configs/fetchConfig";
export interface IUser {
  id: number;
  username: string;
  roles: string[];
  phone_number: string;
  full_name: string;
  avatar_url: string;
}

export interface ContextType {
  user: IUser;
  login: (username, password) => void;
}
export const UserContext = createContext<ContextType>({} as ContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>();
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();
  const location = useLocation();

  fetchConfig();

  const login = async (username, password) => {
    try {
      const res = await UserService.login({ username, password });
      setCookie("token", res.result.token, { path: location.pathname.includes("admin") ? "/admin" : "/" });
      const resAuth = await UserService.getInfo();
      setUser(resAuth.result);
      setCookie("role", JSON.stringify(resAuth.result.roles[0]), {
        path: location.pathname.includes("admin") ? "/admin" : "/",
      });
      if (location.pathname.includes("admin")) navigate("/admin", { replace: true });
      else navigate("/", { replace: true });
    } catch {
      Common.showToast("Có lỗi xảy ra vui lòng thử lại sau!", "error");
    }
  };

  const value = { user, login };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const Guard = ({ children, allowedRoles }) => {
  const location = useLocation();
  const [cookies] = useCookies();

  // useEffect(() => {
  //   if (!allowedRoles.includes(cookies.role)) Common.showToast("Tài khoản không có quyền truy cập", "error");
  // }, []);

  if (allowedRoles.includes(cookies.role) && cookies.token) return children;

  return <Navigate to={location.pathname.includes("admin") ? "/admin/login" : `/login`} replace />;
};
