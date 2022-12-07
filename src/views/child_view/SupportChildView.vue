<template>
  <v-container fluid>
    <v-btn color="primary mb-4" @click="zurueck"> Zurück </v-btn>
    <v-card elevation="0" class="justify-center">
      <v-card-title class="justify-center text-h5 font-weight-bold">
        Support Formular
      </v-card-title>
      <v-card-text>
        <v-row class="mx-2">
          <v-text-field label="Email" :rules="inputRules" v-model="email">
          </v-text-field>
        </v-row>
        <v-row class="mx-2">
          <v-text-field label="Betreff" :rules="inputRules" v-model="betreff">
          </v-text-field>
        </v-row>
        <v-row class="mx-2">
          <v-textarea
            label="Details"
            outlined
            :rules="inputRules"
            v-model="nachricht"
          >
          </v-textarea>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="senden"> Senden </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import * as API from "@/services/API";
import * as Auth from "@/services/AuthService";

export default {
  name: "SupportComponent",

  data() {
    return {
      email: "",
      betreff: "",
      nachricht: "",
      user: {},
      inputRules: [(v) => !!v || "Benötigt."],
    };
  },

  mounted() {
    this.user = Object.assign({}, this.$store.getters["auth/authUser"]);
    this.email = this.user.email;
  },

  methods: {
    async senden() {
      await Auth.authClient.get("/sanctum/csrf-cookie");
      var temp = {};
      temp.details = this.nachricht;
      temp.betreff = this.betreff;
      temp.email = this.email;
      temp.user = this.user;
      API.apiClient
        .post(`/SupportMail`, temp, { withCredentials: true })
        .then(console.log("Support-Nachricht versendet"));
    },

    zurueck() {
      this.$router.back();
    },
  },
};
</script>
