import * as API from "@/services/API";

export default {
  getAktuelleWoche(date) {
    return API.apiClient.post(`/aktuelleWoche`, date);
  },
  getNaechsteWoche(date) {
    return API.apiClient.post(`/naechsteWoche`, date);
  },
};
