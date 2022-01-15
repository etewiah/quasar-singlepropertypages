<template>
  <div v-if="currentListingData" class="listing-attributes-section">
    <q-card class="listing-attributes-card">
      <q-card-section>
        <!-- <ListingSummaryDetails
          :summaryDetails="summaryDetails"
        ></ListingSummaryDetails> -->
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
// import ListingSummaryDetails from "components/listings/ListingSummaryDetails"
export default {
  components: {
    // ListingSummaryDetails,
  },
  props: {
    currentListingData: {
      type: Object,
    },
  },
  // mounted: function () {
  // },
  data: function () {
    return {}
  },
  computed: {
    summaryDetails() {
      return this.currentListingData
    },
  },
}
</script>
<style></style>
