import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index";
/* import { component } from "vue/types/umd"; */
import BestellungComponent from "../components/BestellungComponent.vue";
import IndiviUserVerwaltung from "../components/IndividuelleUserVerwaltung.vue";
import GesamtBestell from "../components/GesammelteBestellungen.vue";
import LoginDialog from "../components/LoginDialog.vue";
import HomeDash from "../components/HomeDashboard.vue";
import UserVerwaltung from "../components/UserVerwaltung.vue";
import TnAnlegen from "../components/TnAnlegen.vue";
import MainView from "../views/MainView.vue";
import AboutComponent from "../components/AboutComponent.vue";
import AnmeldungView from "../views/AnmeldungView.vue";
import PasswortReset from "../components/PasswortReset.vue";
import SupportComponent from "../components/SupportComponent.vue";

Vue.use(VueRouter);

const MainPages = {
  path: "/",
  name: "Main",
  component: MainView,
  meta: {
    requiresAuth: true,
  },
  children: [
    {
      path: "/Dashboard",
      name: "Dashboard",
      component: HomeDash,
      meta: {
        icon: "mdi-home",
        title: "Dashboard",
        metaTags: [
          {
            name: "description",
            content: "Hauptseite",
          },
          {
            property: "og:description",
            content: "Hauptseite",
          },
        ],
      },
    },
    {
      path: "/bestellungen",
      name: "Bestellungen",
      component: BestellungComponent,
      meta: {
        icon: "mdi-basket",
        title: "Bestellungen",
        metaTags: [
          {
            name: "description",
            content: "Haupt Bestellseite",
          },
          {
            property: "og:description",
            content: "Haupt Bestellseite",
          },
        ],
      },
    },
    {
      path: "/GesamtBestellungen",
      name: "Gesamt Bestellungen",
      component: GesamtBestell,
      meta: {
        icon: "mdi-basket",
        title: "Gesamt Bestellungen",
        metaTags: [
          {
            name: "description",
            content: "Gesamt Bestellungen",
          },
          {
            property: "og:description",
            content: "Gesamt Bestellungen",
          },
        ],
      },
    },
    {
      path: "/Teilnehmer",
      name: "Teilnehmer",
      component: TnAnlegen,
      meta: {
        icon: "mdi-account-group",
        title: "Nutzer",
        metaTags: [
          {
            name: "description",
            content: "Kontaktseite",
          },
          {
            property: "og:description",
            content: "Kontaktseite",
          },
        ],
      },
    },
    {
      path: "/BenutzerAdmin",
      name: "Gesamt Nutzer Verwaltung",
      component: UserVerwaltung,
      meta: {
        icon: "mdi-account-group",
        title: "Gesamt Nutzer Verwaltung",
        metaTags: [
          {
            name: "description",
            content: "Kontaktseite",
          },
          {
            property: "og:description",
            content: "Kontaktseite",
          },
        ],
      },
    },
    {
      path: "/Benutzer",
      name: "Benutzerverwaltung",
      component: IndiviUserVerwaltung,
      meta: {
        icon: "mdi-account-group",
        title: "Benutzerverwaltung",
        metaTags: [
          {
            name: "description",
            content: "Kontaktseite",
          },
          {
            property: "og:description",
            content: "Kontaktseite",
          },
        ],
      },
    },
    {
      path: "/Support",
      name: "Support",
      component: SupportComponent,
      meta: {
        icon: "mdi-face-agent",
        title: "Support",
        metaTags: [
          {
            name: "description",
            content: "Kontaktseite",
          },
          {
            property: "og:description",
            content: "Kontaktseite",
          },
        ],
      },
    },
    {
      path: "/Ueber",
      name: "Über",
      component: AboutComponent,
      meta: {
        icon: "mdi-information",
        title: "Über",
        metaTags: [
          {
            name: "description",
            content: "Kontaktseite",
          },
          {
            property: "og:description",
            content: "Kontaktseite",
          },
        ],
      },
    },
  ],
};

const AuthPages = {
  path: "/",
  name: "AuthPages",
  component: AnmeldungView,
  children: [
    {
      path: "/login",
      name: "Anmeldung",
      component: LoginDialog,
      meta: {
        title: "Login",
        metaTags: [
          {
            name: "description",
            content: "Main Login Page",
          },
          {
            property: "og:description",
            content: "Main Login Page",
          },
        ],
      },
    },
    {
      path: "/PasswortReset",
      name: "Passwort zurücksetzen",
      component: PasswortReset,
      meta: {
        title: "Passwort zurücksetzen",
        metaTags: [
          {
            name: "description",
            content: "Password Reset Page",
          },
          {
            property: "og:description",
            content: "Password Reset Page",
          },
        ],
      },
    },
  ],
};

const routes = [
  {
    path: "/",
    name: "Default",
    component: MainView,
    meta: {
      title: "Error 404 Page not found",
      metaTags: [
        {
          name: "description",
          content: "Main Login Page",
        },
        {
          property: "og:description",
          content: "Main Login Page",
        },
      ],
    },
  },
  AuthPages,
  MainPages,
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const authUser = store.getters["auth/authUser"];
  const reqAuth = to.matched.some((record) => record.meta.requiresAuth);
  const loginQuery = { path: "/login", query: { redirect: to.fullPath } };
  if (reqAuth && !authUser) {
    store.dispatch("auth/getAuthUser").then(() => {
      if (!store.getters["auth/authUser"]) next(loginQuery);
      else next();
    });
  } else {
    next();
  }
});

const DEFAULT_TITLE = "Some Default Title";
router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  });
});

export default router;
