<template>
  <div class="about">
    <v-row class="pt-13">
      <v-col order="1" class="justify-space-between pl-16">
        <v-card
          class="indigo darken-4 white--text text-center rounded-xl"
          elevation="2"
          :to="'/' + 'Bestellungen'"
          width="250"
          height="250"
          ><v-icon size="200" color="grey darken-1">mdi-calendar-today</v-icon
          >Bestellung aktuelle Woche
        </v-card>
      </v-col>
      <v-col order="2" class="justify-space-between">
        <v-card
          class="orange accent-4 white--text text-center rounded-xl"
          elevation="2"
          :to="'/' + 'Bestellungen'"
          width="250"
          height="250"
          ><v-icon size="200" color="grey darken-3">mdi-calendar-week</v-icon
          >Bestellung bestimmte Woche</v-card
        >
      </v-col>
      <v-col order="3" class="justify-space-between">
        <v-card
          class="red accent-4 white--text text-center rounded-xl"
          elevation="2"
          :to="'/' + 'Teilnehmer'"
          width="250"
          height="250"
          ><v-icon size="200" color="grey darken-3">mdi-account-plus</v-icon
          >Teilnehmer hinzufügen</v-card
        >
      </v-col>
      <v-col order="4">
        <v-card
          class="deep-purple accent-4 white--text text-center rounded-xl"
          elevation="2"
          :to="'/' + 'Bestellungen'"
          width="250"
          height="250"
          ><v-icon size="200" color="grey darken-1">mdi-account-minus</v-icon
          >Teilnehmer entfernen</v-card
        >
      </v-col>
      <v-col order="5" class="mb-16 pb-16">
        <v-card
          class="green accent-4 white--text text-center rounded-xl"
          elevation="2"
          :to="'/' + 'GesamtBestellungen'"
          width="250"
          height="250"
          ><v-icon size="200" color="grey darken-3"
            >mdi-clipboard-text-outline</v-icon
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
          class="text-center rounded-xl"
          elevation="0"
          :to="'/' + 'Bestellungen'"
          width="150"
          height="150"
          ><v-icon size="130" color="grey darken-3">mdi-cog</v-icon
          >Benutzerverwaltung</v-card
        >
      </v-col>
    </v-row>
  </div>
</template>
