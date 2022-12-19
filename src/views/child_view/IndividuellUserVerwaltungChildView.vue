<template>
  <v-container fill-heigth fluid>
    <v-row class="justify-center">
      <v-alert
        transition="fab-transition"
        v-model="succesalert"
        color="success"
        dismissible
        elevation="2"
        type="success"
      >
        Änderung Gespeichert
      </v-alert>
      <v-alert
        transition="fab-transition"
        v-model="erroralert"
        color="red"
        dismissible
        elevation="2"
        type="error"
      >
        Fehler! Eingabe Überprüfen
      </v-alert>
    </v-row>
    <v-row class="text-h5 justify-center">
      <v-card width="600" class="ma-4" elevation="2">
        <v-card-title class="text-h5 justify-center">
          {{ user.name }}
        </v-card-title>
        <v-card-text>
          <v-row class="mx-2">
            <v-col cols="12">
              <v-text-field v-model="editedItem.name" label="Name">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="mx-2">
            <v-col cols="12">
              <v-text-field
                disabled
                v-model="editedItem.abteilung"
                label="Abteilung"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="mx-2">
            <v-col cols="12">
              <v-text-field
                :type="'password'"
                v-model="password"
                label="Passwort"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="mx-2">
            <v-col cols="12">
              <v-text-field v-model="editedItem.email" label="E-Mail">
              </v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-row>
    <v-row class="d-flex justify-center pa-md-6">
      <v-btn
        class="mx-4 pa-md-2"
        dark
        color="buttonGreen"
        style="vertical-align: middle"
        @click="save"
      >
        Änderungen Speichern
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import * as API from "@/services/API";
import store from "@/store/index";

export default {
  data: () => ({
    succesalert: false,
    erroralert: false,
    user: {},
    password: null,
    editedItem: {
      id: "",
      name: "",
      abteilung: "",
      abteilung_id: "",
      role_id: "",
      email: "",
    },
  }),

  mounted() {
    this.user = store.getters["auth/authUser"];
    this.editedItem = this.user;
  },

  methods: {
    save() {
      if (this.password == null) {
        this.updateUser();
      } else {
        this.editedItem["password"] = this.password;
        this.updateUser();
      }
    },

    updateUser() {
      API.apiClient
        .post(`/updateUser`, this.editedItem)
        .then(() => {
          //console.log(response.status);
          //console.log(response.data.message);
          this.checkStatus(true);
        })
        .catch(() => {
          this.checkStatus(false);
        });
    },

    checkStatus(teststatus) {
      if (teststatus) {
        this.succesalert = true;
      } else {
        this.erroralert = true;
      }
    },
  },
};
</script>
