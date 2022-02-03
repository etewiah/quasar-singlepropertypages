<template>
  <div v-if="isRegularMap">
    <MapRegularSection
      :currentListingData="currentListingData"
    ></MapRegularSection>
  </div>
  <div v-else>
    <MapIframeSection
      :currentListingData="currentListingData"
    ></MapIframeSection>
  </div>
</template>
<script>
import MapIframeSection from "components/content-page-parts/MapIframeSection.vue"
import MapRegularSection from "components/content-page-parts/MapRegularSection.vue"
export default {
  components: {
    MapIframeSection,
    MapRegularSection,
  },
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
    isRegularMap() {
      return (
        !!this.currentListingData.longitude &&
        !!this.currentListingData.latitude
      )
    },
  },
}
</script>
<style></style>
