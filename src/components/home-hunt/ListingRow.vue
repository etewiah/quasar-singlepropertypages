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
      <q-rating
        readonly
        v-model="overallRatingModel"
        size="1.5em"
        color="black"
        icon="star_border"
        icon-selected="star"
      />
    </q-td>
    <q-td key="title" :props="incomingProps">
      <a :href="editRealtyUrl">
        {{ currentListing.title || "No listing title" }}
      </a>
    </q-td>
    <q-td key="price" :props="incomingProps">
      {{ currentListing.formatted_display_price }}
    </q-td>
    <q-td
      v-for="ratingCol in ratingCols"
      :key="ratingCol.name"
      :props="incomingProps"
    >
      <q-rating
        readonly
        v-model="currentBoardItem.ratings_breakdown[ratingCol.name]"
        size="1.5em"
        color="black"
        icon="star_border"
        icon-selected="star"
      />
      {{ currentBoardItem.ratings_breakdown[ratingCol.name] }}
    </q-td>
  </q-tr>
</template>
<script>
export default {
  inject: ["boardEditProvider"],
  components: {},
  computed: {
    ratingCols() {
      let ratingCols = []
      let ratingConcerns = {}
      if (this.boardEditProvider.state.propertyBoard) {
        ratingConcerns =
          this.boardEditProvider.state.propertyBoard.rating_concerns || {}
      }
      Object.keys(ratingConcerns).forEach((ratingConcernKey) => {
        let ratingConcern = ratingConcerns[ratingConcernKey]
        let tableCol = {
          name: ratingConcern.fieldName,
          label: ratingConcern.label,
          field: ratingConcern.fieldName,
        }
        // debugger
        ratingCols.push(tableCol)
      })
      return ratingCols
    },
    overallRatingModel() {
      return this.incomingProps.row.item.rating_overall || 0
    },
    currentListing() {
      return this.incomingProps.row.listing
      // preview_url  count_bathrooms count_bedrooms
    },
    currentBoardItem() {
      return this.incomingProps.row.item || {}
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
    isOverview: {
      type: Boolean,
      default: false
    },
  },
}
</script>
