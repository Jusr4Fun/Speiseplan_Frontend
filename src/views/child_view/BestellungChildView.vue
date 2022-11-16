<template>
  <v-container fluid>
    <v-card-title class="d-flex justify-center">
      <v-btn icon @click="vorherigeWoche">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <div>{{ ausgewaehlteWoche.name }}</div>
      <v-btn icon @click="naechsteWoche">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-card-title>
    <v-layout child-flex>
      <v-data-table
        class="ma-2 elevation-1"
        :ripple="false"
        no-gutters
        :items="normal"
        :headers="normalHeader"
        hide-default-footer
        disable-sort
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title
              class="d-flex align-center text-h5 font-weight-bold ma-2"
            >
              Normale Bestellungen
            </v-toolbar-title>
          </v-toolbar>
        </template>
        <template v-slot:[`item.Montag`]="{ item }">
          <v-text-field
            class="justify-center"
            min="0"
            type="number"
            v-model="item.Montag"
          >
          </v-text-field>
        </template>
        <template v-slot:[`item.Dienstag`]="{ item }"
          ><v-text-field
            class="justify-center"
            min="0"
            type="number"
            v-model="item.Dienstag"
          ></v-text-field>
        </template>
        <template v-slot:[`item.Mittwoch`]="{ item }"
          ><v-text-field
            class="justify-center"
            min="0"
            type="number"
            v-model="item.Mittwoch"
          ></v-text-field>
        </template>
        <template v-slot:[`item.Donnerstag`]="{ item }"
          ><v-text-field
            class="justify-center"
            min="0"
            type="number"
            v-model="item.Donnerstag"
          ></v-text-field>
        </template>
        <template v-slot:[`item.Freitag`]="{ item }"
          ><v-text-field
            class="justify-center"
            min="0"
            type="number"
            v-model="item.Freitag"
          ></v-text-field>
        </template>
      </v-data-table>
    </v-layout>
    <v-layout child-flex>
      <v-data-table
        ref="specialBestellungenTabelle"
        :ripple="false"
        no-gutters
        :headers="header"
        :items="spezialBestellung"
        class="elevation-1 ma-2"
        :loading="loadingSpecial"
        loading-text="Laden... Bitte Warten"
        no-data-text="noch keine Daten Eingetragen"
        hide-default-footer
        mobile-breakpoint="875"
        sort-by="Name"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title
              class="d-flex align-center text-h5 font-weight-bold ma-2"
              >Spezial Bestellungen</v-toolbar-title
            ></v-toolbar
          ></template
        >
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
          <template v-slot-model="dialog">
            <v-card>
              <v-toolbar color="primary" dark
                >Neue Spezial Bestellung</v-toolbar
              >
              <v-card-text>
                <v-autocomplete
                  label="Teilnehmer"
                  required
                  v-model="editedItem"
                  :rules="inputRules"
                  :items="teilnehmer"
                  item-text="name"
                  return-object
                ></v-autocomplete>
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
import store from "@/store/index";
import * as API from "@/services/API";
export default {
  name: "Home-View",

  data() {
    return {
      inputDialog: false,
      updated: false,
      loadingSpecial: true,
      wochenBestellungID: null,
      typs: ["", "Vegan", "Vegetarisch", "Glutenfrei", "Laktosefrei"],
      teilnehmer: {},
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
      inputRules: [(v) => !!v || "Schreib was rein"],
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
      ],
      user: {},
    };
  },
  async beforeMount() {
    this.user = Object.assign({}, store.getters["auth/authUser"]);
    this.ausgewaehlteWoche = Object.assign(
      {},
      store.getters["data/naechsteWoche"]
    );
    await this.getData();
  },
  mounted() {
    this.fillSpecialBestellung();
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
      console.log(this.editedItem);
      this.spezialBestellung.push(Object.assign({}, this.editedItem));
      this.editedItem = this.defaultItem;
      this.inputDialog = false;
    },
    close() {
      this.editedItem = this.defaultItem;
      this.inputDialog = false;
    },
    fillSpecialBestellung() {
      this.loadingSpecial = false;
    },

    getData() {
      API.apiClient
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
            console.log(response.data.data);
            this.normal = response.data.data.normal;
            this.wochenBestellungID = response.data.data.id;
            this.spezialBestellung = response.data.data.spezial_essen;
          }
        });
      API.apiClient
        .get(`/abteilungTeilnehmerName=${this.user.abteilung_id}`)
        .then((response) => {
          console.log(response.data.data);
          this.teilnehmer = response.data.data;
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
        });
    },

    speicherAenderungen() {
      var tempUebergabe = {};
      tempUebergabe.normal = this.normal;
      tempUebergabe.spezial = this.spezialBestellung;
      tempUebergabe.woche_id = this.ausgewaehlteWoche.id;
      tempUebergabe.abteilung_id = this.user.abteilung_id;
      tempUebergabe.bestellungs_id = this.wochenBestellungID;
      API.apiClient.post(`/updateOrCreateWochenBestellung`, tempUebergabe);
    },

    onFilter(item) {
      console.log(item);
      return item.name;
    },
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
