<template>
  <v-container class="fill-height" fluid>
    <v-row class="d-flex text-center justify-space-around">
      <v-card class="text-center h1" elevation="0" height="100" width="200">
        Datum Wochenanfang <br />
        - <br />
        Datum Wochenende
      </v-card>
      <v-card elevation="0" width="300">
        <div>
          <v-btn
            dark
            fab
            small
            class="ma-4"
            @click="vorherigeWoche"
            elevation="2"
            color="buttonGreen"
          >
            <v-icon dark>mdi-chevron-left</v-icon>
          </v-btn>
          {{ ausgewaehlteWoche.name }}
          <v-btn
            dark
            fab
            small
            class="ma-4"
            @click="naechsteWoche"
            elevation="2"
            color="buttonGreen"
          >
            <v-icon dark>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </v-card>
      <v-card elevation="0" height="100" width="200"> upload buttons </v-card>
    </v-row>

    <v-img :height="imgheight" src="@/assets/pics/kw47.jpg" contain> </v-img>
  </v-container>
</template>

<style scoped>
.card {
  background-color: #b0bec5;
}
.container {
  background-color: #b0bec5;
}
</style>
<script>
import store from "@/store/index";
import * as API from "@/services/API";
export default {
  data: () => ({
    ausgewaehlteWoche: null,
    imgheight: 600,
  }),

  async beforeMount() {
    this.ausgewaehlteWoche = Object.assign(
      {},
      store.getters["data/naechsteWoche"]
    );
  },

  methods: {
    naechsteWoche() {
      API.apiClient
        .get(`/woche=${this.ausgewaehlteWoche.id + 1}`)
        .then((response) => {
          this.ausgewaehlteWoche = response.data.data;
          console.log(response.status);
          console.log(response.data.message);
        });
    },

    vorherigeWoche() {
      API.apiClient
        .get(`/woche=${this.ausgewaehlteWoche.id - 1}`)
        .then((response) => {
          this.ausgewaehlteWoche = response.data.data;
          console.log(response.status);
          console.log(response.data.message);
        });
    },
  },
};
</script>
