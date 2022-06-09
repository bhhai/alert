import urls from "configs/urls";
import { IUser } from "model/user/UserModel";

export default {
  getAccountList: () => {
    return fetch(urls.accountManagerment.getAll, {
      method: "GET",
    }).then((res) => res.json());
  },
  createAccount: (account: IUser) => {
    return fetch(urls.accountManagerment.createAccount, {
      method: "POST",
      body: JSON.stringify({
        username: account.username,
        password: account.password,
        full_name: account.full_name,
        email: account.email,
        phone_number: account.phone_number,
        avatar_url: account.avatar_url,
        roles: ["STAFF"],
        department_id: account.department_id
      }),
    }).then((res) => res.json());
  },
  delete: (id) => {
    return fetch(urls.accountManagerment.deleteAccount + `/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  },
  updateAccount: (id, account : IUser) => {
    return fetch(urls.accountManagerment.updateAccount + `/${id}`, {
      method: "POST",
      body: JSON.stringify({
        username: account.username,
        password: account.password,
        full_name: account.full_name,
        email: account.email,
        phone_number: account.phone_number,
        avatar_url: "https://media.vov.vn/sites/default/files/styles/large/public/2022-02/3_96.jpg",
        roles: [account.roles],
        department_id: account.department_id
      }),
    }).then((res) => res.json());
  },
  getAccountByPage: (page_size, page, keyword) => {
    return fetch(urls.accountManagerment.getAccountByPage + `?${new URLSearchParams({ page_size: page_size, page, keyword })}`, {
      method: "GET",
    }).then(res => res.json());
  },
};
