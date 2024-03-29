<template>
  <v-app>
    <v-navigation-drawer
      expand-on-hover
      mini-variant
      app
      permanent
      color="secondary"
    >
      <v-list-item class="px-2">
        <v-list-item-avatar color="white">
          <v-icon> mdi-food-fork-drink </v-icon>
        </v-list-item-avatar>
        <v-list-item-title>Speiseplan</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item-group active-class="bg-active">
          <v-list-item
            v-for="item in items"
            :key="item.name"
            :to="item.path"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app fixed color="primary" elevate-on-scroll class="d-print-none">
      <v-toolbar-title class="pa-md-4 white--text">
        {{ $route.meta.title || "Default title" }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="show == false" :to="'/' + 'login'" color="secondary">
        Anmelden
      </v-btn>
      <v-menu
        bottom
        min-width="200px"
        rounded
        offset-y
        class="ma-2"
        v-if="show == true"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            fab
            max-height="44"
            max-width="44"
            v-on="on"
            icon
            @click="usercard = !usercard"
            class="ma-2"
          >
            <v-avatar color="secondary text-h5 text-center" size="44">
              {{ user.initials }}
            </v-avatar>
          </v-btn>
        </template>
        <v-expand-transition>
          <v-card v-model="usercard">
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <v-avatar color="secondary pa-md-6 text-h5 text-center">
                  {{ user.initials }}
                </v-avatar>
                <h3 class="pa-md-2">{{ user.name }}</h3>
                <p class="text-caption mt-1">
                  {{ user.email }}
                </p>
                <v-divider class="my-3"></v-divider>
                <v-btn depressed rounded text :to="'/Benutzer'">
                  Benutzerverwaltung
                </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn depressed rounded @click="logout"> Abmelden </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-expand-transition>
      </v-menu>
    </v-app-bar>
    <v-main v-if="loaded">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Admin from "../middleware/admin";
import store from "@/store/index";

export default {
  name: "MainApp",

  data: () => ({
    loaded: false,
    show: true,
    usercard: null,
    expand: false,
    user: {
      email: "",
      emailVerified: "",
      id: 0,
      name: "",
      initials: "",
    },
    defaultUser: {
      email: "",
      emailVerified: "",
      id: 0,
      name: "",
      initials: "",
    },
    items: [],
  }),

  async beforeMount() {
    if (store.getters["auth/loggedIn"]) {
      this.loaded = await this.getWochen();
    } else {
      this.loaded = true;
    }
    this.$router.options.routes.forEach((route) => {
      if (store.getters["auth/authUser"]) {
        if (route.name == "Main") {
          route.children.forEach((childroute) => {
            if (
              typeof childroute.meta.middleware == "undefined" ||
              Admin() == store.getters["auth/role"]
            ) {
              this.items.push({
                name: childroute.meta.title,
                path: childroute.path,
                icon: childroute.meta.icon,
              });
            } else {
              for (const role of childroute.meta.middleware) {
                if (role() == store.getters["auth/role"]) {
                  this.items.push({
                    name: childroute.meta.title,
                    path: childroute.path,
                    icon: childroute.meta.icon,
                  });
                }
              }
            }
          });
        }
      } else {
        this.show = false;
        if (route.name == "Main") {
          route.children.forEach((childroute) => {
            if (!childroute.meta.requiresAuth) {
              this.items.push({
                name: childroute.meta.title,
                path: childroute.path,
                icon: childroute.meta.icon,
              });
            }
          });
        }
      }
    });
  },

  async beforeUpdate() {
    if (store.getters["auth/authUser"]) {
      this.loadUser();
    } else {
      this.user = this.defaultUser;
    }
  },

  methods: {
    logout() {
      store.dispatch("auth/logout").then(() => {});
    },

    async getWochen() {
      await store.dispatch("data/getWochen").then(() => {});
      return true;
    },

    loadUser() {
      this.user = Object.assign({}, store.getters["auth/authUser"]);
      const intialSplit = this.user.name.split(" ");
      this.user.initials = intialSplit[0][0] + intialSplit[1][0];
    },
  },
};
</script>

<style>
.bg-active {
  background-color: #006b99;
  color: white !important;
}
</style>
