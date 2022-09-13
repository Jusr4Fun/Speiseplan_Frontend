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
        :ripple="false"
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
        <!-- <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Essensart</th>
              <th class="text-left">Montag</th>
              <th class="text-left">Dienstag</th>
              <th class="text-left">Mittwoch</th>
              <th class="text-left">Donnerstag</th>
              <th class="text-left">Freitag</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in bestellungGesamt" :key="item.Name">
              <td>{{ item.Name }}</td>
              <td>{{ item.Montag }}</td>
              <td>{{ item.Dienstag }}</td>
              <td>{{ item.Mittwoch }}</td>
              <td>{{ item.Donnerstag }}</td>
              <td>{{ item.Freitag }}</td>
            </tr>
          </tbody>
        </template> -->
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
        :ripple="false"
        no-gutters
        :headers="header"
        :items-per-page="5"
        class="elevation-10"
        loading="1"
        loading-text="Lädt... Bitte warten"
        no-data-text="noch keine Daten Eingetragen"
        hide-default-footer
      >
        <template v-slot:[`item.Essen`]="{ item }">
          <v-chip :color="getColor(item.Essen)" dark>
            {{ item.Essen }}
          </v-chip>
        </template>
        <template v-slot:[`item.Montag`]="{ item }">
          <v-simple-checkbox v-model="item.Montag" :ripple="false">
          </v-simple-checkbox>
        </template>
        <template v-slot:[`item.Dienstag`]="{ item }">
          <v-simple-checkbox v-model="item.Dienstag" :ripple="false">
          </v-simple-checkbox>
        </template>
        <template v-slot:[`item.Mittwoch`]="{ item }">
          <v-simple-checkbox v-model="item.Mittwoch" :ripple="false">
          </v-simple-checkbox>
        </template>
        <template v-slot:[`item.Donnerstag`]="{ item }">
          <v-simple-checkbox v-model="item.Donnerstag" :ripple="false">
          </v-simple-checkbox>
        </template>
        <template v-slot:[`item.Freitag`]="{ item }">
          <v-simple-checkbox v-model="item.Freitag" :ripple="false">
          </v-simple-checkbox>
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
import axios from "axios";
export default {
  name: "Home-View",

  data() {
    return {
      inputDialog: false,
      typs: ["Vegan", "Vegetarisch", "Glutenfrei", "Laktosefrei"],
      nema: ["Kevin", "Michael", "Hans", "Stephan"],
      inputRules: [(v) => !!v || "Schreib was rein"],
      normal: {
        Montag: 8,
        Dienstag: 8,
        Mittwoch: 8,
        Donnerstag: 8,
        Freitag: 8,
      },
      aktuelleWoche: {
        id: "",
        name: "",
      },
      wochen: [],
      wochenBestellung: [],
      bestellungGesamt: [
        /* {
          Name: "Normal",
          Montag: 0,
          Dienstag: 0,
          Mittwoch: 0,
          Donnerstag: 0,
          Freitag: 0,
        },
        {
          Name: "Vegetarisch",
          Montag: 0,
          Dienstag: 0,
          Mittwoch: 0,
          Donnerstag: 0,
          Freitag: 0,
        },
        {
          Name: "Vegan",
          Montag: 0,
          Dienstag: 0,
          Mittwoch: 0,
          Donnerstag: 0,
          Freitag: 0,
        },
        {
          Name: "Glutenfrei",
          Montag: 0,
          Dienstag: 0,
          Mittwoch: 0,
          Donnerstag: 0,
          Freitag: 0,
        },
        {
          Name: "Laktosefrei",
          Montag: 0,
          Dienstag: 0,
          Mittwoch: 0,
          Donnerstag: 0,
          Freitag: 0,
        }, */
      ],
      header: [
        { text: "Name", value: "Name" },
        { text: "Essen", value: "Essen" },
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
    axios.get("http://127.0.0.1:8000/api/wochen").then((response) => {
      this.wochen = response.data.data;
      console.log(response.status);
      console.log(response.data.message);
    });
    this.aktuelleWoche = { id: 1, name: "KW 36 2022" };
    axios
      .get(
        `http://127.0.0.1:8000/api/wochen=${this.aktuelleWoche.id}=SpezialEssen`
      )
      .then((response) => {
        var temp = [{}, {}, {}, {}, {}];
        temp[0] = response.data.data.Normal;
        temp[1] = response.data.data.Vegetarisch;
        temp[2] = response.data.data.Vegan;
        temp[3] = response.data.data.Glutenfrei;
        temp[4] = response.data.data.Lactosefrei;
        this.bestellungGesamt = temp;
        console.log(response.status);
        console.log(response.data.message);
      });
  },

  methods: {
    getColor(Essen) {
      if (Essen == "Vegan") return "green";
      else if (Essen == "Vegetarisch") return "blue";
      else if (Essen == "Laktosefrei") return "orange";
      else if (Essen == "Glutenfrei") return "#FBC02D";
    },
    speichern() {
      console.log("Gespeichert");
      this.inputDialog = false;
    },
  },
};
</script>
