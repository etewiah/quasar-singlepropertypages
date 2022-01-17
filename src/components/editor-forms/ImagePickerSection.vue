<template>
  <div>
    <q-card class="listing-enq-card">
      <q-card-section>
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
            <q-list
              class="
                w-full
                pwb-search-res
                mb-16
                grid grid-cols-1
                sm:grid-cols-2
                md:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-3
                gap-8
              "
              bordered
              padding
            >
              <q-item v-for="(imageItem, index) in imageOptions" :key="index">
                <q-item-section avatar>
                  <q-radio
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
                <!-- <q-item-section top thumbnail class="q-ml-none">
                  <img :src="imageItem.label" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ imageItem.value }}</q-item-label>
                  <q-item-label caption>...</q-item-label>
                </q-item-section> -->
                <!-- 
                <q-item-section side top>
                  <q-item-label caption>meta</q-item-label>
                </q-item-section> -->
              </q-item>
            </q-list>
          </div>
          <!-- <div class="q-pa-lg">
            <q-option-group
              @update:model-value="fieldChangeHandler"
              v-model="selectedImageOption"
              :options="imageOptions"
              color="green"
              type="radio"
            >
              <template v-slot:label="opt">
                <div class="row items-center">
                  <span class="text-teal">laaaa{{ opt.label }}</span>
                </div>
              </template>
            </q-option-group>
          </div> -->
        </div>
      </q-card-section>
    </q-card>
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
