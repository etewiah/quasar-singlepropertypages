<template>
  <q-card
    class="row q-mt-lg text-white"
    style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
  >
    <div class="col-xs-12">
      <h4
        class="font-medium text-center title-font text-gray-900 q-mb-sm pt-10"
      >
        Get started by entering a url here:
      </h4>
    </div>
    <div class="col-xs-12 col-md-12">
      <div class="q-pa-md" style="">
        <form
          @submit.prevent.stop="createSpp"
          @reset.prevent.stop="onReset"
          class="q-gutter-md reg-spp-creator"
        >
          <q-input
            style=""
            bg-color="white"
            ref="urlRef"
            color="teal"
            autofocus
            outlined
            v-model="importUrl"
            label="Url to import listing from *"
            hint="Currently works best with listings from rightmove.co.uk"
            lazy-rules
            :rules="urlRules"
          />
          <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->
          <div>
            <q-btn
              label="Create my single property page"
              type="submit"
              color="green"
            />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </form>
      </div>
    </div>
  </q-card>
</template>
<script>
import lodashRemove from "lodash.remove"
import { ref } from "vue"
import SppService from "src/spp.service"
export default {
  components: {},
  mounted() {},
  watch: {},
  data() {
    return {}
  },
  setup() {
    // const $q = useQuasar()
    const importUrl = ref("https://www.rightmove.co.uk/properties/118058243")
    const urlRef = ref(null)
    const accept = ref(false)
    // const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    // const urlRegex = new RegExp(
    //   "^(https?:\\/\\/)?" + // protocol
    //     "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    //     "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    //     "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    //     "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    //     "(\\#[-a-z\\d_]*)?$",
    //   "i"
    // )
    // return this.customer.email && emailRegex.test(this.customer.email) || 'Please enter a valid email address';
    function urlValidator(urlString) {
      const urlObject = new URL(urlString)
      if (urlObject.host.length > 1) {
        return true
      } else {
        return false
      }
    }

    return {
      accept,
      importUrl,
      urlRef,
      urlRules: [
        (val) => (val && val.length > 0) || "Please type something",
        (val) => (val && urlValidator(val)) || "Please enter a valid url",
        // (val) => (val && urlRegex.test(val)) || "Please enter a valid url",
      ],
      onReset() {
        importUrl.value = null
        urlRef.value.resetValidation()
      },
    }
  },
  methods: {
    addToLocalSppItems(listing) {
      let sppItemsKey = "spp_items:pwbprem"
      let localSppItems = JSON.parse(localStorage.getItem(sppItemsKey)) || []
      if (!Array.isArray(localSppItems)) {
        localSppItems = []
      }
      let sppType = "regular"
      let listingToSave = {
        sppType: sppType,
        listing_uuid: listing.listing_uuid,
        preview_url: listing.preview_url,
        formatted_display_price: listing.formatted_display_price,
        title: listing.title,
        reference: listing.reference,
        count_bathrooms: listing.count_bathrooms,
        count_bedrooms: listing.count_bedrooms,
        slug: listing.slug,
      }
      // from lodash:
      // union(localSppItems, [this.currentListingData])
      lodashRemove(localSppItems, function (n) {
        return n.listing_uuid === listingToSave.listing_uuid
      })
      localSppItems.push(listingToSave)
      // prefer removing then setting as it ensures latest details are used
      localStorage.setItem(sppItemsKey, JSON.stringify(localSppItems))
      // Below would ensure that list does not have duplicates but might keep older version:
      // localSppItems = uniqBy(localSppItems, "listing_uuid")
    },
    createSpp() {
      this.urlRef.validate()
      if (this.urlRef.hasError) {
        // form has error
        // } else if (accept !== true) {
        //   $q.notify({
        //     color: "negative",
        //     message: "You need to accept the license and terms first",
        //   })
      } else {
        let dataApiBase = this.$store.getters["configStore/getDataApiBase"]
        SppService.createSppFromUrl(dataApiBase, this.importUrl)
          .then((response) => {
            this.addToLocalSppItems(response.data.listing)
            let targetPath = `/p/spp/for-sale/${response.data.listing.listing_uuid}`
            this.$router.push(targetPath)
          })
          .catch((error) => {
            if (error.response.status === 418) {
              this.$router.push({
                name: "rSourceHtml",
                query: { url: this.importUrl },
              })
            } else {
              this.$q.notify({
                color: "negative",
                position: "top",
                message: error,
                icon: "report_problem",
              })
            }
          })
      }
    },
  },
  computed: {},
  props: {},
}
</script>
<style>
.reg-spp-creator .q-field__messages {
  color: white;
}
</style>
