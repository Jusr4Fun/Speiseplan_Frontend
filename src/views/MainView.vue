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

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon class="ma-2">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      <v-menu bottom min-width="200px" rounded offset-y class="ma-2">
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
                <h3 class="pa-md-2">{{ user.fullName }}</h3>
                <p class="text-caption mt-1">
                  {{ user.email }}
                </p>
                <v-divider class="my-3"></v-divider>
                <v-btn depressed rounded text> Benutzerverwaltung </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn depressed rounded text> Abmelden </v-btn>
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
/* import router from '@/router' */
export default {
  name: "MainApp",
  beforeMount() {
    this.$router.options.routes.forEach((route) => {
      if (route.name == "Main") {
        route.children.forEach((childroute) => {
          this.items.push({
            name: childroute.name,
            path: childroute.path,
            icon: childroute.meta.icon,
          });
        });
      }
    });
  },
  data: () => ({
    drawer: null,
    usercard: null,
    expand: false,
    user: {
      initials: "KB",
      fullName: "Kevin Barth",
      email: "kbarth@fisi-hr.de",
    },
    items: [],
  }),
};
</script>
