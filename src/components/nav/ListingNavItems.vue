<template>
  <q-item-label header class="text-grey-8">Your listings</q-item-label>
  <ListingNavItem
    :listingItem="listingItem"
    v-for="(listingItem, i) in savedSppItems"
    :key="i"
  >
  </ListingNavItem>
</template>
<script>
import { defineComponent } from "vue"
import ListingNavItem from "components/nav/ListingNavItem.vue"
export default defineComponent({
  name: "ListingNavItems",
  components: {
    ListingNavItem,
  },
  props: {},
  data() {
    return {
      savedSppItems: [],
    }
  },
  mounted: function () {
    let sppItemsKey = "spp_items:pwbprem"
    this.savedSppItems = JSON.parse(localStorage.getItem(sppItemsKey)) || []
  },
  methods: {},
})
</script>
