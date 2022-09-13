<template>
  <v-container>
    <v-row class="text-h5 justify-center">
      <v-card width="600" class="ma-4" elevation="10">
        <v-card-title class="text-h5 justify-center">
          {{ user.name }}
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.name"
                  label="Name"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  disabled
                  v-model="editedItem.abteilung"
                  label="Abteilung"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  :type="'password'"
                  v-model="editedItem.password"
                  label="Passwort"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.email"
                  label="E-Mail"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-row>
    <v-row class="d-flex justify-center pa-md-6"
      ><v-btn
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
export default {
  data: () => ({
    user: { name: "Kevin Barth", abteilung: "Fisi" },
    editedItem: {
      id: "",
      name: "",
      abteilung: "",
      password: "",
      email: "",
    },
  }),

  methods: {
    save() {},
  },
};
</script>
