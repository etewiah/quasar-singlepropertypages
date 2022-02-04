<template>
  <div v-if="hasPendingChanges" xs12 sm12 offset-sm0>
    <q-btn @click="startUpdate" color="primary" type="submit"> Save </q-btn>
    <q-btn @click="runCancelListingChanges">Cancel</q-btn>
  </div>
</template>
<script>
import useMgmtService from "src/compose/useMgmtService.js"
export default {
  inject: ["listingsEditProvider"],
  components: {},
  props: {
    // submitObjectType: {
    //   type: String,
    //   default: "pageSection",
    // },
    currentModelForEditing: {
      type: Object,
      default() {
        return {}
      },
    },
    lastChangedField: {
      type: Object,
      default() {
        return {}
      },
    },
    cancelPendingChanges: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    // cancelPendingChanges: {
    //   handler(to, from) {
    //     if (to) {
    //       this.currPendingChanges = {}
    //     }
    //   },
    // },
    // lastChangedField: {
    //   // adapted from updatePendingPropChanges method I previously had in the vuex store
    //   handler(to, from) {
    //     let changedFieldDetails = to.fieldDetails
    //     let fieldHasChanged = false
    //     // let pendingChange = {}
    //     let newValue = changedFieldDetails.newValue
    //     if (changedFieldDetails.fieldDbType === "int") {
    //       newValue = parseInt(changedFieldDetails.newValue)
    //       // fieldHasChanged = (parseInt(changedFieldDetails.newValue) !== state.currentModelForEditing[changedFieldDetails.fieldName])
    //     }
    //     var originalValue =
    //       this.currentModelForEditing[changedFieldDetails.fieldName]
    //     if (changedFieldDetails.fieldType === "localesHash") {
    //       // for localised slug the originalValue looks something like
    //       // { es: "sss", en: "ssyy" }
    //       // so need to break it down for comparison
    //       fieldHasChanged =
    //         newValue !== originalValue[changedFieldDetails.activeLocale]
    //       // and structure the newValue better for saving to server
    //       newValue = {}
    //       newValue[changedFieldDetails.activeLocale] =
    //         changedFieldDetails.newValue
    //     } else {
    //       fieldHasChanged = newValue !== originalValue
    //     }
    //     let changedFieldName = changedFieldDetails.fieldName
    //     if (to.fieldClass === "aFeatureField") {
    //       changedFieldName = "features"
    //       // Features are handled differently - The page component
    //       // keeps track of all the changes together so I only need
    //       // to check if the featureChanges field has any values
    //       fieldHasChanged = Object.keys(to.featureChanges).length > 0
    //     }
    //     if (fieldHasChanged) {
    //       // this.$set(this.currPendingChanges, changedFieldName, newValue)
    //       this.currPendingChanges[changedFieldName] = newValue
    //     } else {
    //       // this.$delete(this.currPendingChanges, changedFieldName, newValue)
    //       delete this.currPendingChanges[changedFieldName]
    //     }
    //   },
    //   deep: true,
    //   immediate: false,
    // },
  },
  data() {
    return {
      // currPendingChanges: {},
      // currentModelForSubmitting: {},
    }
  },
  computed: {
    hasPendingChanges() {
      return (
        Object.keys(this.listingsEditProvider.state.pendingLocationChanges)
          .length > 0
      )
    },
  },
  setup() {
    const { putPageSection, putRealtyAssetWithListing, putListingFeatures } =
      useMgmtService()
    return { putPageSection, putRealtyAssetWithListing, putListingFeatures }
  },

  methods: {
    runCancelListingChanges() {
      // this.currPendingChanges = {}
      this.$emit("changesCanceled")
    },
    startUpdate() {
      this.runRealtyAssetPlusListingUpdate()
      // if (this.submitObjectType === "realtyAssetPlusListing") {
      //   this.runRealtyAssetPlusListingUpdate()
      // } else {
      //   this.runPageSectionUpdate()
      // }
    },
    runRealtyAssetPlusListingUpdate() {
      // if (this.hasPendingChanges) {
      //   Object.keys(this.currPendingChanges).forEach((pendingChangeKey) => {
      //     this.currentModelForSubmitting[pendingChangeKey] =
      //       this.currPendingChanges[pendingChangeKey]
      //   })
      // }
      // this.currPendingChanges = {}
      let listingUuid = this.currentModelForEditing.listing.uuid
      let listingModelName = this.currentModelForEditing.listing.model_name
      this.putRealtyAssetWithListing({
        listing_uuid: listingUuid,
        // realty_asset_uuid: this.currentModelForEditing.realty_asset_uuid,
        listing_model_name: listingModelName,
        changes: this.listingsEditProvider.state.pendingLocationChanges,
        //  this.currentModelForSubmitting,
      }).then((response) => {
        this.listingsEditProvider.clearPendingLocationChanges()
        // TODO - find a better way to refresh than this:
        location.reload()
      })
    },
  },
}
</script>
