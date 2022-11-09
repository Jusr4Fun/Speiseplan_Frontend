<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app color="secondary">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Menu </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
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
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app fixed color="primary" elevate-on-scroll>
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="pa-md-6"
      ></v-app-bar-nav-icon>
      <v-img
        lazy-src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Logo-cjd.svg/142px-Logo-cjd.svg.png"
        max-height="48"
        max-width="95"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Logo-cjd.svg/142px-Logo-cjd.svg.png"
      ></v-img>

      <v-toolbar-title class="pa-md-4">{{
        $route.meta.title || "Default title"
      }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="show == false" :to="'/' + 'login'" color="secondary"
        >Anmelden</v-btn
      >
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
            <v-avatar color="secondary" size="44">
              <span class="white--text text-h5">{{ user.initials }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-expand-transition>
          <v-card v-model="usercard">
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <v-avatar color="secondary pa-md-6">
                  <span class="white--text text-h5">{{ user.initials }}</span>
                </v-avatar>
                <br />
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
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Admin from "../middleware/admin";
import store from "@/store/index";
//import * as API from "@/services/API";

export default {
  name: "MainApp",
  async created() {
    await this.getWochen();
    this.$router.options.routes.forEach((route) => {
      if (store.getters["auth/authUser"]) {
        if (route.name == "Main") {
          route.children.forEach((childroute) => {
            if (
              typeof childroute.meta.middleware == "undefined" ||
              Admin() == store.getters["auth/role"]
            ) {
              this.items.push({
                name: childroute.name,
                path: childroute.path,
                icon: childroute.meta.icon,
              });
            } else {
              for (const role of childroute.meta.middleware) {
                if (role() == store.getters["auth/role"]) {
                  this.items.push({
                    name: childroute.name,
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
                name: childroute.name,
                path: childroute.path,
                icon: childroute.meta.icon,
              });
            }
          });
        }
      }
    });
    this.user = Object.assign({}, store.getters["auth/authUser"]);
    const intialSplit = this.user.name.split(" ");
    this.user.initials = intialSplit[0][0] + intialSplit[1][0];
  },
  beforeUpdate() {
    this.user = Object.assign({}, store.getters["auth/authUser"]);
    const intialSplit = this.user.name.split(" ");
    this.user.initials = intialSplit[0][0] + intialSplit[1][0];
  },
  data: () => ({
    show: true,
    drawer: null,
    usercard: null,
    expand: false,
    temp: {
      time: new Date().getTime(),
      offset: new Date().getTimezoneOffset(),
    },
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
  methods: {
    logout() {
      store.dispatch("auth/logout").then(() => {});
    },

    getWochen() {
      store.dispatch("data/getWochen").then(() => {});
    },
  },
};
</script>
