<template>
  <v-container>
    <v-row>
      <v-layout child-flex>
        <v-data-table
          :headers="headers"
          :items="users"
          disable-pagination
          hide-default-footer
          sort-by="abteilung"
          class="elevation-2 ma-4"
          loading-text="Lädt... Bitte warten"
          no-data-text="noch keine Daten Eingetragen"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Nutzer-Daten</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px" persistent>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    @click="newUser"
                  >
                    Neuen Nutzer erstellen
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">
                      {{ formTitle }}
                    </span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field v-model="editedItem.name" label="Name">
                          </v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12">
                          <v-autocomplete
                            :items="abteilungen"
                            v-model="editedItem.abteilung_id"
                            label="Abteilung"
                          >
                          </v-autocomplete>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12">
                          <v-autocomplete
                            :items="rollen"
                            v-model="editedItem.role_id"
                            label="Rolle"
                          >
                          </v-autocomplete>
                        </v-col>
                      </v-row>
                      <v-row v-if="password_enable == true">
                        <v-col cols="12">
                          <v-text-field
                            :type="'password'"
                            v-model="editedItem.password"
                            label="Passwort"
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.email"
                            label="E-Mail"
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Abbrechen
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Speichern
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog
                v-model="dialogEditPasswort"
                max-width="800px"
                persistent
              >
                <v-card>
                  <v-card-title class="text-h5 justify-center">
                    Nutzer Passwort ändern
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.password"
                            label="Passwort"
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="closeEditPasswort"
                    >
                      Abbrechen
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="savePasswort">
                      Speichern
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="800px" persistent>
                <v-card>
                  <v-card-title class="text-h5 justify-center">
                    Sind sie sich sicher, dass sie den Nutzer entfernen wollen?
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">
                      Abbrechen
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="deleteItemConfirm"
                    >
                      JA
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
                @click="editPasswort(item)"
                :style="{ color: hover ? '#96c21c' : '' }"
              >
                mdi-form-textbox-password
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
      </v-layout>
    </v-row>
  </v-container>
</template>

<script>
import * as API from "@/services/API";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    dialogEditPasswort: false,
    password_enable: true,
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Rolle", value: "role" },
      { text: "Abteilung", value: "abteilung" },
      { text: "E-Mail", value: "email", sortable: false },
      { text: "", align: "end", value: "actions", sortable: false },
    ],
    users: [],
    abteilungen: [],
    rollen: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      abteilung_id: "",
      role_id: "",
      password: "",
      email: "",
    },
    defaultItem: {
      id: 0,
      name: "",
      abteilung_id: "",
      role_id: "",
      password: "",
      email: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Neuen Nutzer erstellen"
        : "Vorhandenen Nutzer editieren";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  mounted() {
    API.apiClient
      .get(`/users`)
      .then((response) => {
        this.users = response.data.data;
        //console.log(response.status);
        //console.log(response.data.message);
      })
      .catch(() => {});
    API.apiClient
      .get(`/abteilungen`)
      .then((response) => {
        this.abteilungen = response.data.data;
        //console.log(response.status);
        //console.log(response.data.message);
      })
      .catch(() => {});
    API.apiClient
      .get(`/RolleRoleID`)
      .then((response) => {
        this.rollen = response.data.data;
        //console.log(response.status);
        //console.log(response.data.message);
      })
      .catch(() => {});
  },

  methods: {
    createUser() {
      for (const abteilung of this.abteilungen) {
        if (this.editedItem.abteilung_id == abteilung.text) {
          this.editedItem.abteilung_id = abteilung.id;
          this.editedItem.abteilung = abteilung.text;
        }
      }
      for (const rolle of this.rollen) {
        if (this.editedItem.role_id == rolle.text) {
          this.editedItem.role_id = rolle.id;
          this.editedItem.role = rolle.text;
        }
      }
      API.apiClient
        .post(`/storeUser`, this.editedItem)
        .then((response) => {
          //console.log(response.status);
          //console.log(response.data.message);
          this.editedItem.id = response.data.data.id;
          this.users.push(this.editedItem);
          this.close();
        })
        .catch(() => {
          this.close();
        });
    },

    deleteUser(id) {
      API.apiClient
        .delete(`/deleteUser/${id}`)
        .then(() => {
          //console.log(response.status);
          //console.log(response.data.message);
          this.users.splice(this.editedIndex, 1);
          this.closeDelete();
        })
        .catch(() => {
          this.closeDelete();
        });
    },

    updatePasswort() {
      API.apiClient
        .post(`/updatePasswort`, this.editedItem)
        .then(() => {
          //console.log(response.status);
          //console.log(response.data.message);
          this.closeEditPasswort();
        })
        .catch(() => {
          this.closeEditPasswort();
        });
    },

    updateUser() {
      for (const rolle of this.rollen) {
        if (this.editedItem.role_id == rolle.text) {
          this.editedItem.role_id = rolle.id;
          this.editedItem.role = rolle.text;
        }
      }
      for (const abteilung of this.abteilungen) {
        if (this.editedItem.abteilung_id == abteilung.text) {
          this.editedItem.abteilung_id = abteilung.id;
          this.editedItem.abteilung = abteilung.text;
        }
      }
      API.apiClient
        .post(`/updateUser`, this.editedItem)
        .then(() => {
          //console.log(response.status);
          //console.log(response.data.message);
          Object.assign(this.users[this.editedIndex], this.editedItem);
          this.close();
        })
        .catch(() => {
          this.close();
        });
    },

    newUser() {
      this.password_enable = true;
    },

    editItem(item) {
      if (this.password_enable) {
        this.password_enable = false;
      }
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteUser(this.editedItem.id);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.password_enable) {
        this.createUser();
      } else {
        this.updateUser();
      }
    },

    editPasswort(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogEditPasswort = true;
    },

    closeEditPasswort() {
      this.dialogEditPasswort = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    savePasswort() {
      this.updatePasswort();
    },
  },
};
</script>
