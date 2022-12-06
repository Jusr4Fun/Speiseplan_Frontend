<template>
  <v-container fluid id="print">
    <v-row class="d-flex align-start justify-space-around" dense>
      <v-card
        class="card text-center text-h6"
        elevation="0"
        height="300"
        width="400"
      >
        <v-data-table
          no-gutters
          dense
          :headers="abteilungHeader"
          :items="abteilungStatus"
          no-data-text="noch keine Daten Eingetragen"
          hide-default-footer
        >
        </v-data-table>
      </v-card>
      <v-card class="card text-h6" elevation="0" width="300">
        <v-row class="d-flex justify-center">
          <v-card elevation="0">
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
          </v-card>
        </v-row>
        <v-row class="d-flex justify-center text-center">
          <v-card
            class="card text-center text-h6"
            elevation="0"
            height="100"
            width="400"
          >
            Datum Wochenanfang <br />
            - <br />
            Datum Wochenende
          </v-card>
        </v-row>
      </v-card>
      <v-card class="card text-center" elevation="0" height="100" width="400">
        <v-btn
          class="ma-4 text-center"
          dark
          color="buttonGreen"
          elevation="2"
          @click="print"
        >
          Drucken
        </v-btn>
      </v-card>
    </v-row>
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
      abteilungStatus: [],
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
      abteilungHeader: [
        { text: "Abteilung", value: "name" },
        { text: "Bestellt", value: "Bestellt" },
      ],
    };
  },

  async beforeMount() {
    this.ausgewaehlteWoche = Object.assign(
      {},
      store.getters["data/naechsteWoche"]
    );
    await this.getData();
  },

  watch: {
    updated() {
      this.getData();
      this.updated = false;
    },
  },

  methods: {
    getColor(Essen) {
      if (Essen == "Vegan") return "green";
      else if (Essen == "Vegetarisch") return "blue";
      else if (Essen == "Laktosefrei") return "#ffa014";
      else if (Essen == "Glutenfrei") return "#FBC02D";
      else if (Essen == "") return "white";
    },

    async getData() {
      API.apiClient.get(`/wochen`).then((response) => {
        this.wochen = response.data.data;
        console.log(response.status);
        console.log(response.data.message);
      });
      await store
        .dispatch("data/getGesamtBestellAktWoche", this.ausgewaehlteWoche.id)
        .then(() => {});
      var temp = Object.assign(
        {},
        await store.getters["data/gesamtBestellungenaktWoche"]
      );
      this.bestellungGesamt = temp.gesamtBestellungen;
      this.spezialBestellungen = temp.teilnehmer;
      this.abteilungStatus = temp.abteilungen;
    },

    naechsteWoche() {
      API.apiClient
        .get(`/woche=${this.ausgewaehlteWoche.id + 1}`)
        .then((response) => {
          this.ausgewaehlteWoche = response.data.data;
          console.log(response.status);
          console.log(response.data.message);
          console.log(response.data.data);
          this.updated = true;
        });
    },

    vorherigeWoche() {
      API.apiClient
        .get(`/woche=${this.ausgewaehlteWoche.id - 1}`)
        .then((response) => {
          this.ausgewaehlteWoche = response.data.data;
          console.log(response.status);
          console.log(response.data.message);
          console.log(response.data.data);
          this.updated = true;
        });
    },

    print() {
      this.$router.push({
        name: "PrintGesamtBestellungen",
        params: { woche: this.ausgewaehlteWoche.name },
      });
    },
  },
};
</script>

<style scoped>
.v-data-table >>> td {
  font-size: 13px !important;
}
</style>
