<template>
  <v-container fluid>
    <v-card-title class="d-flex justify-center" elevation="2">
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
      <div>{{ ausgewaehlteWoche.name }}</div>
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
    </v-card-title>
    <v-row>
      <v-col
        class="d-flex align-center justify-start ma-2 font-weight-bold text-h6"
        ><div>Anzahl Bestellungen</div>
      </v-col>
    </v-row>
    <v-card class="elevation-10">
      <v-data-table
        no-gutters
        :items="bestellungGesamt"
        :headers="gesamtHeader"
        :items-per-page="5"
        class="elevation-10"
        loading="1"
        loading-text="Lädt... Bitte warten"
        no-data-text="noch keine Daten Eingetragen"
        hide-default-footer
        disable-sort
      >
      </v-data-table>
    </v-card>
    <v-row>
      <v-col
        class="d-flex align-center justify-start ma-2 mt-6 font-weight-bold text-h6"
        ><div>Spezial Bestellungen</div>
      </v-col>
    </v-row>
    <v-row></v-row>
    <v-layout child-flex>
      <v-data-table
        no-gutters
        :headers="spezialheader"
        :items="spezialBestellungen"
        class="elevation-10"
        loading="1"
        loading-text="Lädt... Bitte warten"
        no-data-text="noch keine Daten Eingetragen"
        hide-default-footer
        sort-by="Name"
      >
        <template v-slot:[`item.Montag`]="{ item }">
          <v-chip v-if="item.Montag != ''" :color="getColor(item.Montag)" dark>
            {{ item.Montag }}
          </v-chip>
        </template>
        <template v-slot:[`item.Dienstag`]="{ item }">
          <v-chip
            v-if="item.Dienstag != ''"
            :color="getColor(item.Dienstag)"
            dark
          >
            {{ item.Dienstag }}
          </v-chip>
        </template>
        <template v-slot:[`item.Mittwoch`]="{ item }">
          <v-chip
            v-if="item.Mittwoch != ''"
            :color="getColor(item.Mittwoch)"
            dark
          >
            {{ item.Mittwoch }}
          </v-chip>
        </template>
        <template v-slot:[`item.Donnerstag`]="{ item }">
          <v-chip
            v-if="item.Donnerstag != ''"
            :color="getColor(item.Donnerstag)"
            dark
          >
            {{ item.Donnerstag }}
          </v-chip>
        </template>
        <template v-slot:[`item.Freitag`]="{ item }">
          <v-chip
            v-if="item.Freitag != ''"
            :color="getColor(item.Freitag)"
            dark
          >
            {{ item.Freitag }}
          </v-chip>
        </template>
      </v-data-table>
    </v-layout>
    <v-row class="d-flex justify-end pa-md-6"
      ><v-btn
        class="mx-4 pa-md-2"
        dark
        color="buttonGreen"
        style="vertical-align: middle"
      >
        Drucken
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import store from "@/store/index";
import * as API from "@/services/API";
export default {
  name: "Home-View",

  data() {
    return {
      typs: ["Vegan", "Vegetarisch", "Glutenfrei", "Laktosefrei"],
      updated: false,
      ausgewaehlteWoche: {},
      wochen: [],
      spezialBestellungen: [],
      bestellungGesamt: [],
      spezialheader: [
        { text: "Name", value: "Name", sortable: false },
        { text: "Montag", value: "Montag", align: "center", sortable: false },
        {
          text: "Dienstag",
          value: "Dienstag",
          align: "center",
          sortable: false,
        },
        {
          text: "Mittwoch",
          value: "Mittwoch",
          align: "center",
          sortable: false,
        },
        {
          text: "Donnerstag",
          value: "Donnerstag",
          align: "center",
          sortable: false,
        },
        { text: "Freitag", value: "Freitag", align: "center", sortable: false },
      ],
      gesamtHeader: [
        { text: "Name", value: "Name" },
        { text: "Montag", value: "Montag", align: "center" },
        { text: "Dienstag", value: "Dienstag", align: "center" },
        { text: "Mittwoch", value: "Mittwoch", align: "center" },
        { text: "Donnerstag", value: "Donnerstag", align: "center" },
        { text: "Freitag", value: "Freitag", align: "center" },
      ],
    };
  },

  beforeMount() {
    this.ausgewaehlteWoche = Object.assign(
      {},
      store.getters["data/naechsteWoche"]
    );
    this.getData();
  },

  updated() {
    if (this.updated) {
      this.getData();
      this.updated = false;
    }
  },

  methods: {
    getColor(Essen) {
      if (Essen == "Vegan") return "green";
      else if (Essen == "Vegetarisch") return "blue";
      else if (Essen == "Laktosefrei") return "#ffa014";
      else if (Essen == "Glutenfrei") return "#FBC02D";
      else if (Essen == "") return "white";
    },

    getData() {
      API.apiClient.get(`/wochen`).then((response) => {
        this.wochen = response.data.data;
        console.log(response.status);
        console.log(response.data.message);
      });
      API.apiClient
        .get(`/wochen=${this.ausgewaehlteWoche.id}=SpezialEssen`)
        .then((response) => {
          var temp = [{}, {}, {}, {}, {}];
          temp[0] = response.data.data.Normal;
          temp[1] = response.data.data.Vegetarisch;
          temp[2] = response.data.data.Vegan;
          temp[3] = response.data.data.Glutenfrei;
          temp[4] = response.data.data.Laktosefrei;
          this.bestellungGesamt = temp;
          this.spezialBestellungen = response.data.data.teilnehmer;
          console.log(response.status);
          console.log(response.data.message);
        });
    },

    naechsteWoche() {
      this.updated = true;
      API.apiClient
        .get(`/woche=${this.ausgewaehlteWoche.id + 1}`)
        .then((response) => {
          this.ausgewaehlteWoche = response.data.data;
          console.log(response.status);
          console.log(response.data.message);
          console.log(response.data.data);
        });
    },

    vorherigeWoche() {
      this.updated = true;
      API.apiClient
        .get(`/woche=${this.ausgewaehlteWoche.id - 1}`)
        .then((response) => {
          this.ausgewaehlteWoche = response.data.data;
          console.log(response.status);
          console.log(response.data.message);
          console.log(response.data.data);
        });
    },
  },
};
</script>
