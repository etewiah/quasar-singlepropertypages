<template>
  <q-page class="container">
    <div class="col-xs-12">
      <q-tabs
        v-model="activeTab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
        @click="tablesTabChanged"
      >
        <q-tab name="overView" label="Overview" />
        <q-tab name="ratingsBreakdown" label="Ratings Breakdown" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="activeTab" animated>
        <q-tab-panel name="overView">
          <div class="text-h6 text-center">Properties Overview</div>
          <div class="q-ma-sm">
            <ListingsTable
              :isOverview="true"
              :listingColumns="overviewListingColumns"
              :propertyBoardItems="propertyBoardItems"
            ></ListingsTable>
          </div>
        </q-tab-panel>

        <q-tab-panel name="ratingsBreakdown">
          <div class="text-h6 text-center">Ratings Breakdown</div>
          <div class="q-ma-sm">
            <ListingsTable
              :isOverview="false"
              :listingColumns="listingColumns"
              :propertyBoardItems="propertyBoardItems"
            ></ListingsTable>
          </div>
        </q-tab-panel>

        <q-tab-panel name="movies">
          <div class="text-h6">Movies</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, ref } from "vue"
// import { useQuasar } from "quasar"
// import { useRoute } from "vue-router"
// import useMgmtService from "src/compose/useMgmtService.js"
import ListingsTable from "components/home-hunt/ListingsTable.vue"
export default defineComponent({
  name: "BoardOverview",
  inject: ["boardEditProvider"],
  components: {
    ListingsTable,
  },
  computed: {
    propertyBoardItems() {
      return this.boardEditProvider.state.propertyBoardItems || []
    },
    overviewListingColumns() {
      let listingColumns = [
        {
          name: "rating",
          align: "left",
          label: "Overall Rating",
          field: "Rating",
          sortable: true,
        },
        {
          name: "title",
          align: "left",
          label: "Title",
          field: "title",
          sortable: true,
        },
        {
          name: "price",
          align: "left",
          label: "Price",
          field: "price",
          sortable: true,
        },
      ]
      return listingColumns
    },
    listingColumns() {
      let listingColumns = [
        {
          name: "rating",
          align: "left",
          label: "Overall Rating",
          field: "Rating",
          sortable: true,
        },
        {
          name: "title",
          align: "left",
          label: "Title",
          field: "title",
          sortable: true,
        },
      ]
      let ratingConcerns = {}
      if (this.boardEditProvider.state.propertyBoard) {
        ratingConcerns =
          this.boardEditProvider.state.propertyBoard.rating_concerns || {}
      }
      Object.keys(ratingConcerns).forEach((ratingConcernKey) => {
        let ratingConcern = ratingConcerns[ratingConcernKey]
        let tableCol = {
          name: ratingConcern.fieldName,
          align: "left",
          label: ratingConcern.label,
          field: ratingConcern.fieldName,
          sortable: true,
        }
        listingColumns.push(tableCol)
      })
      return listingColumns
    },
  },
  data() {
    return {
      activeTab: "overView",
    }
  },
  methods: {
    tablesTabChanged() {
      // debugger
      // this.activeTab === "ratingsBreakdown"
    },
  },
})
</script>
