<template>
  <div>
    <!-- <div>
      <input type="text" id="simple-auto-comp-input" />
    </div> -->
    <div>
      <q-input
        ref="acInput"
        style=""
        bg-color="white"
        color="teal"
        outlined
        for="geo-auto-complete"
      />
    </div>
    <!-- <GMapAutocomplete
      placeholder="Type here to find a new address"
      @place_changed="setPlace"
      :options="autoCompleteOptions"
      class="gmap-ac-input"
    /> -->
  </div>
</template>
<script>
// Feb 2022 - not currently in use
import { defineComponent, ref } from "vue"
export default defineComponent({
  inject: ["listingsEditProvider"],
  name: "GeoAutoComplete",
  components: {},
  watch: {},
  props: {},
  mounted() {
    // this.autocompleteLocation()
    // this.$gmapApiPromiseLazy().then(() => {
    //   let inputEl = this.$refs.acInput.getNativeElement()
    //   this.$autocomplete = new google.maps.places.Autocomplete(inputEl)
    // })
  },
  computed: {
    autoCompleteOptions() {
      return {}
    },
  },
  methods: {
    autocompleteLocation() {
      const options = { types: ["geocode"] }
      if (this.types) {
        options.types = [this.types]
      }
      if (this.country) {
        options.componentRestrictions = {
          country: this.country,
        }
      }
      if (
        "google" in window &&
        typeof google.maps.places.Autocomplete === "function"
      ) {
        let inputEl = document.getElementById("simple-auto-comp-input")
        //"geo-auto-complete") //as HTMLInputElement
        const autocomplete = new google.maps.places.Autocomplete(inputEl)
        //     const input = document.getElementById(this.$refs.Qautocomplete.$refs.input.id) as HTMLInputElement;
        // const autocomplete = new google.maps.places.Autocomplete(input);
        // this.autocomplete.setFields(this.fields)
        // autocomplete.addListener("place_changed", this.setPlace)
      }
    },
    setPlace(placeResultData) {},
  },
  data() {
    return {
      // cancelPendingChanges: false,
      // lastChangedField: {
      //   fieldDetails: {},
      //   lastUpdateStamp: "",
      // },
    }
  },
})
</script>
<style></style>
