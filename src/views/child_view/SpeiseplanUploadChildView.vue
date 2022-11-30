<template>
  <v-container class="fill-height" fluid>
    <v-row class="d-flex text-center align-start justify-space-around" dense>
      <v-card
        class="card text-center h1"
        elevation="0"
        height="100"
        width="200"
      >
        Datum Wochenanfang <br />
        - <br />
        Datum Wochenende
      </v-card>
      <v-card class="card" elevation="0" width="300">
        <div>
          <v-btn
            dark
            fab
            small
            class="ma-4"
            @click="vorherigeWoche"
            elevation="2"
            color="buttonGreen"
          >
            <v-icon dark>mdi-chevron-left</v-icon>
          </v-btn>
          {{ ausgewaehlteWoche.name }}
          <v-btn
            dark
            fab
            small
            class="ma-4"
            @click="naechsteWoche"
            elevation="2"
            color="buttonGreen"
          >
            <v-icon dark>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </v-card>
      <v-card class="card" elevation="0" height="100" width="200">
        <v-btn
          dark
          class="ma-4"
          @click="upload"
          elevation="2"
          color="buttonGreen"
        >
          Bild Hochladen
        </v-btn>
        <input
          class="d-none"
          type="file"
          accept="image/jpeg"
          ref="upload"
          @change="uploadImage"
        />
      </v-card>
    </v-row>
    <v-row class="d-flex text-center align-start justify-space-around" dense>
      <v-card elevation="0" class="card fill-height" min-height="700">
        <v-img :src="previewImage" contain :max-height="imgheight"> </v-img>
      </v-card>
    </v-row>
  </v-container>
</template>

<style scoped>
.container.fill-height {
  flex-direction: column !important;
  align-items: unset !important;
}

.container.fill-height > .row {
  flex: 1 1 auto !important;
  max-width: initial;
  width: 100%;
}

.container {
  background-color: #b0bec5;
}

.card {
  background-color: #b0bec5;
}
.container {
  background-color: #b0bec5;
}
</style>
<script>
import store from "@/store/index";
import * as API from "@/services/API";
import { Buffer } from "buffer";
export default {
  data: () => ({
    ausgewaehlteWoche: null,
    imgheight: 600,
    PayloadImage: null,
    previewImage: null,
  }),

  async beforeMount() {
    this.ausgewaehlteWoche = Object.assign(
      {},
      store.getters["data/naechsteWoche"]
    );
  },

  mounted() {
    this.loadImage();
  },

  methods: {
    naechsteWoche() {
      API.apiClient
        .get(`/woche=${this.ausgewaehlteWoche.id + 1}`)
        .then((response) => {
          this.ausgewaehlteWoche = response.data.data;
          console.log(response.status);
          console.log(response.data.message);
        });
    },

    vorherigeWoche() {
      API.apiClient
        .get(`/woche=${this.ausgewaehlteWoche.id - 1}`)
        .then((response) => {
          this.ausgewaehlteWoche = response.data.data;
          console.log(response.status);
          console.log(response.data.message);
        });
    },

    uploadImage(e) {
      console.log(e);
      this.PayloadImage = e.target.files[0];
      this.sendImage();
    },

    loadImage() {
      API.apiClient
        .get(`/ImageWoche/${this.ausgewaehlteWoche.id}`, {
          responseType: "arraybuffer",
        })
        .then((response) => {
          console.log(response);
          this.previewImage =
            "data:image/jpeg;base64," +
            Buffer.from(response.data, "binary").toString("base64");
          console.log(response.status);
        });
    },

    sendImage() {
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const wochenPayload = JSON.stringify(this.ausgewaehlteWoche);
      let data = new FormData();
      data.append("woche", wochenPayload);
      data.append("image", this.PayloadImage);
      API.apiClient.post(`/uploadImage`, data, config).then((response) => {
        console.log(response.status);
        console.log(response.data.message);
        if (response.status == 200) {
          const reader = new FileReader();
          reader.readAsDataURL(this.PayloadImage);
          reader.onload = (e) => {
            this.previewImage = e.target.result;
            console.log(this.previewImage);
          };
        }
      });
    },

    upload() {
      this.$refs.upload.click();
    },
  },

  watch: {
    ausgewaehlteWoche: {
      deep: true,
      handler() {
        this.loadImage();
      },
    },
  },
};
</script>
