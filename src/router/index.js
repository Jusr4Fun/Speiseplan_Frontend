import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index";
/* import { component } from "vue/types/umd"; */
import BestellungChildView from "../views/child_view/BestellungChildView.vue";
import IndividuellUserVerwaltungChildView from "../views/child_view/IndividuellUserVerwaltungChildView.vue";
import GesamtBestellungChildView from "../views/child_view/GesamtBestellungChildView.vue";
import LoginChildView from "../views/child_view/LoginChildView.vue";
import HomeDashboardChildView from "../views/child_view/HomeDashboardChildView.vue";
import AdminUserVerwaltungChildView from "../views/child_view/AdminUserVerwaltungChildView.vue";
import TeilnehmerChildView from "../views/child_view/TeilnehmerChildView.vue";
import MainView from "../views/MainView.vue";
import PrintView from "../views/PrintView.vue";
import SpeiseplanUploadChildView from "../views/child_view/SpeiseplanUploadChildView.vue";
import GesamtBestellungPrintChildView from "../views/child_view/GesamtBestellungPrintChildView.vue";
import AboutChildView from "../views/child_view/AboutChildView.vue";
import AnmeldungView from "../views/AnmeldungView.vue";
import PasswortVergessenChildView from "../views/child_view/PasswortVergessenChildView.vue";
import PasswortZuruecksetzenChildView from "../views/child_view/PasswortZuruecksetzenChildView.vue";
import SupportChildView from "../views/child_view/SupportChildView.vue";
import roleCheck from "./roleCheck";
import Nutzer from "../middleware/nutzer";
import Koch from "../middleware/koch";
import Admin from "../middleware/admin";
import Gast from "../middleware/gast";
//import AuthService from "@/services/AuthService";

Vue.use(VueRouter);

const MainPages = {
  path: "/",
  name: "Main",
  component: MainView,
  children: [
    {
      path: "/Dashboard",
      name: "Dashboard",
      component: HomeDashboardChildView,
      meta: {
        icon: "mdi-home",
        title: "Dashboard",
        requiresAuth: true,
        middleware: [Nutzer, Gast, Koch],
      },
    },
    {
      path: "/bestellungen",
      name: "Bestellungen",
      component: BestellungChildView,
      meta: {
        icon: "mdi-basket",
        title: "Bestellungen",
        requiresAuth: true,
        middleware: [Nutzer],
      },
    },
    {
      path: "/GesamtBestellungen",
      name: "Gesamt Bestellungen",
      component: GesamtBestellungChildView,
      meta: {
        icon: "mdi-basket",
        title: "Gesamt Bestellungen",
        requiresAuth: true,
        middleware: [Koch],
      },
    },
    {
      path: "/Teilnehmer",
      name: "Teilnehmer",
      component: TeilnehmerChildView,
      meta: {
        icon: "mdi-account-group",
        title: "Teilnehmer Verwaltung",
        requiresAuth: true,
        middleware: [Nutzer],
      },
    },
    {
      path: "/BenutzerAdmin",
      name: "Gesamt Nutzer Verwaltung",
      component: AdminUserVerwaltungChildView,
      meta: {
        icon: "mdi-account-group",
        title: "Gesamt Nutzer Verwaltung",
        requiresAuth: true,
        middleware: [Admin],
      },
    },
    {
      path: "/Benutzer",
      name: "Benutzerverwaltung",
      component: IndividuellUserVerwaltungChildView,
      meta: {
        icon: "mdi-account-cog",
        title: "Benutzerverwaltung",
        requiresAuth: true,
        middleware: [Nutzer],
      },
    },
    {
      path: "/Upload",
      name: "Upload",
      component: SpeiseplanUploadChildView,
      meta: {
        icon: "mdi-file-upload",
        title: "Upload",
        requiresAuth: true,
        middleware: [Koch],
      },
    },
    {
      path: "/SupportAuth",
      name: "SupportAngemeldet",
      component: SupportChildView,
      meta: {
        icon: "mdi-face-agent",
        title: "Support",
        requiresAuth: true,
        middleware: [Nutzer, Gast, Koch],
      },
    },
    {
      path: "/UeberAuth",
      name: "ÜberAngemeldet",
      component: AboutChildView,
      meta: {
        icon: "mdi-information",
        title: "Über",
        requiresAuth: true,
        middleware: [Nutzer, Gast, Koch],
      },
    },
  ],
};

const PrintPages = {
  path: "/",
  name: "PrintPages",
  component: PrintView,
  children: [
    {
      path: "/PrintGesamtBestellungen",
      name: "PrintGesamtBestellungen",
      component: GesamtBestellungPrintChildView,
      meta: {
        icon: "mdi-basket",
        title: "Gesamt Bestellungen Drucken",
        requiresAuth: true,
        middleware: [Koch],
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
      component: LoginChildView,
      meta: {
        title: "Login",
        requiresAuth: false,
      },
    },
    {
      path: "/PasswortVergessen",
      name: "Passwort Vergessen",
      component: PasswortVergessenChildView,
      meta: {
        title: "Passwort Vergessen",
        requiresAuth: false,
      },
    },
    {
      path: "/PasswortZuruecksetzen",
      name: "Passwort zurücksetzen",
      component: PasswortZuruecksetzenChildView,
      meta: {
        title: "Passwort zurücksetzen",
        requiresAuth: false,
      },
    },
    {
      path: "/Support",
      name: "Support",
      component: SupportChildView,
      meta: {
        icon: "mdi-face-agent",
        title: "Support",
        requiresAuth: false,
      },
    },
    {
      path: "/Ueber",
      name: "Über",
      component: AboutChildView,
      meta: {
        icon: "mdi-information",
        title: "Über",
        requiresAuth: false,
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
    },
  },
  AuthPages,
  PrintPages,
  MainPages,
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.path == "/") {
    next({ path: "/Dashboard", query: { redirect: to.fullPath } });
  }
  const middleware = to.meta.middleware;
  const context = { to, from, next, store };
  const authUser = store.getters["auth/authUser"];
  const reqAuth = to.meta.requiresAuth;
  const loginQuery = { path: "/login", query: { redirect: to.fullPath } };
  if (reqAuth && !authUser) {
    store.dispatch("auth/getAuthUser").then(() => {
      if (!store.getters["auth/authUser"]) {
        next(loginQuery);
      } else {
        checkRole(middleware, context);
      }
    });
  } else if (reqAuth) {
    checkRole(middleware, context);
  } else {
    next();
  }
});

const checkRole = function (middleware, context) {
  const dash = { path: "/dashboard", query: { redirect: context.to.fullPath } };
  if (middleware.length == undefined) {
    return context.next();
  }
  if (roleCheck(context.store, middleware)) {
    return context.next();
  } else {
    return context.next(dash);
  }
};

const DEFAULT_TITLE = "Some Default Title";
router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  });
});

export default router;
