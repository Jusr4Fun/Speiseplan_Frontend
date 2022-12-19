<template>
  <v-container class="fill-height pa-2" fluid>
    <v-row class="flex-grow-0" dense>
      <v-col v-if="isNutzer">
        <v-card
          class="fill-height yellow lighten-3 text-center rounded-xl0"
          elevation="2"
          :to="'/' + 'Bestellungen'"
        >
          <v-card-text>
            <v-row class="d-flex justify-center text-center">
              <v-icon size="75" color="grey darken-3">
                mdi-calendar-today
              </v-icon>
            </v-row>
            <v-row class="d-flex justify-center text-center text-h4">
              Bestellung nächste Woche
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="isNutzer">
        <v-card
          class="fill-height cyan lighten-3 rounded-xl0"
          elevation="2"
          :to="'/' + 'Teilnehmer'"
        >
          <v-card-text>
            <v-row class="d-flex justify-center text-center">
              <v-icon size="75" color="grey darken-3">mdi-account-group</v-icon>
            </v-row>
            <v-row class="d-flex justify-center text-center text-h4">
              Teilnehmer
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="fill-height amber lighten-3 text-center rounded-xl0"
          elevation="2"
        >
          <v-card-text class="text-h2 text-center font-weight-bold">
            {{ ausgewaehlteWoche.name }} <br />
            <div class="text-h6">
              {{ ausgewaehlteWoche.wochenanfang }}
              -
              {{ ausgewaehlteWoche.wochenende }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="isNutzer">
        <v-card
          class="fill-height green lighten-3 text-center rounded-xl0"
          elevation="2"
          :to="'/' + 'Teilnehmer'"
        >
          <v-card-text>
            <v-row class="d-flex justify-center text-center">
              <v-icon size="75" color="grey darken-3">mdi-account-plus</v-icon>
            </v-row>
            <v-row class="d-flex justify-center text-center text-h4">
              Teilnehmer hinzufügen
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="isKoch">
        <v-card
          class="fill-height cyan lighten-3 text-center rounded-x10"
          elevation="2"
          :to="'/' + 'GesamtBestellungen'"
        >
          <v-card-text>
            <v-row class="d-flex justify-center text-center">
              <v-icon size="75" color="grey darken-3">
                mdi-clipboard-text-outline
              </v-icon>
            </v-row>
            <v-row class="d-flex justify-center text-center text-h4">
              Gesammte Bestellungen anzeigen
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="isKoch">
        <v-card
          class="fill-height teal lighten-3 text-center rounded-xl0"
          elevation="2"
          :to="'/' + 'Upload'"
        >
          <v-card-text>
            <v-row class="d-flex justify-center text-center">
              <v-icon size="75" color="grey darken-3">mdi-calendar-plus</v-icon>
            </v-row>
            <v-row class="d-flex justify-center text-center text-h4">
              Wochenplan einstellen
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="fill-height red lighten-3 text-center rounded-xl0"
          elevation="2"
          :to="'/' + 'SupportAuth'"
        >
          <v-card-text>
            <v-row class="d-flex justify-center text-center">
              <v-icon size="75" color="grey darken-3">mdi-face-agent</v-icon>
            </v-row>
            <v-row class="d-flex justify-center text-center text-h4">
              Support
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <v-card
          class="text-center deep-orange lighten-3 fill-height rounded-x10"
          ref="card"
        >
          <v-card-text>
            <v-img :height="imgheight" :src="image" contain>
              <v-btn
                dark
                fab
                small
                class="ma-4"
                elevation="2"
                color="buttonGreen"
                @click="vorherigeWoche"
              >
                <v-icon dark>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn
                dark
                fab
                small
                class="ma-4"
                elevation="2"
                color="buttonGreen"
                @click="naechsteWoche"
              >
                <v-icon dark>mdi-chevron-right</v-icon>
              </v-btn>
            </v-img>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.container.fill-height {
  flex-direction: column !important;
  align-items: unset !important;
}

.container.fill-height > .row {
  flex: 1 1 auto !important;
  max-width: initial;
  width: 100%;
}

.container {
  background-color: #b0bec5;
}
</style>

<script>
import roleCheck from "@/router/roleCheck";
import Nutzer from "@/middleware/nutzer";
import Koch from "@/middleware/koch";
import store from "@/store/index";
import * as API from "@/services/API";
import { Buffer } from "buffer";

export default {
  name: "Dashboard-View",

  data() {
    return {
      isKoch: false,
      isNutzer: false,
      ausgewaehlteWoche: {},
      imgheight: 600,
      image: null,
    };
  },

  beforeMount() {
    this.ausgewaehlteWoche = Object.assign(
      {},
      store.getters["data/naechsteWoche"]
    );
  },

  created() {
    this.isKoch = this.istKoch();
    this.isNutzer = this.istNutzer();
  },

  mounted() {
    this.loadImage();
    this.calcimgHeight();
  },

  methods: {
    istKoch() {
      return roleCheck(store, [Koch]);
    },

    istNutzer() {
      return roleCheck(store, [Nutzer]);
    },

    calcimgHeight() {
      this.imgheight = this.$refs.card.$el.clientHeight - 32;
    },

    naechsteWoche() {
      API.apiClient
        .get(`/woche/${this.ausgewaehlteWoche.id + 1}`)
        .then((response) => {
          this.ausgewaehlteWoche = response.data.data;
          //console.log(response.status);
          //console.log(response.data.message);
          this.updated = true;
        })
        .catch(() => {});
    },

    loadImage() {
      API.apiClient
        .get(`/ImageWoche/${this.ausgewaehlteWoche.id}`, {
          responseType: "arraybuffer",
        })
        .then((response) => {
          this.image =
            "data:image/jpeg;base64," +
            Buffer.from(response.data, "binary").toString("base64");
          //console.log(response.status);
        })
        .catch(() => {});
    },

    vorherigeWoche() {
      API.apiClient
        .get(`/woche/${this.ausgewaehlteWoche.id - 1}`)
        .then((response) => {
          this.ausgewaehlteWoche = response.data.data;
          //console.log(response.status);
          //console.log(response.data.message);
          this.updated = true;
        })
        .catch(() => {});
    },
  },

  watch: {
    ausgewaehlteWoche: {
      deep: true,
      handler() {
        this.loadImage();
      },
    },
  },
};
</script>
