<template>
  <div class="map-regular-section" style="height: 900px">
    <GMapMap
      :center="mapCenter"
      :zoom="15"
      map-type-id="roadmap"
      style="width: 100vw; height: 900px"
    >
      <GMapMarker
        :key="index"
        v-for="(m, index) in mapMarkers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="openMarker(m.id)"
      >
        <GMapInfoWindow
          :closeclick="true"
          @closeclick="openMarker(null)"
          :opened="openedMarkerID === m.id"
        >
          <div>{{ infoWindowText }}</div>
        </GMapInfoWindow>
      </GMapMarker>
    </GMapMap>
  </div>
</template>
<script>
// import coreDefaultSetup from "src/nuggets/core-default-setup.js"
export default {
  props: {
    currentListingData: {
      type: Object,
    },
  },
  data: function () {
    return {
      openedMarkerID: "currLoc",
    }
  },
  methods: {
    openMarker(id) {
      this.openedMarkerID = id
    },
  },
  computed: {
    infoWindowText(){
      return this.currentListingData.street_address || this.currentListingData.title
    },
    mapMarkers() {
      return [
        {
          id: "currLoc",
          position: {
            lat: this.currentListingData.latitude,
            lng: this.currentListingData.longitude,
          },
        },
      ]
    },
    mapCenter() {
      return {
        lat: this.currentListingData.latitude,
        lng: this.currentListingData.longitude,
      }
    },
  },
}
</script>
<style>
.vue-map-container {
  height: 900px;
}
</style>
