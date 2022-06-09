import urls from "configs/urls";

export default {
  getDepartments: () => {
    return fetch(urls.department.getList, {
      method: "GET",
    }).then((res) => res.json());
  },
  getAllStaff: () => {
    return fetch(urls.department.getStaffs, {
      method: "GET",
    }).then((res) => res.json());
  },
  create: (data) => {
    return fetch(urls.department.create, {
      method: "POST",
      body: JSON.stringify({ ...data }),
    }).then((res) => res.json());
  },
  update: (id, data) => {
    return fetch(urls.department.update + `/${id}`, {
      method: "PUT",
      body: JSON.stringify({ ...data }),
    }).then((res) => res.json());
  },
  delete: (id) => {
    return fetch(urls.department.delete + `/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  },
  getDepartmentByPage: (page, keyword = "") => {
    return fetch(
      urls.department.getDepartmentByPage + `?${new URLSearchParams({ page_size: String(10), page, keyword })}`,
      {
        method: "GET",
      }
    ).then((res) => res.json());
  },
};
