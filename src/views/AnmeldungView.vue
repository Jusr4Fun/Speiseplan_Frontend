<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <v-footer padless="padless">
      <v-card flat tile width="100%" class="primary text-center">
        <v-card-text>
          <v-tooltip bottom color="secondary">
            <template v-slot:activator="{ on }">
              <v-btn class="mx-4" icon v-on="on" :to="'/' + 'Ueber'">
                <v-icon size="24px"> mdi-information </v-icon>
              </v-btn>
            </template>
            <span>Impressum</span>
          </v-tooltip>
          <v-tooltip bottom color="secondary">
            <template v-slot:activator="{ on }">
              <v-btn class="mx-4" icon v-on="on" :to="'/' + 'Support'">
                <v-icon size="24px"> mdi-email </v-icon>
              </v-btn>
            </template>
            <span>Support</span>
          </v-tooltip>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>CJD</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "AnmeldungView",
};
</script>
