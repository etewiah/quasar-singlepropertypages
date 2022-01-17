<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-12">
        <h3>Listing Attributes</h3>
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
      <div class="col-12 q-py-lg">
        <q-item
          style="max-height: 100px"
          class="
            q-mr-lg q-mb-sm
            border-gray-800
            bg-gray-200
            border-2
            float-left
          "
        >
          <q-item-section side>
            <q-icon color="blue" name="bathtub" />
          </q-item-section>
          <q-item-section class="q-mr-sm">
            <q-item-label class="text-weight-medium text-h6"> </q-item-label>
            <TextField
              :cancelPendingChanges="cancelPendingChanges"
              :fieldDetails="bathroomFieldDetails"
              :currentFieldValue="bathroomContentValue"
              v-on:updatePendingChanges="updatePendingChanges"
            ></TextField>
          </q-item-section>
        </q-item>
        <q-item
          class="
            q-mr-lg q-mb-sm
            border-gray-800
            bg-gray-200
            border-2
            float-left
          "
        >
          <q-item-section side>
            <q-icon color="blue" name="hotel" />
          </q-item-section>
          <q-item-section class="q-mr-sm">
            <q-item-label class="text-weight-medium text-h6"> </q-item-label>
            <TextField
              :cancelPendingChanges="cancelPendingChanges"
              :fieldDetails="bedroomsFieldDetails"
              :currentFieldValue="bedroomsContentValue"
              v-on:updatePendingChanges="updatePendingChanges"
            ></TextField>
          </q-item-section>
        </q-item>
        <q-item
          style="max-height: 100px"
          class="
            q-mr-lg q-mb-sm
            border-gray-800
            bg-gray-200
            border-2
            float-left
          "
        >
          <q-item-section side>
            <q-icon color="blue" :name="mdiAspectRatio" />
          </q-item-section>
          <q-item-section class="q-mr-sm">
            <q-item-label class="text-weight-medium text-h6"> </q-item-label>
            <TextField
              :cancelPendingChanges="cancelPendingChanges"
              :fieldDetails="areaFieldDetails"
              :currentFieldValue="areaContentValue"
              v-on:updatePendingChanges="updatePendingChanges"
            ></TextField>
          </q-item-section>
        </q-item>
        <q-item
          style="max-height: 100px"
          class="
            q-mr-lg q-mb-sm
            border-gray-800
            bg-gray-200
            border-2
            float-left
          "
        >
          <q-item-section side>
            <q-icon color="blue" :name="mdiCashMultiple" />
          </q-item-section>
          <q-item-section class="q-mr-sm">
            <q-item-label class="text-weight-medium text-h6"> </q-item-label>
            <TextField
              :cancelPendingChanges="cancelPendingChanges"
              :fieldDetails="priceFieldDetails"
              :currentFieldValue="priceContentValue"
              v-on:updatePendingChanges="updatePendingChanges"
            ></TextField>
          </q-item-section>
        </q-item>
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
import SppSubmitter from "src/components/editor-forms-parts//SppSubmitter.vue"
import TextField from "src/components/editor-forms-parts//TextField.vue"
import { mdiAspectRatio, mdiCashMultiple } from "@quasar/extras/mdi-v5"
export default defineComponent({
  created() {
    this.mdiAspectRatio = mdiAspectRatio
    this.mdiCashMultiple = mdiCashMultiple
  },
  inject: ["listingsEditStore"],
  name: "EditAttributesForm",
  components: {
    SppSubmitter,
    TextField,
  },
  props: {},
  computed: {
    areaContentValue() {
      let areaContentValue = this.currentRealtyAsset["constructed_area"]
      return areaContentValue
    },
    priceContentValue() {
      let priceContentValue = this.currentListing["price_sale_current"]
      return priceContentValue
    },
    bathroomContentValue() {
      let bathroomContentValue = this.currentRealtyAsset["count_bathrooms"]
      return bathroomContentValue
    },
    bedroomsContentValue() {
      let bedroomsContentValue = this.currentRealtyAsset["count_bedrooms"]
      return bedroomsContentValue
    },
    currentRealtyAsset() {
      return this.listingsEditStore.state.currentEditRealtyAsset
    },
    currentListing() {
      return this.listingsEditStore.state.currentEditListing
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
      priceFieldDetails: {
        labelEn: "price",
        tooltipTextTKey: "",
        autofocus: false,
        fieldName: "price_sale_current",
        fieldType: "simpleInput",
        inputType: "text",
        constraints: {
          inputValue: {},
        },
      },
      bathroomFieldDetails: {
        labelEn: "Bathrooms",
        tooltipTextTKey: "",
        autofocus: false,
        fieldName: "count_bathrooms",
        fieldType: "simpleInput",
        inputType: "text",
        constraints: {
          inputValue: {},
        },
      },
      bedroomsFieldDetails: {
        labelEn: "Bedrooms",
        tooltipTextTKey: "",
        autofocus: false,
        fieldName: "count_bedrooms",
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
