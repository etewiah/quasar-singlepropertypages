<template>
  <div>
    <q-card class="listing-enq-card">
      <q-card-section>
        <div>
          <div class="text-subtitle1 form-label-head"></div>

          <GMapAutocomplete
            placeholder="Type here to find a new address"
            @place_changed="setPlace"
            :options="autoCompleteOptions"
          />

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
          <!-- <LocationTextField
            :cancelPendingChanges="cancelPendingChanges"
            :fieldDetails="cityFieldDetails"
            :currentFieldValue="cityContentValue"
            v-on:updatePendingChanges="updatePendingChanges"
          ></LocationTextField>
          <LocationTextField
            :cancelPendingChanges="cancelPendingChanges"
            :fieldDetails="countryFieldDetails"
            :currentFieldValue="countryContentValue"
            v-on:updatePendingChanges="updatePendingChanges"
          ></LocationTextField> -->
        </div>
        <div>
          <SppSubmitter
            :cancelPendingChanges="cancelPendingChanges"
            :lastChangedField="lastChangedField"
            :currentModelForEditing="currentRealtyAssetWithListing"
            submitObjectType="realtyAssetPlusListing"
            @changesCanceled="changesCanceled"
          ></SppSubmitter>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue"
import SppSubmitter from "src/components/editor-forms-parts//SppSubmitter.vue"
import LocationTextField from "src/components/editor-forms-parts//LocationTextField.vue"
export default defineComponent({
  inject: ["listingsEditProvider"],
  name: "EditMapForm",
  components: {
    SppSubmitter,
    LocationTextField,
  },
  watch: {},
  props: {
    locationResourceModel: {
      type: Object,
    },
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
    cityContentValue() {
      let cityContentValue = this.currentRealtyAsset["city"] || " "
      return cityContentValue
    },
    countryContentValue() {
      let countryContentValue = this.currentRealtyAsset["country"] || " "
      return countryContentValue
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
      // need to consistently use destructuring as above rather than
      // old syntax below
      // updatePendingChanges(fieldDetails, newValue) {
      fieldDetails.newValue = newValue
      // Dec 2021 - previous I had set above in child component but now linter
      // complains about modifying a prop so doing it here
      this.lastChangedField.fieldDetails = fieldDetails
      this.lastChangedField.lastUpdateStamp = Date.now()
      // also $set is no longer available in vue 3:
      // // this.$store.dispatch('updatePendingPropChanges', fieldDetails)
      // this.$set(this.lastChangedField, "fieldDetails", fieldDetails)
      // // below exists just to trigger watcher in formsubmitter:
      // this.$set(this.lastChangedField, "lastUpdateStamp", Date.now())
      this.cancelPendingChanges = false
    },
    changesCanceled() {
      // this.$set(this.lastChangedField, 'fieldDetails', {})
      // this.$set(this.lastChangedField, 'lastUpdateStamp', Date.now())
      this.$emit("changesCanceled")
      this.cancelPendingChanges = true
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
