<template>
  <q-btn
    class="full-width"
    color="blue"
    label="Show All Listings"
    icon="list"
    @click="showHomeHuntOverview"
  />
  <q-dialog v-model="listingsOverviewModalVisible" full-width>
    <q-layout view="Lhh lpR fff" container class="bg-white">
      <q-header class="bg-primary">
        <q-toolbar>
          <!-- <q-btn flat @click="drawer = !drawer" round dense icon="menu" /> -->
          <q-toolbar-title>All Your Listings</q-toolbar-title>
          <!-- <q-btn flat @click="drawerR = !drawerR" round dense icon="menu" /> -->
          <q-btn flat v-close-popup round dense icon="close" />
        </q-toolbar>
      </q-header>
      <q-page-container>
        <q-page>
          <q-table
            title=""
            :columns="listingColumns"
            :rows="savedSppItems"
            row-key="name"
          >
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th
                  v-for="col in props.cols"
                  :key="col.name"
                  :props="props"
                  class="text-italic text-purple"
                >
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>
            <template v-slot:body="props">
              <ListingRow :incomingProps="props"></ListingRow>
            </template>
          </q-table>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>
<script>
import { defineComponent } from "vue"
import ListingRow from "components/home-hunt/ListingRow.vue"
export default defineComponent({
  name: "HomeHuntOverview",
  components: {
    ListingRow,
  },
  data() {
    return {
      listingsOverviewModalVisible: false,
      listingColumns: [
        {
          name: "reference",
          align: "left",
          label: "Reference",
          field: "reference",
          sortable: true,
        },
        {
          name: "sale_listing",
          align: "left",
          label: "Listing",
          field: "sale_listing",
          sortable: true,
        },
        {
          name: "price",
          align: "left",
          label: "Price",
          field: "price",
          sortable: true,
        },
      ],
      savedSppItems: [],
    }
  },
  mounted: function () {
    let sppItemsKey = "spp_items:pwbprem"
    this.savedSppItems = JSON.parse(localStorage.getItem(sppItemsKey)) || []
  },
  methods: {
    showHomeHuntOverview() {
      this.listingsOverviewModalVisible = true
    },
  },
})
</script>
