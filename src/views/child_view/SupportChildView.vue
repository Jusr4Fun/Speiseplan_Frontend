<template>
  <v-card elevation="0" class="justify-center">
    <v-card-title class="justify-center text-h5 font-weight-bold">
      Support Formular
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Email" :rules="inputRules"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Betreff" :rules="inputRules"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              label="Details"
              outlined
              :rules="inputRules"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="dialog = false"> Senden </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "SupportComponent",

  data() {
    return {
      inputRules: [(v) => !!v || "Benötigt"],
    };
  },
};
</script>
