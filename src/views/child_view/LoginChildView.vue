<template>
  <v-container fill-height fluid>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12" v-on:keyup.enter="login">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                name="login"
                label="Login E-Mail"
                type="text"
                v-model="email"
                :rules="[rules.required]"
                prepend-icon="mdi-account"
              >
              </v-text-field>
              <v-text-field
                id="password"
                prepend-icon="mdi-lock"
                name="password"
                label="Passwort"
                v-model="password"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
              ></v-text-field>
              <v-alert
                transition="fab-transition"
                v-model="check"
                color="red"
                class="mt-4"
                dismissible
                elevation="10"
                type="error"
                >Fehler! Eingabe Überprüfen</v-alert
              >
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex align-center">
            <v-btn class="ma-4" color="primary" :to="'/' + 'PasswortReset'"
              >Passwort Zurücksetzen</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn class="ma-4" color="primary" @click="login" x-large
              >Login</v-btn
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
  name: "LoginDialog",
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
    async login() {
      const payload = {
        email: this.email,
        password: this.password,
      };
      this.error = null;
      try {
        await AuthService.login(payload);
        var authUser = await this.$store.dispatch("auth/getAuthUser");
        console.log(authUser);
        if (authUser) {
          this.check = false;
          this.$router.push("/dashboard");
        } else {
          const error = Error(
            "Unable to fetch user after login, check your API settings."
          );
          error.name = "Fetch User";
          throw error;
        }
      } catch (error) {
        this.check = true;
        console.log(error);
      }
    },
    /* login() {
      const payload = {
        email: this.email,
        password: this.password,
      };
      AuthService.login(payload)
        .then(() => this.$router.push("/dashboard"))
        .catch((error) => console.log(error.data));
    }, */
  },
};
</script>
