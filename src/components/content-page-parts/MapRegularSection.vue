<template>
  <div class="map-regular-section" style="height: 900px">
    <!-- <EditMapForm :currentPropForEditing="currentListingData"></EditMapForm> -->
    <EditLocFromAutoCompleteForm :locationResourceModel="currentListingData"></EditLocFromAutoCompleteForm>
    <!-- <GMapAutocomplete
      placeholder="This is a placeholder"
      @place_changed="setPlace"
      :options="{
        bounds: { north: 1.4, south: 1.2, east: 104, west: 102 },
        strictBounds: true,
      }"
    /> -->
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
// import EditMapForm from "src/components/editor-forms//EditMapForm.vue"
import EditLocFromAutoCompleteForm from "src/components/editor-forms//EditLocFromAutoCompleteForm.vue"
export default {
  components: {
    // EditMapForm,
    EditLocFromAutoCompleteForm,
  },
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
    setPlace(placeResultData) {
      // addressData is less detailed than placeResultData
      let newAddressDetails = this.getAddressFromGoogleResult(placeResultData)
      this.$emit("updatePropAddress", newAddressDetails)
    },
    getAddressFromGoogleResult(googleAddress) {
      let newAddressFromMap = {}
      newAddressFromMap.street_address = googleAddress.formatted_address
      // this.agencyAddress.google_place_id = googleAddress.place_id
      // this.agencyAddress.latitude = googleAddress.geometry.location.lat()
      // this.agencyAddress.longitude = googleAddress.geometry.location.lng()
      newAddressFromMap.google_place_id = googleAddress.place_id
      newAddressFromMap.latitude = googleAddress.geometry.location.lat()
      newAddressFromMap.longitude = googleAddress.geometry.location.lng()
      _.each(googleAddress.address_components, function (address_component, i) {
        // iterate through address_component array
        console.log("address_component:" + i)
        console.log(newAddressFromMap)
        if (address_component.types[0] === "route") {
          // console.log(i + ": route:" + address_component.long_name)
          newAddressFromMap.street_name = address_component.long_name
        }
        if (address_component.types[0] === "locality") {
          // console.log("town:" + address_component.long_name)
          newAddressFromMap.city = address_component.long_name
        }
        if (address_component.types[0] === "country") {
          // console.log("country:" + address_component.long_name)
          newAddressFromMap.country = address_component.long_name
        }
        if (address_component.types[0] === "postal_code_prefix") {
          // console.log("pc:" + address_component.long_name)
          // newAddress.postalCode = address_component.long_name
        }
        if (address_component.types[0] === "postal_code") {
          // console.log("pc:" + address_component.long_name)
          newAddressFromMap.postal_code = address_component.long_name
        }
        if (address_component.types[0] === "street_number") {
          // console.log("street_number:" + address_component.long_name)
          newAddressFromMap.street_number = address_component.long_name
        }
        if (address_component.types[0] === "administrative_area_level_1") {
          // eg: andalucia
          console.log(
            "administrative_area_level_1:" + address_component.long_name
          )
          // newAddress.province = address_component.long_name
          newAddressFromMap.region = address_component.long_name
        }
        if (address_component.types[0] === "administrative_area_level_2") {
          console.log(
            "administrative_area_level_1:" + address_component.long_name
          )
          // newAddress.aal2 = address_component.long_name
        }
        if (address_component.types[0] === "administrative_area_level_3") {
          console.log(
            "administrative_area_level_1:" + address_component.long_name
          )
          // newAddress.aal3 = address_component.long_name
        }
        if (address_component.types[0] === "administrative_area_level_4") {
          console.log(
            "administrative_area_level_1:" + address_component.long_name
          )
          // newAddress.aal4 = address_component.long_name
        }
        //return false // break the loop
      })
      return newAddressFromMap
    },
    openMarker(id) {
      this.openedMarkerID = id
    },
  },
  computed: {
    infoWindowText() {
      return (
        this.currentListingData.street_address || this.currentListingData.title
      )
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
