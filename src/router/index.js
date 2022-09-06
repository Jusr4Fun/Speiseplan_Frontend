import Vue from "vue";
import VueRouter from "vue-router";
/* import { component } from "vue/types/umd"; */
import BestellungComponent from "../components/BestellungComponent.vue";
import GesamtBestell from "../components/GesammelteBestellungen.vue";
import LoginDialog from "../components/LoginDialog.vue";
import HomeDash from "../components/HomeDashboard.vue";
import UserVerwaltung from "../components/UserVerwaltung.vue";
import TnAnlegen from "../components/TnAnlegen.vue";
import MainView from "../views/MainView.vue";
import AboutComponent from "../components/AboutComponent.vue";
import AnmeldungView from "../views/AnmeldungView.vue";

Vue.use(VueRouter);

const Authentification = true;

const MainPages = {
  path: "/",
  name: "Main",
  component: MainView,
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
      path: "/Benutzer",
      name: "Nutzer",
      component: UserVerwaltung,
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
  if (to.path !== "/login" && !Authentification) next({ path: "/login" });
  else next();
});

// router.beforeEach((to, from, next) => {
//   const nearestWithTitle = to.matched
//     .slice()
//     .reverse()
//     .find((r) => r.meta && r.meta.title);

//   const nearestWithMeta = to.matched
//     .slice()
//     .reverse()
//     .find((r) => r.meta && r.meta.metaTags);

//   const previousNearestWithMeta = from.matched
//     .slice()
//     .reverse()
//     .find((r) => r.meta && r.meta.metaTags);

//   if (nearestWithTitle) {
//     document.title = nearestWithTitle.meta.title;
//   } else if (previousNearestWithMeta) {
//     document.title = previousNearestWithMeta.meta.title;
//   }

//   Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map(
//     (el) => el.parentNode.removeChild(el)
//   );

//   if (!nearestWithMeta) return next();

//   nearestWithMeta.meta.metaTags
//     .map((tagDef) => {
//       const tag = document.createElement("meta");
//       Object.keys(tagDef).forEach((key) => {
//         tag.setAttribute(key, tagDef[key]);
//       });
//       tag.setAttribute("data-vue-router-controlled", "");
//       return tag;
//     })

//     .forEach((tag) => document.head.appendChild(tag));

//   next();
// });

const DEFAULT_TITLE = "Some Default Title";
router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  });
});

export default router;
