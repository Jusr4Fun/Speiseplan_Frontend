<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :search="search"
      :items="teilnehmer"
      hide-default-footer
      sort-by="calories"
      class="elevation-10"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Teilnehmer</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Neu
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.abteilung"
                        disabled
                        label="Abteilung"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="secondary" text @click="close"> Schließen </v-btn>
                <v-btn color="secondary" text @click="save"> Speichern </v-btn>
              </v-card-actions>
            </v-card>
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
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                  OK
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-hover v-slot="{ hover }">
          <v-icon
            class="mr-2"
            @click="editItem(item)"
            :style="{ color: hover ? '#96c21c' : '' }"
          >
            mdi-pencil
          </v-icon>
        </v-hover>
        <v-hover v-slot="{ hover }">
          <v-icon
            @click="deleteItem(item)"
            :style="{ color: hover ? 'red' : '' }"
          >
            mdi-delete
          </v-icon>
        </v-hover>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import * as API from "@/services/API";
import store from "@/store/index";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: "",
    formTitle: "Teilnehmer bearbeiten",
    items: [
      {
        name: "",
        abteilung: "",
      },
      {
        name: "",
        abteilung: "",
      },
      {
        name: "",
        abteilung: "",
      },
    ],
    headers: [
      { text: "Name", value: "name" },
      { text: "Abteilung", value: "abteilung" },
      { text: "", value: "actions", sortable: false },
    ],
    defaultItem: {
      name: "",
      abteilung: "",
    },
    editedItem: {
      name: "",
      abteilung: "",
    },
    teilnehmer: [],
    user: {},
  }),

  created() {
    this.user = store.getters["auth/authUser"];
  },

  beforeMount() {
    API.apiClient
      .get(`/abteilungTeilnehmer=${this.user.abteilung_id}`)
      .then((response) => {
        this.teilnehmer = response.data.data;
        console.log(response.status);
        console.log(response.data.message);
      });
  },

  methods: {
    close() {
      this.dialog = false;
      this.dialogDelete = false;
      this.editedItem = Object.assign({}, this.defaultItem);
    },
    editItem(item) {
      this.editedIndex = this.teilnehmer.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.teilnehmer.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    save() {},
    deleteItemConfirm() {},
  },
};
</script>