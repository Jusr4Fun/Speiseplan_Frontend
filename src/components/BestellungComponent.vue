<template>
  <v-container fluid>
    <v-card-title class="d-flex justify-center">
      <v-btn icon>
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <div>KW 30 2022</div>
      <v-btn icon>
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-card-title>
    <v-row class="text-h6 font-weight-bold">
      <v-col cols="2" class="d-flex align-center text-h5 font-weight-bold ma-2"
        >Normale Bestellungen</v-col
      >
      <v-col cols="1" class="ma-2"
        ><div class="d-flex justify-center pa-2">Montag</div>
        <v-text-field type="number" v-model="normal.Montag"></v-text-field
      ></v-col>
      <v-col cols="1" class="ma-2"
        ><div class="d-flex justify-center pa-2">Dienstag</div>
        <v-text-field type="number" v-model="normal.Dienstag"></v-text-field
      ></v-col>
      <v-col cols="1" class="ma-2"
        ><div class="d-flex justify-center pa-2">Mittwoch</div>
        <v-text-field type="number" v-model="normal.Mittwoch"></v-text-field
      ></v-col>
      <v-col cols="1" class="ma-2"
        ><div class="d-flex justify-center pa-2">Donnerstag</div>
        <v-text-field type="number" v-model="normal.Donnerstag"></v-text-field
      ></v-col>
      <v-col cols="1" class="ma-2"
        ><div class="d-flex justify-center pa-2">Freitag</div>
        <v-text-field type="number" v-model="normal.Freitag"></v-text-field
      ></v-col>
    </v-row>
    <v-row>
      <v-col
        class="d-flex align-center justify-start ma-2 font-weight-bold text-h5"
        ><div>Spezial Bestellungen</div>
      </v-col>
    </v-row>
    <v-row></v-row>
    <v-layout child-flex>
      <v-data-table
        :ripple="false"
        no-gutters
        :headers="header"
        :items="dummy"
        :items-per-page="5"
        class="elevation-1"
        loading="1"
        loading-text="Lädt... Bitte warten"
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
    <v-row class="d-flex justify-end pa-md-2">
      <v-card-title>
        Hinzufügen
        <v-dialog
          transition="dialog-top-transition"
          max-width="600"
          persistent
          v-model="inputDialog"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mx-4 pa-md-2"
              fab
              dark
              color="buttonGreen"
              style="vertical-align: middle"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon dark> mdi-plus </v-icon>
            </v-btn>
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar color="primary" dark
                >Neue Spezial Bestellung</v-toolbar
              >
              <v-card-text>
                <v-autocomplete
                  label="Teilnehmer"
                  required
                  :rules="inputRules"
                  :items="nema"
                ></v-autocomplete>
                <v-autocomplete
                  label="Essen"
                  required
                  :rules="inputRules"
                  :items="typs"
                ></v-autocomplete>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn text @click="speichern">Anlegen</v-btn>
                <v-btn text @click="dialog.value = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-card-title>
    </v-row>
    <v-row class="d-flex justify-end pa-md-2"
      ><v-btn
        class="mx-4 pa-md-2"
        dark
        color="buttonGreen"
        style="vertical-align: middle"
        >Speichern</v-btn
      >
    </v-row>
  </v-container>
</template>

<script>
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
      dummy: [
        {
          Name: "Kainz",
          Essen: "Vegan",
          Montag: false,
          Dienstag: true,
          Mittwoch: true,
          Donnerstag: false,
          Freitag: true,
        },
        {
          Name: "Hans",
          Essen: "Vegetarisch",
          Montag: false,
          Dienstag: true,
          Mittwoch: true,
          Donnerstag: false,
          Freitag: true,
        },
        {
          Name: "Franz",
          Essen: "Glutenfrei",
          Montag: false,
          Dienstag: true,
          Mittwoch: true,
          Donnerstag: false,
          Freitag: true,
        },
        {
          Name: "Georg",
          Essen: "Laktosefrei",
          Montag: false,
          Dienstag: true,
          Mittwoch: true,
          Donnerstag: false,
          Freitag: true,
        },
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
    };
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
