<template>
  <q-page class="">
    <SppListingMainView
      :sppViewData="sppViewData"
      :sppPageSections="sppPageSections"
    ></SppListingMainView>
  </q-page>
</template>
<script>
import { useStore } from "vuex"
import { defineComponent, computed, ref } from "vue"
import SppListingMainView from "src/components/SppListingMainView.vue"
export default defineComponent({
  name: "SppPreview",
  components: {
    SppListingMainView,
  },
  // https://quasar.dev/quasar-cli/prefetch-feature#how-prefetch-helps-ssr-mode
  preFetch({
    store,
    currentRoute,
    previousRoute,
    redirect,
    ssrContext,
    urlPath,
    publicPath,
  }) {
    // fetch data, validate route and optionally redirect to some other route...
    // ssrContext is available only server-side in SSR mode
    // No access to "this" here
    // Return a Promise if you are running an async job
    // console.log(ssrContext)
    let listingParams = {
      listingSlug: currentRoute.params.listing_slug,
      listingsGrouping: currentRoute.params.listings_grouping,
    }
    return store.dispatch("sppStore/fetchSpp", listingParams).then(
      (data) => {
        // console.log(data)
      },
      (error) => {}
    )
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
      if (this.sppViewDataAsString) {
        return JSON.parse(this.sppViewDataAsString)
      } else {
        return {}
      }
    },
  },
  setup() {
    const $store = useStore()
    // let sppViewData = {}
    // Need to use store like so when prefetching.
    let sppViewDataAsString = $store.state.sppStore.sppViewDataString
    // const sppViewData = computed(
    //   () => $store.state.sppStore.sppViewData
    // )
    return {
      sppViewDataAsString,
    }
  },
  mounted: function () {},
})
</script>
