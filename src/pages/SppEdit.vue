<template>
  <q-page :key="$route.fullPath" class="">
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
import lodashRemove from "lodash.remove"
import { useQuasar, Cookies } from "quasar"
import { useRoute, useRouter } from "vue-router"
import { useStore } from "vuex"
import { defineComponent, ref } from "vue"
import SppListingMainEdit from "src/components/SppListingMainEdit.vue"
import usePropertyBoard from "src/compose/usePropertyBoard.js"

// import currentUser from "src/services/auth/current-user"
export default defineComponent({
  name: "SppEdit",
  components: {
    SppListingMainEdit,
  },
  preFetch({
    store,
    currentRoute,
    previousRoute,
    redirect,
    ssrContext,
    urlPath,
    publicPath,
  }) {
    const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies // otherwise we're on client
    // let sppUser = cookies.get("spp_user")
    let sppUserToken = cookies.get("spp_user_token")
    // const bvhManagementRoutes = ["rSppEdit"]
    // const authRequired = bvhManagementRoutes.includes(currentRoute.name)
    // let authInitialState = store.state.auth.initialState || {}
    // console.log(authInitialState)
    // const loggedIn = sppUser && sppUser.hasOwnProperty("accessToken") // this.$q.localStorage.getItem("user")
    // console.log(`User token is ${sppUserToken}`)
    if (sppUserToken) {
      console.log("Cookie user found")
      // TODO - run check to remote endpoint to
      // check user is valid
    } else {
      console.log("Redirecting to login from prefetch")
      redirect({ path: "/login" })
    }
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
  },
  // props: {},
  watch: {
    sppViewData: {
      handler(newVal, oldVal) {
        if (newVal && newVal.listing) {
          this.addToLocalSppItems(newVal.listing)
          this.saveLocalPropertyBoard(newVal.property_board)
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
    const { saveLocalPropertyBoard } = usePropertyBoard()
    return {
      saveLocalPropertyBoard,
      // currentListingData,
      runListingDataLoad,
    }
  },
  updated: function () {
    this.runListingDataLoad()
  },
  mounted: function () {
    this.runListingDataLoad()
  },
})
</script>
