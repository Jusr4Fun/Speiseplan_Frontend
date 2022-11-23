<template>
  <v-container fluid>
    <v-btn color="primary" @click="zurueck"> Zurück </v-btn>
    <v-card elevation="0" class="justify-center">
      <v-card-title class="justify-center text-h5 font-weight-bold">
        Support Formular
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Email"
                :rules="inputRules"
                v-model="email"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Betreff"
                :rules="inputRules"
                v-model="betreff"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                label="Details"
                outlined
                :rules="inputRules"
                v-model="nachricht"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
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
export default {
  name: "SupportComponent",

  data() {
    return {
      email: "",
      betreff: "",
      nachricht: "",
      inputRules: [(v) => !!v || "Benötigt."],
    };
  },

  methods: {
    senden() {
      console.log(this.email);
      console.log(this.betreff);
      console.log(this.nachricht);
    },

    zurueck() {
      this.$router.back();
    },
  },
};
</script>
