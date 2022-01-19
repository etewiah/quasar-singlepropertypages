<template>
  <router-link style="text-decoration: none" :to="currentListingRouteName">
    <q-card class="search-res-card">
      <q-card-section horizontal>
        <q-img class="" :ratio="16 / 9" :src="summaryImageUrl" />
      </q-card-section>

      <q-separator />
      <q-card-section>
        <div class="text-black text-weight-bold text-xl mb-2">
          {{ currentListing.title }}
        </div>
        <div class="text-xl text-gray-900 float-right">
          {{ currentListing.formatted_display_price }}
        </div>
      </q-card-section>
      <q-card-actions class="w-full">
        <!-- <q-btn flat round icon="event" />
        <q-btn flat> 5:30PM </q-btn>
        <q-btn flat> 7:00PM </q-btn>
        <q-btn flat color="primary"> Reserve </q-btn> -->
        <div>
          <div class="q-pa-md row no-wrap items-center justify-around">
            <div class="flex-1 inline-flex items-center q-pr-sm">
              <q-icon size="2rem">
                <svg
                  class="h-6 w-6 text-gray-600 fill-current mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M0 16L3 5V1a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v4l3 11v5a1 1 0 0 1-1 1v2h-1v-2H2v2H1v-2a1 1 0 0 1-1-1v-5zM19 5h1V1H4v4h1V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h2V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1zm0 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V6h-2v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6H3.76L1.04 16h21.92L20.24 6H19zM1 17v4h22v-4H1zM6 4v4h4V4H6zm8 0v4h4V4h-4z"
                  ></path>
                </svg>
              </q-icon>
              <div>
                <span class="text-gray-900 text-weight-bold">
                  {{ currentListing.count_bedrooms }}
                </span>
                Bedrooms
              </div>
            </div>
            <div class="flex-1 inline-flex items-center q-pl-sm">
              <q-icon size="2rem">
                <svg
                  class="h-6 w-6 text-gray-600 fill-current mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M17.03 21H7.97a4 4 0 0 1-1.3-.22l-1.22 2.44-.9-.44 1.22-2.44a4 4 0 0 1-1.38-1.55L.5 11h7.56a4 4 0 0 1 1.78.42l2.32 1.16a4 4 0 0 0 1.78.42h9.56l-2.9 5.79a4 4 0 0 1-1.37 1.55l1.22 2.44-.9.44-1.22-2.44a4 4 0 0 1-1.3.22zM21 11h2.5a.5.5 0 1 1 0 1h-9.06a4.5 4.5 0 0 1-2-.48l-2.32-1.15A3.5 3.5 0 0 0 8.56 10H.5a.5.5 0 0 1 0-1h8.06c.7 0 1.38.16 2 .48l2.32 1.15a3.5 3.5 0 0 0 1.56.37H20V2a1 1 0 0 0-1.74-.67c.64.97.53 2.29-.32 3.14l-.35.36-3.54-3.54.35-.35a2.5 2.5 0 0 1 3.15-.32A2 2 0 0 1 21 2v9zm-5.48-9.65l2 2a1.5 1.5 0 0 0-2-2zm-10.23 17A3 3 0 0 0 7.97 20h9.06a3 3 0 0 0 2.68-1.66L21.88 14h-7.94a5 5 0 0 1-2.23-.53L9.4 12.32A3 3 0 0 0 8.06 12H2.12l3.17 6.34z"
                  ></path>
                </svg>
              </q-icon>
              <div>
                <span class="text-gray-900 text-weight-bold">
                  {{ currentListing.count_bathrooms }}
                </span>
                Bathrooms
              </div>
            </div>
          </div>
        </div>
      </q-card-actions>
    </q-card>
  </router-link>
</template>
<script>
// // import DisplayPriceLegacy from "@jsroot/shared/components/DisplayPriceLegacy"
export default {
  // mixins: [favsBtn],
  components: {
    // DisplayPriceLegacy,
  },
  props: {
    currentListing: {
      type: Object,
      default() {
        return {}
      },
      // default: {},
    },
    // removable: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  data: () => ({}),
  watch: {},
  computed: {
    summaryImageUrl() {
      return this.currentListing.preview_url
    },
    currentListingRouteName() {
      return {
        name: "rSppEdit",
        params: {
          listing_slug: this.currentListing.listing_uuid,
          listings_grouping: "for-sale",
        },
      }
    },
  },
  mounted: function () {},
}
</script>
<style>
/* .listing-thumb-img {
  height: 200px;
}
.t-icon {
  align-items: center;
  display: inline-flex;
  font-feature-settings: "liga";
  font-size: 24px;
  justify-content: center;
  letter-spacing: normal;
  line-height: 1;
  position: relative;
  text-indent: 0;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), visibility 0s;
  vertical-align: middle;
  user-select: none;
} */
</style>
