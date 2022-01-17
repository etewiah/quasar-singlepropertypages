<template>
  <q-page class="">
    <SppListingMainEdit
      :sppViewData="sppViewData"
      :sppPageSections="sppPageSections"
    ></SppListingMainEdit>
    <!-- <div class="container p-0 mx-auto">
    </div> -->
  </q-page>
</template>
<script>
// import uniqBy from "lodash/uniqBy"
// import _ from "lodash"
import lodashRemove from "lodash/remove"
import { useQuasar } from "quasar"
import { useRoute, useRouter } from "vue-router"
import { useStore } from "vuex"
import { defineComponent, ref } from "vue"
import SppListingMainEdit from "src/components/SppListingMainEdit.vue"
export default defineComponent({
  name: "SppEdit",
  components: {
    SppListingMainEdit,
  },
  computed: {
    sppPageSections() {
      if (this.sppPageDetails.sections_for_viewing) {
        return this.sppPageDetails.sections_for_viewing
      } else {
        return []
      }
    },
    sppPageDetails() {
      if (this.sppViewData && this.sppViewData.page) {
        return this.sppViewData.page
      } else {
        return {}
      }
    },
    sppViewData() {
      let sppViewDataAsString =
        this.$store.state.sppStore.sppViewDataString || "{}"
      let sppViewData = JSON.parse(sppViewDataAsString)
      if (sppViewData) {
        return sppViewData
      } else {
        return {}
      }
    },
  },
  methods: {
    showNotification() {
      this.$emit("showNotification")
    },
    addToLocalSppItems(listing) {
      let sppItemsKey = "spp_items:pwbprem"
      let localSppItems = JSON.parse(localStorage.getItem(sppItemsKey)) || []
      if (!Array.isArray(localSppItems)) {
        localSppItems = []
      }
      let sppType = "bvh"
      if (this.$route.name === "rRegularSppEdit") {
        sppType = "regular"
      }
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
      // console.log(uniqBy)
      // console.log(remove)
      lodashRemove(localSppItems, function (n) {
        return n.listing_uuid === listingToSave.listing_uuid
      })
      localSppItems.push(listingToSave)
      // localSppItems = []
      // prefer removing then setting as it ensures latest details are used
      // Below will ensure that list does not have duplicates but might keep older version:
      // localSppItems = uniqBy(localSppItems, "listing_uuid")
      localStorage.setItem(sppItemsKey, JSON.stringify(localSppItems))
      // below is my way to get favourited computed prop to recompute
      // this.forceFavourited = true
    },
  },
  // props: {},
  watch: {
    sppViewData: {
      handler(newVal, oldVal) {
        if (newVal && newVal.listing) {
          this.addToLocalSppItems(newVal.listing)
        }
      },
    },
  },
  setup(props) {
    const $q = useQuasar()
    const store = useStore()
    // const currentListingData = ref(null)
    // currentListingData.value = {
    //   listing: {},
    // }
    const route = useRoute()
    // const router = useRouter()
    function runListingDataLoad() {
      // In preview mode I fetch Spp in preFetch hook
      // doing it client side here so I can more easily
      // see the api call in browser
      let listingParams = {
        listingSlug: route.params.listing_slug,
        listingsGrouping: route.params.listings_grouping,
      }
      return store.dispatch("sppStore/fetchSpp", listingParams).then(
        (response) => {
          // if (response) {
          //   console.log(response)
          //  could have set value directly here but makes more sense
          // to be consistent with regular prefetch and use store
          //   currentListingData.value = response.data
          // }
        },
        (error) => {}
      )
    }
    // runListingDataLoad()
    return {
      // currentListingData,
      runListingDataLoad,
    }
  },
  mounted: function () {
    this.runListingDataLoad()
  },
})
</script>
