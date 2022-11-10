import DataService from "@/services/DataService";

export const namespaced = true;

export const state = {
  aktuelleWoche: null,
  naechsteWoche: null,
};

export const mutations = {
  SET_AKTUELLEWOCHE(state, woche) {
    state.aktuelleWoche = woche;
  },
  SET_NAECHSTEWOCHE(state, woche) {
    state.naechsteWoche = woche;
  },
};

export const actions = {
  getAktuelleWoche({ commit }) {
    const date = {
      time: new Date().getTime(),
      offset: new Date().getTimezoneOffset(),
    };
    DataService.getAktuelleWoche(date)
      .then((response) => {
        commit("SET_AKTUELLEWOCHE", response.data.data);
      })
      .catch((error) => {
        console.log(error.data);
      });
  },
  async getWochen({ commit }) {
    const date = {
      time: new Date().getTime(),
      offset: new Date().getTimezoneOffset(),
    };
    await DataService.getAktuelleWoche(date)
      .then((response) => {
        commit("SET_AKTUELLEWOCHE", response.data.data);
      })
      .catch((error) => {
        console.log(error.data);
      });
    await DataService.getNaechsteWoche(date)
      .then((response) => {
        commit("SET_NAECHSTEWOCHE", response.data.data);
      })
      .catch((error) => {
        console.log(error.data);
      });
  },
};

export const getters = {
  aktuelleWoche: (state) => {
    return state.aktuelleWoche;
  },
  naechsteWoche: (state) => {
    return state.naechsteWoche;
  },
};
