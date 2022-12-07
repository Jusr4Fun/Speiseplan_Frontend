<template>
  <v-container fluid>
    <v-row class="justify-center mt-2">
      <v-card class="card text-h6" elevation="0" width="300">
        <v-row class="d-flex justify-center">
          <v-card elevation="0" class="card">
            <v-btn
              dark
              fab
              small
              class="ma-4"
              @click="vorherigeWoche"
              elevation="2"
              color="buttonGreen"
            >
              <v-icon dark> mdi-chevron-left </v-icon>
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
            {{ ausgewaehlteWoche.wochenanfang }}
            -
            {{ ausgewaehlteWoche.wochenende }}
          </v-card>
        </v-row>
      </v-card>
    </v-row>
    <v-layout child-flex>
      <v-data-table
        class="ma-2 elevation-2"
        :items="normal"
        :headers="normalHeader"
        hide-default-footer
        disable-sort
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title class="text-h5 font-weight-bold ma-2">
              Normale Bestellungen
            </v-toolbar-title>
          </v-toolbar>
        </template>
        <template v-slot:[`item.Montag`]="{ item }">
          <v-text-field min="0" type="number" v-model="item.Montag">
          </v-text-field>
        </template>
        <template v-slot:[`item.Dienstag`]="{ item }">
          <v-text-field min="0" type="number" v-model="item.Dienstag">
          </v-text-field>
        </template>
        <template v-slot:[`item.Mittwoch`]="{ item }">
          <v-text-field min="0" type="number" v-model="item.Mittwoch">
          </v-text-field>
        </template>
        <template v-slot:[`item.Donnerstag`]="{ item }">
          <v-text-field min="0" type="number" v-model="item.Donnerstag">
          </v-text-field>
        </template>
        <template v-slot:[`item.Freitag`]="{ item }">
          <v-text-field min="0" type="number" v-model="item.Freitag">
          </v-text-field>
        </template>
      </v-data-table>
    </v-layout>
    <v-layout child-flex>
      <v-data-table
        ref="specialBestellungenTabelle"
        :headers="header"
        :items="spezialBestellung"
        class="elevation-2 ma-2"
        no-data-text="noch keine Daten Eingetragen"
        hide-default-footer
        mobile-breakpoint="875"
        sort-by="Name"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title class="text-h5 font-weight-bold ma-2">
              Spezial Bestellungen
            </v-toolbar-title>
            <v-row class="d-flex justify-end pa-md-4">
              <v-card-title>
                Teilnehmer Hinzufügen
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
                  <template v-slot-model="dialog">
                    <v-card>
                      <v-toolbar color="primary" dark>
                        Neue Spezial Bestellung
                      </v-toolbar>
                      <v-card-text>
                        <v-autocomplete
                          label="Teilnehmer"
                          required
                          v-model="editedItem"
                          :items="teilnehmer"
                          item-text="name"
                          return-object
                        >
                        </v-autocomplete>
                        <v-autocomplete
                          label="Montag"
                          required
                          auto-select-first
                          v-model="editedItem.Montag"
                          :items="typs"
                          item-text="name"
                          item-value="id"
                        >
                          <template #selection="{ item }">
                            <v-chip v-if="item != ''" :color="getColor(item)">
                              {{ item }}
                            </v-chip>
                          </template>
                        </v-autocomplete>
                        <v-autocomplete
                          label="Dienstag"
                          required
                          v-model="editedItem.Dienstag"
                          :items="typs"
                        >
                          <template #selection="{ item }">
                            <v-chip v-if="item != ''" :color="getColor(item)">
                              {{ item }}
                            </v-chip>
                          </template>
                        </v-autocomplete>
                        <v-autocomplete
                          label="Mittwoch"
                          required
                          auto-select-first
                          v-model="editedItem.Mittwoch"
                          :items="typs"
                        >
                          <template #selection="{ item }">
                            <v-chip v-if="item != ''" :color="getColor(item)">
                              {{ item }}
                            </v-chip>
                          </template>
                        </v-autocomplete>
                        <v-autocomplete
                          label="Donnerstag"
                          required
                          auto-select-first
                          v-model="editedItem.Donnerstag"
                          :items="typs"
                        >
                          <template #selection="{ item }">
                            <v-chip v-if="item != ''" :color="getColor(item)">
                              {{ item }}
                            </v-chip>
                          </template>
                        </v-autocomplete>
                        <v-autocomplete
                          label="Freitag"
                          required
                          auto-select-first
                          v-model="editedItem.Freitag"
                          :items="typs"
                        >
                          <template #selection="{ item }">
                            <v-chip v-if="item != ''" :color="getColor(item)">
                              {{ item }}
                            </v-chip>
                          </template>
                        </v-autocomplete>
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn text @click="speichern">Anlegen</v-btn>
                        <v-btn text @click="close">Close</v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5 , justify-center">
                      Löschen Bestätigen
                    </v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">
                        Schließen
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteSpezialBestellung"
                      >
                        OK
                      </v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card-title>
            </v-row>
          </v-toolbar>
        </template>
        <template v-slot:[`item.Name`]="{ item }">
          {{ item.Name }}
        </template>
        <template v-slot:[`item.Montag`]="{ item }">
          <v-select v-model="item.Montag" :items="typs">
            <template #selection="{ item }">
              <v-chip v-if="item != ''" :color="getColor(item)">
                {{ item }}
              </v-chip>
            </template>
          </v-select>
        </template>
        <template v-slot:[`item.Dienstag`]="{ item }">
          <v-select v-model="item.Dienstag" :items="typs">
            <template #selection="{ item }">
              <v-chip v-if="item != ''" :color="getColor(item)">
                {{ item }}
              </v-chip>
            </template>
          </v-select>
        </template>
        <template v-slot:[`item.Mittwoch`]="{ item }">
          <v-select v-model="item.Mittwoch" :items="typs">
            <template #selection="{ item }">
              <v-chip v-if="item != ''" :color="getColor(item)">
                {{ item }}
              </v-chip>
            </template>
          </v-select>
        </template>
        <template v-slot:[`item.Donnerstag`]="{ item }">
          <v-select v-model="item.Donnerstag" :items="typs">
            <template #selection="{ item }">
              <v-chip v-if="item != ''" :color="getColor(item)">
                {{ item }}
              </v-chip>
            </template>
          </v-select>
        </template>
        <template v-slot:[`item.Freitag`]="{ item }">
          <v-select v-model="item.Freitag" :items="typs">
            <template #selection="{ item }">
              <v-chip v-if="item != ''" :color="getColor(item)">
                {{ item }}
              </v-chip>
            </template>
          </v-select>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-hover v-slot="{ hover }">
            <v-icon
              class="mr-2"
              @click="deleteItem(item)"
              :style="{ color: hover ? 'red' : '' }"
            >
              mdi-delete
            </v-icon>
          </v-hover>
        </template>
      </v-data-table>
    </v-layout>
  </v-container>
