<template>
  <q-btn
    class="full-width"
    :color="navColor"
    label="Show All Listings"
    icon="list"
    @click="showHomeHuntOverview"
  />
  <!-- <q-dialog v-model="listingsOverviewModalVisible" full-width>
    <q-layout view="Lhh lpR fff" container class="bg-white">
      <q-header class="bg-primary">
        <q-toolbar>
          <q-toolbar-title>All Your Listings</q-toolbar-title>
          <q-btn flat v-close-popup round dense icon="close" />
        </q-toolbar>
      </q-header>
      <q-page-container>
        <q-page>
          <ListingsTable :savedSppItems="savedSppItems"></ListingsTable>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog> -->
</template>
<script>
import { defineComponent } from "vue"
// import ListingsTable from "components/home-hunt/ListingsTable.vue"
export default defineComponent({
  name: "HomeHuntOverview",
  components: {
    // ListingsTable,
  },
  data() {
    return {
      // listingsOverviewModalVisible: false,
      // savedSppItems: [],
    }
  },
  mounted: function () {
    // let sppItemsKey = "spp_items:pwbprem"
    // this.savedSppItems = JSON.parse(localStorage.getItem(sppItemsKey)) || []
  },
  computed: {
    navColor() {
      if (this.$route.name === "rBoardOverview") {
        return "green"
      } else {
        return "blue"
      }
    },
  },
  methods: {
    showHomeHuntOverview() {
      let propBoardKey = "prop_board:pwbprem"
      let propBoardUuid = localStorage.getItem(propBoardKey) || ""
      this.$router.push({
        name: "rBoardOverview",
        params: {
          board_uuid: propBoardUuid,
        },
      })
      // this.listingsOverviewModalVisible = true
    },
  },
})
</script>
