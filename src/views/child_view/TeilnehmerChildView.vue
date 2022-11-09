<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :search="search"
      :items="teilnehmer"
      hide-default-footer
      class="elevation-10"
      sort-by="name"
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
                <v-btn color="blue darken-1" text @click="deleteTeilnehmer">
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
            class="mr-2"
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
    check: false,
    dialog: false,
    dialogDelete: false,
    search: "",
    formTitle: "Teilnehmer bearbeiten",
    headers: [
      { text: "Name", value: "name", sortable: false },
      { text: "Abteilung", value: "abteilung", sortable: false },
      {
        text: "",
        value: "actions",
        sortable: false,
        align: "end",
      },
    ],
    editedIndex: -1,
    defaultItem: {
      name: "",
      abteilung: "",
      id: "",
    },
    editedItem: {
      name: "",
      abteilung: "",
      id: "",
    },
    teilnehmer: [],
    user: {},
  }),

  created() {
    this.user = store.getters["auth/authUser"];
    this.defaultItem.abteilungs_id = this.user.abteilung_id;
    this.editedItem.abteilungs_id = this.user.abteilung_id;
    this.defaultItem.abteilung = this.user.abteilung;
    this.editedItem.abteilung = this.user.abteilung;
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
    save() {
      if (this.editedItem.id == "") {
        this.createTeilnehmer();
      } else {
        this.updateTeilnehmer();
      }
    },
    deleteTeilnehmer() {
      API.apiClient
        .delete(`/deleteTeilnehmer=${this.editedItem.id}`)
        .then((response) => {
          console.log(response.status);
          console.log(response.data.message);
          this.teilnehmer.splice(this.editedIndex, 1);
          this.close();
        })
        .catch((error) => {
          console.log(error);
          this.close();
        });
    },
    createTeilnehmer() {
      API.apiClient
        .post(`/storeTeilnehmer`, this.editedItem)
        .then((response) => {
          console.log(response.status);
          console.log(response.data.message);
          this.editedItem.id = response.data.data.id;
          this.teilnehmer.push(this.editedItem);
          this.close();
        })
        .catch((error) => {
          console.log(error);
          this.close();
        });
    },
    updateTeilnehmer() {
      API.apiClient
        .post(`/updateTeilnehmer`, this.editedItem)
        .then((response) => {
          console.log(response.status);
          console.log(response.data.message);
          Object.assign(this.teilnehmer[this.editedIndex], this.editedItem);
          this.close();
        })
        .catch((error) => {
          console.log(error);
          this.close();
        });
    },
  },
};
</script>
