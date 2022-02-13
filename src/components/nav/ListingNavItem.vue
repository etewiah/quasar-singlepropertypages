<template>
  <q-item>
    <q-btn
      class="full-width"
      :color="navColor"
      :label="listingItem.title"
      icon="picture_as_pdf"
      :to="viewListingUrl"
    />
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
  computed: {
    viewListingUrl() {
      let routeInputs = {
        name: "rSppEdit",
        params: {
          listing_slug: this.listingItem.listing_uuid,
          listings_grouping: "for-sale",
        },
      }
      let resolvedRouter = this.$router.resolve(routeInputs)
      let newUrl = resolvedRouter.href
      return newUrl
    },
    isActive() {
      let activeUuid = this.$route.params.listing_slug || ""
      if (
        this.listingItem.listing_uuid === activeUuid
      ) {
        return true
      } else {
        return false
      }
    },
    navColor() {
      if (this.isActive) {
        return "blue"
      } else {
        return "green"
      }
    },
  },
  data() {
    return {
      // savedSppItems: [],
    }
  },

  methods: {},
})
</script>
