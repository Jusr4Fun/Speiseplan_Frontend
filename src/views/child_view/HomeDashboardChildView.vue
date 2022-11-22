<template>
  <v-container class="fill-height" fluid>
    <v-row class="flex-grow-0 dense" justify="start" align-self="start" dense>
      <v-col v-if="isNutzer">
        <v-card
          class="indigo darken-4 fill-height white--text text-center rounded-xl0"
          elevation="2"
          :to="'/' + 'Bestellungen'"
          ><v-icon size="75" color="grey darken-1">mdi-calendar-today</v-icon
          ><v-card-text class="white--text"
            >Bestellung nächste Woche</v-card-text
          >
        </v-card>
      </v-col>
      <v-col v-if="isNutzer">
        <v-card
          class="orange accent-4 fill-height white--text text-center rounded-xl0"
          elevation="2"
          :to="'/' + 'Teilnehmer'"
          ><v-icon size="75" color="grey darken-3">mdi-account-group</v-icon
          ><v-card-text class="white--text">Teilnehmer</v-card-text></v-card
        >
      </v-col>
      <v-col>
        <v-card
          class="red accent-4 fill-height white--text text-center rounded-xl0"
          elevation="2"
          ><v-icon size="75" color="grey darken-3">mdi-account-plus</v-icon
          ><v-card-text class="white--text">
            {{ ausgewaehlteWoche.name }}</v-card-text
          ></v-card
        >
      </v-col>
      <v-col v-if="isNutzer">
        <v-card
          class="deep-purple fill-height accent-4 white--text text-center rounded-xl0"
          elevation="2"
          :to="'/' + 'Teilnehmer'"
          ><v-icon size="75" color="grey darken-1">mdi-account-plus</v-icon>
          <v-card-text class="white--text"
            >Teilnehmer hinzufügen</v-card-text
          ></v-card
        >
      </v-col>
      <v-col v-if="isKoch">
        <v-card
          class="green accent-4 fill-height white--text text-center rounded-x10"
          elevation="2"
          :to="'/' + 'GesamtBestellungen'"
        >
          <v-icon size="75" color="grey darken-3">
            mdi-clipboard-text-outline
          </v-icon>
          <v-card-text class="white--text">
            Gesammte Bestellungen anzeigen
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="isKoch">
        <v-card
          class="red accent-4 fill-height white--text text-center rounded-xl0"
          elevation="2"
          :to="'/' + 'Teilnehmer'"
          ><v-icon size="75" color="grey darken-3">mdi-calendar-plus</v-icon
          ><v-card-text class="white--text"
            >Wochenplan einstellen</v-card-text
          ></v-card
        >
      </v-col>
      <v-col>
        <v-card
          class="red accent-4 fill-height white--text text-center rounded-xl0"
          elevation="2"
          :to="'/' + 'Support'"
          ><v-icon size="75" color="grey darken-3">mdi-face-agent</v-icon
          ><v-card-text class="white--text">Support</v-card-text></v-card
        >
      </v-col>
    </v-row>
    <v-row justify="start" dense>
      <v-col>
        <v-card
          class="text-center green fill-height accent-4 rounded-x10"
          elevation="0"
          :to="'/' + 'Benutzer'"
          ><v-icon size="130" color="grey darken-3">mdi-cog</v-icon
          >Benutzerverwaltung</v-card
        >
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.container.fill-height {
  flex-direction: column;
  align-items: initial;
}

.container.fill-height > .row {
  flex: 1 1 auto;
}
</style>

<script>
import roleCheck from "@/router/roleCheck";
import Nutzer from "@/middleware/nutzer";
import Koch from "@/middleware/koch";
import store from "@/store/index";
export default {
  name: "Dashboard-View",
  data() {
    return {
      isKoch: false,
      isNutzer: false,
      ausgewaehlteWoche: {},
    };
  },

  beforeMount() {
    this.ausgewaehlteWoche = Object.assign(
      {},
      store.getters["data/naechsteWoche"]
    );
  },

  created() {
    this.isKoch = this.istKoch();
    this.isNutzer = this.istNutzer();
  },

  methods: {
    istKoch() {
      return roleCheck(store, [Koch]);
    },
    istNutzer() {
      return roleCheck(store, [Nutzer]);
    },
  },
};
</script>
