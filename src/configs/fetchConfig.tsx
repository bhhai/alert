import fetchIntercept from "fetch-intercept";
import { useCookies } from "react-cookie";
export default () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  return fetchIntercept.register({
    request(url, config) {
      if (config == null) {
        config = {};
      }
      if (config.headers == null) {
        config.headers = {};
      }
      if (cookies.token) {
        config.headers["Authorization"] = `Bearer ${cookies.token}`;
      }
      if (config.headers.Accept == null) {
        config.headers.Accept = "application/json";
      }
      if (config.headers["Content-Type"] == null) {
        config.headers["Content-Type"] = "application/json";
      }
      if (url.includes("cdnvda")) {
        //delete config.headers["Content-Type"];
        config.headers["Content-Type"] = "form-data";
      }
      if (!url.startsWith("http")) {
        if (!url.startsWith("/")) {
          url = `/${url}`;
        }
        if (url.indexOf(".hot-update.json") === -1) {
          url = process.env.APP_API_URL + url;
        }
      }
      return [url, config];
    },

    requestError(error) {
      return Promise.reject(error);
    },

    response(response) {
      if (response.status === 403) {
        //api lấy thông tin cá nhân: => sai token lại trả về 400, yêu cầu trả về 403
        if (cookies.role) {
          removeCookie("role", { path: "/" });
          removeCookie("role", { path: "/admin" });
        }
        if (cookies.token) {
          removeCookie("token", { path: "/" });
          removeCookie("token", { path: "/admin" });
        }
      }
      return response;
    },

    responseError(error) {
      return Promise.reject(error);
    },
  });
};
