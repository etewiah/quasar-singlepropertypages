<template>
  <div class="listing-enq-section">
    <!-- <ListingEnquiry
      :listingsModelName="listingsModelName"
      :listingUuid="listingUuid"
    ></ListingEnquiry> -->
  </div>
</template>
<script>
// import ListingEnquiry from "components/forms/ListingEnquiry"
export default {
  components: {
    // ListingEnquiry,
  },
  props: {
    listingUuid: {
      type: String,
    },
    listingsModelName: {
      type: String,
    },
  },
  data: function () {
    return {}
  },
  computed: {
    // tAndCLink() {
    //   return "/"
    // },
  },
}
</script>
<style>
</style>