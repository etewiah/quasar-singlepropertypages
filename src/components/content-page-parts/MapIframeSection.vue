<template>
  <div class="map-iframe-section">
    <div class="iframe-map">
      <iframe
        width="100%"
        height="450"
        frameborder="0"
        style="border: 0"
        :src="mapSrc"
        allowfullscreen
      >
      </iframe>
    </div>
    <!-- <v-card-actions class="px-5 py-4">
      <span>
        <v-icon color="#9acd32">place</v-icon
        ><b class="headline">{{ mapQueryName }}</b
        ><br />
        (Not exact)
      </span>
      <v-spacer></v-spacer>
      <v-btn style="display: none" depressed color="#9acd32" dark
        >See in Map</v-btn
      >
    </v-card-actions> -->
  </div>
</template>
<script>
import coreDefaultSetup from "src/nuggets/core-default-setup.js"
export default {
  props: {
    currentListingData: {
      type: Object,
    },
  },
  data: function () {
    return {}
  },
  // created() {
  // },
  computed: {
    gmapsEmbedKey() {
      // console.log(coreDefaultSetup.general.GMAPS_EMBED_KEY)
      return coreDefaultSetup.general.GMAPS_EMBED_KEY
    },
    mapQueryName() {
      return this.currentListingData.city || "Costa del Sol"
    },
    mapCountryName() {
      return this.currentListingData.country || "España"
    },
    mapSrc() {
      let mapSrc =
        "https://www.google.com/maps/embed/v1/place?key=" +
        this.gmapsEmbedKey +
        "&q=" +
        this.mapQueryName +
        ",+" +
        this.mapCountryName
      return mapSrc
      // https://www.google.com/maps/embed/v1/place?key=5555&q=Mijas+Costa,+España
    },
  },
}
</script>
<style></style>
