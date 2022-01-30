<template>
  <div
    v-if="savedSppItems.length > 0"
    class="q-mt-lg q-pt-lg container search-results-cont container--fluid grid-list-md px-0"
  >
    <div class="q-mx-sm" row wrap>
      <div class="col-xs-12">
        <h3
          class="font-medium text-center title-font text-gray-900 q-py-lg q-my-lg"
        >
          Pages you have previously created
        </h3>
      </div>
      <div
        class="w-full pwb-search-res mb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8"
      ></div>
      <div
        class="sic-list row q-col-gutter-md q-mb-xl q-pb-xl"
        bordered
        padding
      >
        <div
          class="col-12 col-sm-6 col-md-4"
          v-for="(property, index) in savedSppItems"
          :key="index"
        >
          <SppListingColItem
            :removable="false"
            :favouritable="false"
            :currentListing="property"
            :index="index"
          ></SppListingColItem>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SppListingColItem from "src/components/SppListingColItem"
export default {
  components: {
    SppListingColItem,
  },
  setup(props) {},
  props: {
    resultsObject: {
      type: Object,
    },
    // isLoading: {
    //   type: Boolean,
    // },
    incomingSortOrder: {
      type: String,
    },
  },
  data: () => ({
    // sortCode: "priceAsc",
    savedSppItems: [],
  }),
  methods: {},
  mounted: function () {
    let sppItemsKey = "spp_items:pwbprem"
    this.savedSppItems = JSON.parse(localStorage.getItem(sppItemsKey)) || []
  },
  computed: {},
}
</script>
<style scoped></style>