</template>

<style scoped>
.card {
  background-color: #b0bec5;
}
</style>

<script>
import store from "@/store/index";
import * as API from "@/services/API";
export default {
  name: "Home-View",

  data() {
    return {
      inputDialog: false,
      dialogDelete: false,
      updated: false,
      inBearbeitung: false,
      wochenBestellungID: null,
      updateManual: false,
      timer: null,
      typs: ["", "Vegan", "Vegetarisch", "Glutenfrei", "Laktosefrei"],
      teilnehmer: {},
      editedIndex: -1,
      defaultItem: {
        Name: " ",
        Montag: " ",
        Dienstag: " ",
        Mittwoch: " ",
        Donnerstag: " ",
        Freitag: " ",
      },
      editedItem: {
        Name: " ",
        Montag: " ",
        Dienstag: " ",
        Mittwoch: " ",
        Donnerstag: " ",
        Freitag: " ",
      },
      normalHeader: [
        { text: "Montag", value: "Montag" },
        { text: "Dienstag", value: "Dienstag" },
        { text: "Mittwoch", value: "Mittwoch" },
        { text: "Donnerstag", value: "Donnerstag" },
        { text: "Freitag", value: "Freitag" },
      ],
      normal: [],
      normalDefault: [
        { Montag: 0, Dienstag: 0, Mittwoch: 0, Donnerstag: 0, Freitag: 0 },
      ],
      spezialBestellung: [],
      spezialBestellungDefault: [],
      ausgewaehlteWoche: null,
      header: [
        { text: "Name", value: "name", width: "15%", sortable: false },
        { text: "Montag", value: "Montag", width: "15%", sortable: false },
        { text: "Dienstag", value: "Dienstag", width: "15%", sortable: false },
        { text: "Mittwoch", value: "Mittwoch", width: "15%", sortable: false },
        {
          text: "Donnerstag",
          value: "Donnerstag",
          width: "15%",
          sortable: false,
        },
        { text: "Freitag", value: "Freitag", width: "15%", sortable: false },
        {
          text: "",
          value: "actions",
          sortable: false,
          align: "end",
        },
      ],
      user: {},
    };
  },

  async beforeMount() {
    this.updateManual = true;
    this.user = Object.assign({}, store.getters["auth/authUser"]);
    this.ausgewaehlteWoche = Object.assign(
      {},
      store.getters["data/naechsteWoche"]
    );
    await this.getData();
    this.updateManual = false;
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
      else if (Essen == "Laktosefrei") return "orange";
      else if (Essen == "Glutenfrei") return "#FBC02D";
      else if (Essen == "") return "white";
    },

    speichern() {
      if (this.editedItem.Name != " ") {
        this.spezialBestellung.push(Object.assign({}, this.editedItem));
        this.editedItem = this.defaultItem;
        this.inputDialog = false;
      }
    },

    close() {
      this.editedItem = this.defaultItem;
      this.inputDialog = false;
      this.dialogDelete = false;
    },

    async getData() {
      await API.apiClient
        .get(
          `/abteilung/${this.user.abteilung_id}/woche/${this.ausgewaehlteWoche.id}`
        )
        .then((response) => {
          console.log(response.status);
          if (response.status == 204) {
            this.normal = this.normalDefault;
            this.spezialBestellung = this.spezialBestellungDefault;
            this.wochenBestellungID = null;
            console.log(response.statusText);
          } else {
            console.log(response.data.message);
            this.normal = response.data.data.normal;
            this.wochenBestellungID = response.data.data.id;
            this.spezialBestellung = response.data.data.spezial_essen;
          }
        });
      API.apiClient
        .get(
          `/abteilungTeilnehmerName/${this.user.abteilung_id}/Bestellung/${this.wochenBestellungID}`
        )
        .then((response) => {
          this.teilnehmer = response.data.data;
          console.log(response.status);
          console.log(response.data.message);
        });
    },

    naechsteWoche() {
      this.timerinterval();
      this.updated = true;
      API.apiClient
        .get(`/woche=${this.ausgewaehlteWoche.id + 1}`)
        .then((response) => {
          this.ausgewaehlteWoche = response.data.data;
          console.log(response.status);
          console.log(response.data.message);
        });
    },

    vorherigeWoche() {
      this.timerinterval();
      this.updated = true;
      API.apiClient
        .get(`/woche=${this.ausgewaehlteWoche.id - 1}`)
        .then((response) => {
          this.ausgewaehlteWoche = response.data.data;
          console.log(response.status);
          console.log(response.data.message);
        });
    },

    timerinterval() {
      this.inBearbeitung = false;
      this.speicherAenderungen();
    },

    async speicherAenderungen() {
      if (!this.updateManual) {
        if (this.inBearbeitung) {
          if (this.timer) {
            clearTimeout(this.timer);
          }
          this.timer = setTimeout(this.timerinterval, 2000);
        } else {
          const tempUebergabe = {};
          tempUebergabe.normal = this.normal;
          tempUebergabe.spezial = this.spezialBestellung;
          tempUebergabe.woche_id = this.ausgewaehlteWoche.id;
          tempUebergabe.abteilung_id = this.user.abteilung_id;
          tempUebergabe.bestellungs_id = this.wochenBestellungID;
          this.inBearbeitung = true;
          await API.apiClient.post(
            `/updateOrCreateWochenBestellung`,
            tempUebergabe
          );
          await API.apiClient
            .get(
              `/abteilungTeilnehmerName/${this.user.abteilung_id}/Bestellung/${this.wochenBestellungID}`
            )
            .then((response) => {
              this.teilnehmer = response.data.data;
              console.log(response.status);
              console.log(response.data.message);
            });
        }
      }
    },

    onFilter(item) {
      return item.name;
    },

    deleteItem(item) {
      this.editedIndex = this.spezialBestellung.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteSpezialBestellung() {
      const tempUebergabe = {};
      tempUebergabe.spezialBestellung = this.editedItem;
      tempUebergabe.bestellungs_id = this.wochenBestellungID;
      await API.apiClient.post(`/deleteSpezialEssen`, tempUebergabe);
      this.editedItem = this.defaultItem;
      this.dialogDelete = false;
      this.updateManual = true;
      this.getData();
    },

    async saveBeforeLeave(next) {
      const tempUebergabe = {};
      tempUebergabe.normal = this.normal;
      tempUebergabe.spezial = this.spezialBestellung;
      tempUebergabe.woche_id = this.ausgewaehlteWoche.id;
      tempUebergabe.abteilung_id = this.user.abteilung_id;
      tempUebergabe.bestellungs_id = this.wochenBestellungID;
      this.inBearbeitung = true;
      await API.apiClient.post(
        `/updateOrCreateWochenBestellung`,
        tempUebergabe
      );
      next();
    },
  },

  beforeRouteLeave: function (to, from, next) {
    console.log("Speichern vor dem Verlassen der Seite");
    this.saveBeforeLeave(next);
  },

  watch: {
    spezialBestellung: {
      deep: true,
      handler() {
        this.speicherAenderungen();
      },
    },
    normal: {
      deep: true,
      handler() {
        this.speicherAenderungen();
      },
    },
  },
};
</script>
