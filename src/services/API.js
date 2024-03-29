import axios from "axios";
import store from "@/store/index";
import router from "@/router";

export const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL + "/api",
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 419)
    ) {
      store.dispatch("auth/logout");
      if (router.currentRoute != "/login") {
        router.push("/login").catch(() => {});
      }
    }
    //return Promise.reject(error);
  }
);
