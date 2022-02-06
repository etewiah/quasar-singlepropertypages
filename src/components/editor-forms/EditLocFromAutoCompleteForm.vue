<template>
  <div>
    <q-card class="listing-enq-card">
      <q-card-section>
        <div>
          <div class="text-subtitle1 form-label-head"></div>

          <GMapAutocomplete
            autofocus="true"
            placeholder="Type here to find a new address"
            @place_changed="setPlace"
            :options="autoCompleteOptions"
            class="gmap-ac-input"
            style="margin-bottom: 40px"
            @focus="onFocus()"
            @blur="onBlur()"
          />
          <div class="row q-col-gutter-sm">
            <div class="col-xs-12 col-sm-12 col-md-6">
              <template
                v-for="fieldDetails in locationFields.mainInputFields1"
                :key="fieldDetails.fieldName"
              >
                <LocationTextField
                  v-on:updatePendingChanges="updatePendingChanges"
                  :fieldDetails="fieldDetails"
                  :fieldOptions="{}"
                  :cancelPendingChanges="cancelPendingChanges"
                  v-bind:locationResourceModel="currentRealtyAsset"
                ></LocationTextField>
              </template>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6">
              <template
                v-for="fieldDetails in locationFields.mainInputFields2"
                :key="fieldDetails.fieldName"
              >
                <LocationTextField
                  v-on:updatePendingChanges="updatePendingChanges"
                  :fieldDetails="fieldDetails"
                  :fieldOptions="{}"
                  :cancelPendingChanges="cancelPendingChanges"
                  v-bind:locationResourceModel="currentRealtyAsset"
                ></LocationTextField>
              </template>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6">
              <template
                v-for="fieldDetails in locationFields.mainInputFields3"
                :key="fieldDetails.fieldName"
              >
                <LocationTextField
                  v-on:updatePendingChanges="updatePendingChanges"
                  :fieldDetails="fieldDetails"
                  :fieldOptions="{}"
                  :cancelPendingChanges="cancelPendingChanges"
                  v-bind:locationResourceModel="currentRealtyAsset"
                ></LocationTextField>
              </template>
            </div>
          </div>
        </div>
        <div>
          <SppLocationSubmitter
            :cancelPendingChanges="cancelPendingChanges"
            :lastChangedField="lastChangedField"
            :currentModelForEditing="currentRealtyAssetWithListing"
            submitObjectType="realtyAssetPlusListing"
            @changesCanceled="changesCanceled"
          ></SppLocationSubmitter>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue"
