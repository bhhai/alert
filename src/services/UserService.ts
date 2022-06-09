import urls from "configs/urls";
import { IUserLogin, IForgot, stepForgot, IUser, IUserPassword } from "model/user/UserModel";
import Common from "utils/common";

export default {
  login: (loginInfo: IUserLogin) => {
    return fetch(urls.user.login, {
      method: "POST",
      body: JSON.stringify({
        username: loginInfo.username,
        password: loginInfo.password,
      }),
    }).then((res) => res.json());
  },
  updateUserInfo: (userInfo: IUser) => {
    return fetch(urls.user.updateUserInfo, {
      method: "PUT",
      body: JSON.stringify({
        full_name: userInfo.full_name,
        email: userInfo.email,
        phone_number: userInfo.phone,
        avatar_url: userInfo.avatar_url,
      }),
    }).then((res) => res.json());
  },
  // updateUserAvatar: (data: FormData) => {
  //   fetch('https://cdnvda.mhsolution.vn/uploadMultipleFiles', {
  //     method: 'POST',
  //     body: data
  //   })
  // },
  updateUserPassword: (userInfo: IUserPassword) => {
    return fetch(urls.user.updateUserPassword, {
      method: "PUT",
      body: JSON.stringify({
        current_password: userInfo.password,
        new_password: userInfo.newPassword,
        repeat_new_password: userInfo.newConfirm,
      }),
    }).then((res) => res.json());
  },

  getInfo: () => {
    return fetch(urls.user.getInfo, {
      method: "GET",
    }).then((res) => res.json());
  },
};
