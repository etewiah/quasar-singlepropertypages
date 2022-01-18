<template>
  <div class="img-picker-sect q-pa-md">
    <div>
      <h3>Image Picker</h3>
      <div>
        <SppSubmitter
          :cancelPendingChanges="cancelPendingChanges"
          :lastChangedField="lastChangedField"
          :currentModelForEditing="currentPropForEditing"
          @changesCanceled="changesCanceled"
        ></SppSubmitter>
      </div>
      <div class="selectable-images-container">
        <div class="sic-list row q-col-gutter-md" bordered padding>
          <div
            class="col-6 col-md-4"
            v-for="(imageItem, index) in imageOptions"
            :key="index"
          >
            <q-card class="img-picker-item-card">
              <q-card-section class="q-pa-none">
                <q-item-section class="column items-center" avatar>
                  <q-radio
                    class="col"
                    v-model="selectedImageOption"
                    :val="imageItem.value"
                    color="teal"
                  />
                </q-item-section>
                <q-item-section
                  @click="imageClicked(imageItem.value)"
                  horizontal
                >
                  <q-img class="" :ratio="16 / 9" :src="imageItem.label" />
                </q-item-section>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue"
import SppSubmitter from "src/components/editor-forms-parts//SppSubmitter.vue"
export default defineComponent({
  name: "ImagePickerSection",
  // inject: ["listingsStore"],
  components: {
    SppSubmitter,
  },
  props: {
    imageTarget: {
      type: String,
      default: "primary",
    },
    allPhotosForSpp: {
      type: Object,
      default: () => {},
    },
    currentPropForEditing: {
      type: Object,
      default() {
        return {}
      },
    },
    label: {
      type: String,
    },
    showModalFormIncoming: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    currentFieldDetails() {
      var currentFieldDetails = {
        // tooltipTextTKey: "",
        // autofocus: false,
        fieldName: "updated_pic_urls",
        // fieldType: "simpleInput",
        // inputType: "text",
        // constraints: {
        //   inputValue: {},
        // },
      }
      return currentFieldDetails
    },
    selectedImageOption: {
      get: function () {
        if (this.selectedImageProxy === "") {
          return this.currentPropForEditing.pic_urls.primary.default_url || ""
        } else {
          return this.selectedImageProxy
        }
      },
      set: function (newValue) {
        let urlDetails = {
          default_url: newValue,
        }
        let newUpdateVal = {
          url_details: urlDetails,
          target: this.imageTarget,
        }
        this.currentFieldDetails.newValue = newUpdateVal
        this.lastChangedField.fieldDetails = this.currentFieldDetails
        this.lastChangedField.lastUpdateStamp = Date.now()
        this.cancelPendingChanges = false
        this.selectedImageProxy = newValue
        // I cannot directly change incoming prop below which is why I'm
        // using this.selectedImageProxy = above
        // this.currentPropForEditing.pic_urls.primary.default_url = newValue
        //
      },
    },
    imageOptions() {
      let options = []
      this.allPhotosForSpp.forEach(function (sppPhoto) {
        options.push({
          label: sppPhoto.image_details.url,
          value: sppPhoto.image_details.url,
          image_url: sppPhoto.image_details.url,
        })
      })
      return options
    },
    // allPhotosForSpp() {
    // TODO - perhaps use a listingForEdit composable store
    // to avoid having to pass this through multiple components to imagepicker
    //   if (this.listingsStore.state.currentListingAndPage.listing) {
    //     // listingUuid =
    //     //   this.listingsStore.state.currentListingAndPage.listing.listing_uuid
    //   }
    //   return []
    // },
  },
  methods: {
    imageClicked(newValue) {
      let urlDetails = {
        default_url: newValue,
      }
      let newUpdateVal = {
        url_details: urlDetails,
        target: this.imageTarget,
      }
      this.currentFieldDetails.newValue = newUpdateVal
      this.lastChangedField.fieldDetails = this.currentFieldDetails
      this.lastChangedField.lastUpdateStamp = Date.now()
      this.cancelPendingChanges = false
      this.selectedImageProxy = newValue
    },
    // updatePendingChanges(fieldDetails, newValue) {
    //   fieldDetails.newValue = newValue
    //   this.lastChangedField.fieldDetails = fieldDetails
    //   this.lastChangedField.lastUpdateStamp = Date.now()
    //   this.cancelPendingChanges = false
    // },
    changesCanceled() {
      this.selectedImageProxy =
        this.currentPropForEditing.pic_urls.primary.default_url
      // this.$set(this.lastChangedField, 'fieldDetails', {})
      // this.$set(this.lastChangedField, 'lastUpdateStamp', Date.now())
      // this.$emit("changesCanceled")
      this.cancelPendingChanges = true
    },
  },
  data() {
    return {
      selectedImageProxy: "",
      cancelPendingChanges: false,
      lastChangedField: {
        fieldDetails: {},
        lastUpdateStamp: "",
      },
    }
  },
})
</script>
