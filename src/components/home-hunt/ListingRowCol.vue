<template>
  <q-td :key="ratingCol.name" :props="incomingProps">
    <q-rating
      v-if="isRating"
      readonly
      v-model="currentColModel"
      size="1.5em"
      color="black"
      icon="star_border"
      icon-selected="star"
    />
    <q-checkbox
      v-if="isChecklistItem"
      keep-color
      true-value="yes"
      false-value="no"
      readonly
      v-model="currentColModel"
      label=""
      color="cyan"
    />
  </q-td>
</template>
<script>
export default {
  inject: ["boardEditProvider"],
  components: {},
  computed: {
    currentColModel() {
      if (this.isChecklistItem) {
        return (
          this.currentBoardItem.checklist_values_for_features[
            this.ratingCol.field
          ] || "no"
        )
      } else {
        return (
          this.currentBoardItem.ratings_breakdown[
            this.ratingCol.field
          ] || 0
        )
      }
    },
    currentListing() {
      return this.incomingProps.row.listing
      // preview_url  count_bathrooms count_bedrooms
    },
    currentBoardItem() {
      return this.incomingProps.row.item || {}
    },
  },
  props: {
    ratingCol: {
      type: Object,
      default: () => {
        title: ""
      },
    },
    incomingProps: {
      type: Object,
      default: () => {
        title: ""
      },
    },
    isChecklistItem: {
      type: Boolean,
      default: false,
    },
    isRating: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
