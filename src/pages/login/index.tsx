import { yupResolver } from "@hookform/resolvers/yup";
import LogoBg from "assets/images/login-bg.jpg";
import Logo from "assets/images/login-logo.png";
import Input from "components/input/input";
import { UserContext } from "configs/userContext";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import Button from "components/button/button";
import "./index.scss";
import { useCookies } from "react-cookie";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Tài khoản không được để trống"),
  password: Yup.string().min(2, "Mật khẩu tối thiểu 2 kí tự").required("Mật khẩu không được để trống"),
});

export default function Login() {
  const [cookies, setCookies, removeCookies] = useCookies();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({ resolver: yupResolver(validationSchema), mode: "onChange" });
  const { login } = useContext(UserContext);

  const handleLogin = async (data) => {
    await login(data.username, data.password);
  };

  // useEffect(() => {
  //   removeCookies("token", { path: "/" });
  //   removeCookies("role", { path: "/" });
  //   removeCookies("token", { path: "/admin" });
  //   removeCookies("role", { path: "/admin" });
  // }, []);

  return (
    <div className="login">
      <div className="login__bg">
        <img src={LogoBg} alt="" />
      </div>
      <div className="login__form">
        <div className="login__form__logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="login__form__container">
          <h3 className="login__form__title">Đăng nhập</h3>
          <span className="login__form__subtitle">Nhập tài khoản và mật khẩu của bạn để sử dụng Alert.vn</span>

          <form onSubmit={handleSubmit((data) => handleLogin(data))} className="login__form__form">
            <Input
              className="input-field"
              label="Tên đăng nhập"
              placeholder="Nhập tên đăng nhập"
              error={!!errors.username}
              message={errors?.username?.message}
              register={register("username")}
            />

            <Input
              className="input-field"
              type="password"
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              register={register("password")}
              error={!!errors.password}
              message={errors?.password?.message}
            />

            <div className="form-btn">
              <Button type="submit" disabled={!isValid || !isDirty} color="primary">
                Đăng nhập
              </Button>
              {/* <button type="submit" >Đăng nhập</button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
