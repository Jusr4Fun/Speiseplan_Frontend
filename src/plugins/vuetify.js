import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#96c21c",
        secondary: "#006b99",
        accent: "#2c8cbe",
        error: "#f44336",
        warning: "#e91e63",
        info: "#009688",
        success: "#4CAF50",
        background: "#bcaaa4",
        buttonGreen: "#96c21c",
      },
      dark: {
        primary: "#96c21c",
        secondary: "#006b99",
        accent: "#2c8cbe",
        error: "#f44336",
        warning: "#e91e63",
        info: "#009688",
        success: "#4CAF50",
        background: "#bcaaa4",
        buttonGreen: "#96c21c",
      },
    },
  },
});

export default vuetify;