import SppLocationSubmitter from "src/components/editor-forms-parts//SppLocationSubmitter.vue"
import LocationTextField from "src/components/editor-forms-parts//LocationTextField.vue"
export default defineComponent({
  inject: ["listingsEditProvider"],
  name: "EditLocFromAutoCompleteForm",
  components: {
    SppLocationSubmitter,
    LocationTextField,
  },
  watch: {},
  props: {
    // locationResourceModel: {
    //   type: Object,
    // },
  },
  computed: {
    autoCompleteOptions() {
      return {}
      // could be something like:
      // return {
      //   bounds: { north: 1.4, south: 1.2, east: 104, west: 102 },
      //   strictBounds: true,
      // }
    },
    currentListing() {
      return this.listingsEditProvider.state.currentEditListing
    },
    currentRealtyAsset() {
      return this.listingsEditProvider.state.currentEditRealtyAsset
    },
    currentRealtyAssetWithListing() {
      return {
        listing: this.currentListing,
        realtyAsset: this.currentRealtyAsset,
      }
    },
  },
  methods: {
    /**
     * When the input got changed
     */
    onChange() {
      // document.querySelector(".pac-container").style["display"] = "block"
      // document.querySelector(".pac-container").style["position"] =
      //   "fixed !important"
      document
        .querySelector(".pac-container")
        .setAttribute(
          "style",
          "display: block !important;position: fixed !important; z-index: 10000 !important;"
        )
      // this.$emit("change", this.autocompleteText)
    },

    /**
     * When a key gets pressed
     * @param  {Event} event A keypress event
     */
    onKeyPress(event) {
      document
        .querySelector(".pac-container")
        .setAttribute(
          "style",
          "display: block !important;position: fixed !important; z-index: 10000 !important;"
        )

      setTimeout(() => {
        document
          .querySelector(".pac-container")
          .setAttribute(
            "style",
            "display: block !important;position: fixed !important; z-index: 10000 !important;"
          )
      }, 1500)
      this.$emit("keypress", event)
    },

    /**
     * When a keyup occurs
     * @param  {Event} event A keyup event
     */
    onKeyUp(event) {
      document
        .querySelector(".pac-container")
        .setAttribute(
          "style",
          "display: block !important;position: fixed !important; z-index: 10000 !important;"
        )

      this.$emit("keyup", event)
    },
    /**
     * When the input gets focus
     */
    onFocus() {
      // document.querySelector(".pac-container").style["display"] = "block"
      // document.querySelector(".pac-container").style["position"] =
      //   "fixed !important"
      let pacContainer = document.querySelector(".pac-container")

      if (pacContainer) {
        pacContainer.setAttribute(
          "style",
          "display: block !important;position: fixed !important; z-index: 10000 !important;"
        )
      }
      // this.biasAutocompleteLocation()
      this.$emit("focus")
    },

    /**
     * When the input loses focus
     */
    onBlur() {
      document.querySelector(".pac-container").style["display"] = "none"
      // document.querySelector(".pac-container").style["position"] =
      //   "absolute !important"
      this.$emit("blur")
    },
    setPlace(placeResultData) {
      // addressData is less detailed than placeResultData
      let newAddressDetails = this.getAddressFromGoogleResult(placeResultData)
      // this.$emit("updatePropAddress", newAddressDetails)
      this.locationFields.mainInputFields1.forEach(function (fieldDetails) {
        fieldDetails.newValFromMap = newAddressDetails[fieldDetails.fieldName]
      })
      this.locationFields.mainInputFields2.forEach(function (fieldDetails) {
        fieldDetails.newValFromMap = newAddressDetails[fieldDetails.fieldName]
      })
      this.locationFields.mainInputFields3.forEach(function (fieldDetails) {
        fieldDetails.newValFromMap = newAddressDetails[fieldDetails.fieldName]
      })
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
    updatePendingChanges({ fieldDetails, newValue }) {
      this.listingsEditProvider.setPendingLocationChanges({
        fieldDetails,
        newValue,
      })

      // fieldDetails.newValue = newValue
      // // Dec 2021 - previous I had set above in child component but now linter
      // // complains about modifying a prop so doing it here
      // this.lastChangedField.fieldDetails = fieldDetails
      // this.lastChangedField.lastUpdateStamp = Date.now()
      this.cancelPendingChanges = false
    },
    changesCanceled() {
      this.listingsEditProvider.clearPendingLocationChanges()
      // this.$emit("changesCanceled")
      // this.cancelPendingChanges = true
    },
  },
  data() {
    return {
      locationFields: {
        // from
        // /Users/etewiah/dev/sites-2020-oct/pwb-premium/config/front_end_config/editor_fields/realty_asset/default.json
        mainInputFields1: [
          {
            labelEn: "Street Address",
            labelTextTKey: "client_admin.fieldLabels.streetAddress",
            // "tooltipTextTKey": "toolTips.ref",
            newValFromMap: "",
            fieldName: "street_address",
            fieldType: "simpleInput",
            inputType: "text",
            constraints: {
              inputValue: {},
            },
          },
          {
            labelEn: "City",
            labelTextTKey: "client_admin.fieldLabels.city",
            // "tooltipTextTKey": "toolTips.ref",
            newValFromMap: "",
            fieldName: "city",
            fieldType: "simpleInput",
            inputType: "text",
            constraints: {
              inputValue: {},
            },
          },
          {
            labelEn: "Postal Code",
            labelTextTKey: "client_admin.fieldLabels.postalCode",
            // "tooltipTextTKey": "toolTips.ref",
            newValFromMap: "",
            fieldName: "postal_code",
            fieldType: "simpleInput",
            inputType: "text",
            constraints: {
              inputValue: {},
            },
          },
        ],
        mainInputFields2: [
          {
            labelEn: "Street Number",
            labelTextTKey: "client_admin.fieldLabels.streetNumber",
            // "tooltipTextTKey": "toolTips.ref",
            newValFromMap: "",
            fieldName: "street_number",
            fieldType: "simpleInput",
            inputType: "text",
            constraints: {
              inputValue: {},
            },
          },
          {
            labelEn: "Region",
            labelTextTKey: "client_admin.fieldLabels.region",
            // "tooltipTextTKey": "toolTips.ref",
            newValFromMap: "",
            fieldName: "region",
            fieldType: "simpleInput",
            inputType: "text",
            constraints: {
              inputValue: {},
            },
          },
          {
            labelEn: "Country",
            labelTextTKey: "client_admin.fieldLabels.country",
            // "tooltipTextTKey": "toolTips.ref",
            newValFromMap: "",
            fieldName: "country",
            fieldType: "simpleInput",
            inputType: "text",
            constraints: {
              inputValue: {},
            },
          },
        ],
        mainInputFields3: [
          {
            labelEn: "Latitude",
            newValFromMap: "",
            fieldName: "latitude",
            fieldType: "simpleInput",
            inputType: "text",
          },
          {
            labelEn: "Longitude",
            newValFromMap: "",
            fieldName: "longitude",
            fieldType: "simpleInput",
            inputType: "text",
          },
        ],
      },
      cityFieldDetails: {
        labelEn: "City",
        tooltipTextTKey: "",
        autofocus: false,
        fieldName: "city",
        fieldType: "simpleInput",
        inputType: "text",
        constraints: {
          inputValue: {},
        },
      },
      countryFieldDetails: {
        labelEn: "Country",
        tooltipTextTKey: "",
        autofocus: false,
        fieldName: "country",
        fieldType: "simpleInput",
        inputType: "text",
        constraints: {
          inputValue: {},
        },
      },
      cancelPendingChanges: false,
      lastChangedField: {
        fieldDetails: {},
        lastUpdateStamp: "",
      },
    }
  },
})
</script>
<style>
.pac-container {
  position: fixed !important;
  z-index: 10000 !important;
  display: block !important;
  /* width: auto !important;
  position: initial !important;
  left: 0 !important;
  right: 0 !important;
   */
}
.pac-target-input {
  min-height: 26px;
  padding-top: 1px;
  padding: 5px;
  font-size: large;
  min-width: 500px;
  border-radius: 6px;
  margin-bottom: 15px;
}

/* https://stackoverflow.com/questions/7893857/how-do-you-style-the-dropdown-on-google-places-autocomplete-api 
*/
</style>
