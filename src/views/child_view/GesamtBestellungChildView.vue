<template>
  <v-container fluid>
    <v-card-title class="d-flex justify-center">
      <v-btn icon>
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <div>{{ aktuelleWoche.name }}</div>
      <v-btn icon>
        <v-icon>mdi-chevron-right</v-icon>
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
import * as API from "@/services/API";
export default {
  name: "Home-View",

  data() {
    return {
      typs: ["Vegan", "Vegetarisch", "Glutenfrei", "Laktosefrei"],
      aktuelleWoche: {
        id: "",
        name: "",
      },
      wochen: [],
      spezialBestellungen: [],
      bestellungGesamt: [],
      spezialheader: [
        { text: "Name", value: "Name" },
        { text: "Montag", value: "Montag" },
        { text: "Dienstag", value: "Dienstag" },
        { text: "Mittwoch", value: "Mittwoch" },
        { text: "Donnerstag", value: "Donnerstag" },
        { text: "Freitag", value: "Freitag" },
      ],
      gesamtHeader: [
        { text: "Name", value: "Name" },
        { text: "Montag", value: "Montag" },
        { text: "Dienstag", value: "Dienstag" },
        { text: "Mittwoch", value: "Mittwoch" },
        { text: "Donnerstag", value: "Donnerstag" },
        { text: "Freitag", value: "Freitag" },
      ],
    };
  },

  beforeMount() {
    API.apiClient.get(`/wochen`).then((response) => {
      this.wochen = response.data.data;
      console.log(response.status);
      console.log(response.data.message);
    });
    this.aktuelleWoche = { id: 1, name: "KW 36 2022" };
    API.apiClient
      .get(`/wochen=${this.aktuelleWoche.id}=SpezialEssen`)
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

  methods: {
    getColor(Essen) {
      if (Essen == "Vegan") return "green";
      else if (Essen == "Vegetarisch") return "blue";
      else if (Essen == "Laktosefrei") return "#ffa014";
      else if (Essen == "Glutenfrei") return "#FBC02D";
      else if (Essen == "") return "white";
    },
  },
};
</script>
