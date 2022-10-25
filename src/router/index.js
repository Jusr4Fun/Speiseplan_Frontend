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
import AboutChildView from "../views/child_view/AboutChildView.vue";
import AnmeldungView from "../views/AnmeldungView.vue";
import PasswortResetChildView from "../views/child_view/PasswortResetChildView.vue";
import SupportChildView from "../views/child_view/SupportChildView.vue";
import roleCheck from "./roleCheck";
import Nutzer from "../middleware/nutzer";
import Koch from "../middleware/koch";
import Admin from "../middleware/admin";
import Gast from "../middleware/gast";

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
      component: BestellungChildView,
      meta: {
        icon: "mdi-basket",
        title: "Bestellungen",
        requiresAuth: true,
        middleware: [Nutzer],
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
      component: GesamtBestellungChildView,
      meta: {
        icon: "mdi-basket",
        title: "Gesamt Bestellungen",
        requiresAuth: true,
        middleware: [Koch],
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
      component: TeilnehmerChildView,
      meta: {
        icon: "mdi-account-group",
        title: "Nutzer",
        requiresAuth: true,
        middleware: [Nutzer],
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
      component: AdminUserVerwaltungChildView,
      meta: {
        icon: "mdi-account-group",
        title: "Gesamt Nutzer Verwaltung",
        requiresAuth: true,
        middleware: [Admin],
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
      component: IndividuellUserVerwaltungChildView,
      meta: {
        icon: "mdi-account-group",
        title: "Benutzerverwaltung",
        requiresAuth: true,
        middleware: [Nutzer],
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
      component: SupportChildView,
      meta: {
        icon: "mdi-face-agent",
        title: "Support",
        requiresAuth: false,
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
      component: AboutChildView,
      meta: {
        icon: "mdi-information",
        title: "Über",
        requiresAuth: false,
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
      component: LoginChildView,
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
      component: PasswortResetChildView,
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
  const middleware = to.meta.middleware;
  const context = { to, from, next, store };
  const authUser = store.getters["auth/authUser"];
  const reqAuth = to.matched.some((record) => record.meta.requiresAuth);
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
  if (middleware.lenght == 0) {
    return context.next();
  }
  if (roleCheck(context, middleware)) {
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
