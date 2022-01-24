<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-12">
        <h3>Listing Features</h3>
      </div>
      <div class="col-12">
        <SppSubmitter
          :cancelPendingChanges="cancelPendingChanges"
          :lastChangedField="lastChangedField"
          :currentModelForEditing="currentRealtyAssetWithListing"
          submitObjectType="realtyAssetPlusListing"
          @changesCanceled="changesCanceled"
        ></SppSubmitter>
      </div>
      <div>
        <div wrap row>
          <template
            v-for="fieldDetails in featureFields"
            :key="fieldDetails.ref_slug"
          >
            <div xs6 sm3 md2>
              <FeatureField
                :cancelPendingChanges="cancelPendingChanges"
                :fieldDetails="fieldDetails"
                v-bind:resourceModel="featuresList"
                @updatePendingChanges="updatePendingChanges"
              ></FeatureField>
            </div>
          </template>
        </div>
      </div>
      <div class="col-12">
        <SppSubmitter
          :cancelPendingChanges="cancelPendingChanges"
          :lastChangedField="lastChangedField"
          :currentModelForEditing="currentRealtyAsset"
          submitObjectType="realtyAssetPlusListing"
          @changesCanceled="changesCanceled"
        ></SppSubmitter>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue"
import sortBy from "lodash/sortBy"
import SppSubmitter from "src/components/editor-forms-parts//SppSubmitter.vue"
import FeatureField from "src/components/editor-forms-parts//FeatureField.vue"
import { mdiAspectRatio, mdiCashMultiple } from "@quasar/extras/mdi-v5"
export default defineComponent({
  created() {
    this.mdiAspectRatio = mdiAspectRatio
    this.mdiCashMultiple = mdiCashMultiple
  },
  inject: ["listingsEditProvider"],
  name: "EditFeaturesForm",
  components: {
    SppSubmitter,
    FeatureField,
  },
  props: {},
  computed: {
    featureFields() {
      let featureFields = []
      // if (this.$store.state.listingsEditProvider.fieldOptions.features) {
      // For each possible feature a prop could have I create a field
      // this.$store.state.listingsEditProvider.fieldOptions.features.forEach(
      this.featureFieldOptions.forEach(function (feature) {
        let featureField = {
          // labelTextTKey: feature.ref_slug,
          label: feature.label,
          // tooltipTextTKey: "toolTips.visible",
          fieldName: feature.ref_slug,
          inputType: "trueFalse",
          fieldDbType: "boolean",
        }
        featureFields.push(featureField)
      })
      return sortBy(featureFields, "label")
    },
    featureFieldOptions() {
      if (this.listingsEditProvider.state.editorConfig) {
        return this.listingsEditProvider.state.editorConfig.select_options
          .availableFeatures
      } else {
        return []
      }
    },
    featuresList() {
      let featureFieldKeys = this.currentListing.feature_field_keys
      let featuresList = featureFieldKeys.map((item) => {
        return item.ref_slug
      })
      return featuresList
      // return this.$store.getters.getFeaturesList
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
    updatePendingChanges({ fieldDetails, newValue }) {
      // Features are handled differently -
      // I keep track of all the changes together so listingsSubmitter only needs
      // to check if the featureChanges field has any values
      let featureChanges = this.lastChangedField.featureChanges
      // fieldDetails.newValue = newValue

      if (Object.keys(featureChanges).includes(fieldDetails.fieldName)) {
        delete this.lastChangedField.featureChanges[fieldDetails.fieldName]
      } else {
        this.lastChangedField.featureChanges[fieldDetails.fieldName] = newValue
        // this.$set(
        //   this.lastChangedField.featureChanges,
        //   fieldDetails.fieldName,
        //   newValue
        // )
      }
      let fieldHasChanged = Object.keys(featureChanges).length > 0
      if (fieldHasChanged) {
        this.lastChangedField.fieldDetails = fieldDetails
        this.lastChangedField.lastUpdateStamp = Date.now()
        // this.$set(this.lastChangedField, "fieldDetails", fieldDetails)
        // // below exists just to trigger watcher in formsubmitter:
        // this.$set(this.lastChangedField, "lastUpdateStamp", Date.now())
        this.cancelPendingChanges = false
      } else {
        this.cancelPendingChanges = true
      }
    },
    changesCanceled() {
      this.lastChangedField.featureChanges = {}
      // this.$set(this.lastChangedField, "featureChanges", {})
      this.$emit("changesCanceled")
      this.cancelPendingChanges = true
    },
    // changesCanceled() {
    //   // this.$set(this.lastChangedField, 'fieldDetails', {})
    //   // this.$set(this.lastChangedField, 'lastUpdateStamp', Date.now())
    //   this.$emit("changesCanceled")
    //   this.cancelPendingChanges = true
    // },
  },
  data() {
    return {
      areaFieldDetails: {
        labelEn: "Area",
        tooltipTextTKey: "",
        autofocus: false,
        fieldName: "constructed_area",
        fieldType: "simpleInput",
        inputType: "text",
        constraints: {
          inputValue: {},
        },
      },
      cancelPendingChanges: false,
      lastChangedField: {
        fieldClass: "aFeatureField",
        fieldDetails: {},
        featureChanges: {},
        lastUpdateStamp: "",
      },
      // lastChangedField: {
      //   fieldDetails: {},
      //   lastUpdateStamp: "",
      // },
    }
  },
})
</script>
