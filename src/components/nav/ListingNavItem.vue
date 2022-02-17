<template>
  <q-item>
    <q-card
      v-ripple
      clickable
      @click="toViewListingUrl"
      style="width: 100%"
      :class="[`cursor-pointer q-hoverable bg-${navColor} text-white`]"
    >
      <q-card-section>
        <div class="text-h6"></div>
        <div class="text-subtitle2">{{ listingItem.title }}</div>
      </q-card-section>
      <!-- <q-card-actions>
        <q-btn flat>Action 1</q-btn>
        <q-btn flat>Action 2</q-btn>
      </q-card-actions> -->
    </q-card>
    <!-- <q-btn
      class="full-width"
      :color="navColor"
      :label="listingItem.title"
      icon="list"
      :to="viewListingUrl"
    /> -->
  </q-item>
</template>
<script>
import { defineComponent } from "vue"
export default defineComponent({
  name: "ListingNavItem",
  components: {},
  props: {
    listingItem: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    toViewListingUrl() {
      this.$router.push({
        name: "rSppEdit",
        params: {
          listing_slug: this.listingItem.listing_uuid,
          listings_grouping: "for-sale",
        },
      })
    },
  },
  computed: {
    // viewListingUrl() {
    //   let routeInputs = {
    //     name: "rSppEdit",
    //     params: {
    //       listing_slug: this.listingItem.listing_uuid,
    //       listings_grouping: "for-sale",
    //     },
    //   }
    //   let resolvedRouter = this.$router.resolve(routeInputs)
    //   let newUrl = resolvedRouter.href
    //   return newUrl
    // },
    isActive() {
      let activeUuid = this.$route.params.listing_slug || ""
      if (this.listingItem.listing_uuid === activeUuid) {
        return true
      } else {
        return false
      }
    },
    navColor() {
      if (this.isActive) {
        return "green"
      } else {
        return "blue"
      }
    },
  },
  data() {
    return {
      // savedSppItems: [],
    }
  },
})
</script>
