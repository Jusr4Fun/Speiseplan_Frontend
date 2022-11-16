<template>
  <v-container fill-height fluid>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="secondary">
            <v-toolbar-title>Passwort Zurücksetzen</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                name="Passwort zurücksetzen"
                label="Login E-Mail"
                type="text"
                v-model="email"
                prepend-icon="mdi-account"
              >
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex align-center">
            <v-btn class="ma-4" color="secondary" :to="'/' + 'login'">
              Zurück
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn class="ma-4" color="secondary" @click="resetPasswort" x-large
              >Passwort Zurücksetzen</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AuthService from "@/services/AuthService";

export default {
  name: "PasswordReset",
  data() {
    return {
      check: false,
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      email: "",
      password: "",
      rules: {
        required: (value) => !!value || "Benötigt.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
    };
  },
  methods: {
    resetPasswort() {
      const payload = {
        email: this.email,
      };
      AuthService.forgotPassword(payload)
        .then((response) => {
          console.log(response);
          console.log("Reset password email sent.");
          this.$router.push("/login");
        })
        .catch();
    },
  },
};
</script>
