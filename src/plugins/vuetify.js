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
        primary: "#006b99",
        secondary: "#96c21c",
        accent: "#2c8cbe",
        error: "#f44336",
        warning: "#e91e63",
        info: "#009688",
        success: "#4CAF50",
        background: "#b0bec5",
        buttonGreen: "#96c21c",
        navicon: "#424242",
      },
      dark: {
        primary: "#96c21c",
        secondary: "#006b99",
        accent: "#2c8cbe",
        error: "#f44336",
        warning: "#e91e63",
        info: "#009688",
        success: "#4CAF50",
        background: "#b0bec5",
        buttonGreen: "#96c21c",
        navicon: "#424242",
      },
    },
  },
});

export default vuetify;
