import axios from "axios";
import store from "@/store/index";
import router from "@/router";

export const authClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true, // required to handle the CSRF token
});

/*
 * Add a response interceptor
 */
authClient.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 419)
    ) {
      store.dispatch("auth/logout");
    }
    return Promise.reject(error);
  }
);

export default {
  async login(payload) {
    var success = false;
    await authClient.get("/sanctum/csrf-cookie");
    await authClient
      .post("/login", payload)
      .then(async (response) => {
        if (response.status === 200) {
          try {
            var authUser = await store.dispatch("auth/getAuthUser");
            if (authUser) {
              success = true;
              router.push("/dashboard");
            } else {
              const error = Error(
                "Unable to fetch user after login, check your API settings."
              );
              error.name = "Fetch User";
              throw error;
            }
          } catch (error) {
            console.log(error);
          }
        }
      })
      .catch(() => console.log("Sessionüberprüfung fehlgeschlagen"));
    return success;
  },
  async logout() {
    await authClient.post("/logout");
  },
  async forgotPassword(payload) {
    await authClient.get("/sanctum/csrf-cookie");
    await authClient.post("/forgot-password", payload);
  },
  async getAuthUser() {
    return await authClient.get("/api/users/auth");
  },
  async resetPassword(payload) {
    await authClient.get("/sanctum/csrf-cookie");
    await authClient.post("/reset-password", payload);
  },
  async updatePassword(payload) {
    await authClient.put("/user/password", payload);
  },
  async registerUser(payload) {
    await authClient.get("/sanctum/csrf-cookie");
    await authClient.post("/register", payload);
  },
  async sendVerification(payload) {
    await authClient.post("/email/verification-notification", payload);
  },
  async updateUser(payload) {
    await authClient.put("/user/profile-information", payload);
  },
};
