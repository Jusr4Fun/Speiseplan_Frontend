<template>
  <v-container fluid>
    <v-btn color="primary" @click="zurueck"> Zurück </v-btn>
    <v-row class="justify-center">
      <v-card class="ma-8" dense max-width="600" width="300">
        <v-card-title class="justify-center">Impressum</v-card-title>
        <v-card-text class="text-center">
          CJD Kirchheim unter Teck <br />
          Standort Hohenreissach <br />
          Abteilung Fachinformatiker <br />
          Alte Plochinger Steige 158 <br />
          72320 Kirchheim unter Teck
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "UeberView",
  methods: {
    zurueck() {
      this.$router.back();
    },
  },
};
</script>
