<template>
  <v-container fluid id="print">
    <div>
      {{ this.$route.params.woche }}
    </div>
    <v-row>
      <v-col><div>Anzahl Bestellungen</div></v-col>
    </v-row>
    <v-card class="elevation-0">
      <v-data-table
        no-gutters
        dense
        :items="bestellungGesamt"
        :headers="gesamtHeader"
        no-data-text="noch keine Daten Eingetragen"
        hide-default-footer
      >
      </v-data-table>
    </v-card>
    <v-row>
      <v-col><div>Spezial Bestellungen</div> </v-col>
    </v-row>
    <v-row></v-row>
    <v-layout child-flex>
      <v-data-table
        no-gutters
        dense
        :headers="spezialheader"
        :items="spezialBestellungen"
        no-data-text="noch keine Daten Eingetragen"
        hide-default-footer
        sort-by="Name"
      >
      </v-data-table>
    </v-layout>
  </v-container>
</template>

<script>
import store from "@/store/index";
export default {
  name: "Print-GesamtBestellungView",

  data() {
    return {
      ausgewaehlteWoche: {},
      spezialBestellungen: [],
      bestellungGesamt: [],
      spezialheader: [
        { text: "Name", value: "Name", sortable: false, divider: true },
        {
          text: "Montag",
          value: "Montag",
          align: "center",
          sortable: false,
          divider: true,
        },
        {
          text: "Dienstag",
          value: "Dienstag",
          align: "center",
          sortable: false,
          divider: true,
        },
        {
          text: "Mittwoch",
          value: "Mittwoch",
          align: "center",
          sortable: false,
          divider: true,
        },
        {
          text: "Donnerstag",
          value: "Donnerstag",
          align: "center",
          sortable: false,
          divider: true,
        },
        {
          text: "Freitag",
          value: "Freitag",
          align: "center",
          sortable: false,
          divider: true,
        },
      ],
      gesamtHeader: [
        { text: "Name", value: "Name", sortable: false, divider: true },
        {
          text: "Montag",
          value: "Montag",
          align: "center",
          sortable: false,
          divider: true,
        },
        {
          text: "Dienstag",
          value: "Dienstag",
          align: "center",
          sortable: false,
          divider: true,
        },
        {
          text: "Mittwoch",
          value: "Mittwoch",
          align: "center",
          sortable: false,
          divider: true,
        },
        {
          text: "Donnerstag",
          value: "Donnerstag",
          align: "center",
          sortable: false,
          divider: true,
        },
        { text: "Freitag", value: "Freitag", align: "center", divider: true },
        {
          text: "Gesamt",
          value: "Gesamt",
          align: "center",
          sortable: false,
          divider: true,
        },
      ],
    };
  },

  async beforeMount() {
    await this.getData();
  },

  async mounted() {
    console.log(this.$route);
    this.print();
  },

  methods: {
    async getData() {
      var temp = Object.assign(
        {},
        await store.getters["data/gesamtBestellungenaktWoche"]
      );
      this.bestellungGesamt = temp.gesamtBestellungen;
      this.spezialBestellungen = temp.teilnehmer;
    },

    async print() {
      await this.$nextTick();
      window.print();
      this.$router.push({ path: "/GesamtBestellungen" });
    },
  },
};
</script>
