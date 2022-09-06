<template>
  <div class="about">
    <v-row class="pt-13">
      <v-col order="1" class="pl-13">
        <v-card
          class="indigo darken-4 white--text text-center"
          elevation="2"
          :to="'/' + 'Bestellungen'"
          width="250"
          height="250"
          rounded
          >Bestellung aktuelle Woche
        </v-card>
      </v-col>
      <v-col order="2">
        <v-card
          class="orange accent-4 white--text text-center"
          elevation="2"
          :to="'/' + 'Bestellungen'"
          width="250"
          height="250"
          >Bestellung bestimmte Woche</v-card
        >
      </v-col>
      <v-col order="3">
        <v-card
          class="red accent-4 white--text text-center"
          elevation="2"
          :to="'/' + 'Teilnehmer'"
          width="250"
          height="250"
          >Teilnehmer hinzufügen</v-card
        >
      </v-col>
      <v-col order="4">
        <v-card
          class="deep-purple accent-4 white--text text-center"
          elevation="2"
          :to="'/' + 'Teilnehmer'"
          width="250"
          height="250"
          >Teilnehmer entfernen</v-card
        >
      </v-col>
      <v-col order="5" class="mb-16 pb-16">
        <v-card
          class="green accent-4 white--text text-center"
          elevation="2"
          :to="'/' + 'GesamtBestellungen'"
          width="250"
          height="250"
          >Gesammte Bestellungen anzeigen</v-card
        >
      </v-col>
    </v-row>
    <v-row class=".d-none .d-xl-flex .d-lg-flex">
      <v-col>
        <v-card width="0" height="100"></v-card>
      </v-col>
    </v-row>
    <v-row class="float-right">
      <v-col class="mr-13 mt-16 pt-16">
        <v-card
          class="brown darken-4 white--text text-center"
          elevation="2"
          :to="'/' + 'Benutzer'"
          width="150"
          height="150"
          >Benutzerverwaltung</v-card
        >
      </v-col>
    </v-row>
  </div>
</template>
