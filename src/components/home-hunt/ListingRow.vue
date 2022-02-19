<template>
  <q-tr :props="incomingProps">
    <!-- <q-td key="reference" :props="incomingProps">
      <q-btn
        dense
        size="sm"
        :to="editRealtyUrl"
        color="primary"
        icon="edit"
        label="Edit"
      />
    </q-td> -->
    <q-td key="rating" :props="incomingProps">
      <q-rating
        readonly
        v-model="overallRatingModel"
        size="1.5em"
        color="black"
        icon="star_border"
        icon-selected="star"
      />
    </q-td>
    <q-td key="sale_listing" :props="incomingProps">
      <a :href="editRealtyUrl">
        {{ currentListing.title || "No listing title" }}
      </a>
    </q-td>
    <q-td key="price" :props="incomingProps">
      {{ currentListing.formatted_display_price }}
    </q-td>
  </q-tr>
</template>
<script>
export default {
  components: {},
  computed: {
    overallRatingModel() {
      return this.incomingProps.row.item.rating_overall || 0
    },
    currentListing() {
      return this.incomingProps.row.listing
      // preview_url  count_bathrooms count_bedrooms
    },
    editRealtyUrl() {
      let routeInputs = {
        name: "rSppEdit",
        params: {
          listing_slug: this.incomingProps.row.listing.listing_uuid,
          listings_grouping: "for-sale",
        },
      }
      let resolvedRouter = this.$router.resolve(routeInputs)
      let newUrl = resolvedRouter.href
      return newUrl
    },
  },
  props: {
    incomingProps: {
      type: Object,
      default: () => {
        title: ""
      },
    },
  },
}
</script>
