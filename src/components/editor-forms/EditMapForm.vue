<template>
  <div>
    <q-card class="listing-enq-card">
      <q-card-section>
        <div>
          <div class="text-subtitle1 form-label-head">Location</div>
          <TextField
            :cancelPendingChanges="cancelPendingChanges"
            :fieldDetails="cityFieldDetails"
            :currentFieldValue="cityContentValue"
            v-on:updatePendingChanges="updatePendingChanges"
          ></TextField>
          <TextField
            :cancelPendingChanges="cancelPendingChanges"
            :fieldDetails="countryFieldDetails"
            :currentFieldValue="countryContentValue"
            v-on:updatePendingChanges="updatePendingChanges"
          ></TextField>
        </div>
        <div>
          <SppSubmitter
            :cancelPendingChanges="cancelPendingChanges"
            :lastChangedField="lastChangedField"
            :currentModelForEditing="currentListing"
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
import TextField from "src/components/editor-forms-parts//TextField.vue"
export default defineComponent({
  inject: ["listingsEditProvider"],
  name: "EditMapForm",
  components: {
    SppSubmitter,
    TextField,
  },
  watch: {},
  props: {},
  computed: {
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
  },
  methods: {
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
      baseFieldDetailsCompiledHtml: {
        isRichText: true,
        labelTextTKey: "client_admin.fieldLabels.description",
        fieldNamePrefix: "compiled_html_",
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
