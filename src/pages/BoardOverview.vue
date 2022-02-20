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
        <q-tab name="ratings" label="Ratings Breakdown" />
        <q-tab name="checklist" label="Checklist" />
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

        <q-tab-panel name="ratings">
          <div class="text-h6 text-center">Ratings Breakdown</div>
          <div class="q-ma-sm">
            <ListingsTable
              :isOverview="false"
              :listingColumns="ratingsListingColumns"
              :propertyBoardItems="propertyBoardItems"
            ></ListingsTable>
          </div>
        </q-tab-panel>

        <q-tab-panel name="checklist">
          <div class="text-h6 text-center">Checklist Items</div>
          <div class="q-ma-sm">
            <ListingsTable
              :isOverview="false"
              :listingColumns="checklistListingColumns"
              :propertyBoardItems="propertyBoardItems"
            ></ListingsTable>
          </div>
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
    checklistListingColumns() {
      let listingColumns = [
        {
          name: "title",
          align: "left",
          label: "Title",
          field: "title",
          sortable: true,
        },
      ]
      let checklistItems = {}
      if (this.boardEditProvider.state.propertyBoard) {
        checklistItems =
          this.boardEditProvider.state.propertyBoard
            .checklist_items_for_features || {}
      }
      Object.keys(checklistItems).forEach((checklistItemKey) => {
        let checklistItem = checklistItems[checklistItemKey]
        let sortByName = `checklist#${checklistItem.fieldName}`
        let tableCol = {
          name: sortByName,
          align: "left",
          label: checklistItem.label,
          field: checklistItem.fieldName,
          sortable: true,
          // (optional) compare function if you have
          // some custom data or want a specific way to compare two rows
          sort: (a, b, rowA, rowB) => parseInt(a, 10) - parseInt(b, 10),
          // function return value:
          //   * is less than 0 then sort a to an index lower than b, i.e. a comes first
          //   * is 0 then leave a and b unchanged with respect to each other, but sorted with respect to all different elements
          //   * is greater than 0 then sort b to an index lower than a, i.e. b comes first
        }
        listingColumns.push(tableCol)
      })
      return listingColumns
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
    ratingsListingColumns() {
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
        let sortByName = `rating#${ratingConcern.fieldName}`
        let tableCol = {
          name: sortByName,
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
  updated: function () {
    this.activeTab = this.$route.params.boardTab || "overView"
  },
  mounted: function () {
    if (this.$route.name === "rBoardOverview") {
      this.$router.push({
        name: "rBoardTab",
        params: {
          boardTab: this.activeTab,
        },
      })
    } else {
      this.activeTab = this.$route.params.boardTab || "overView"
    }
  },
  methods: {
    tablesTabChanged() {
      this.$router.push({
        params: {
          boardTab: this.activeTab,
        },
      })
    },
  },
})
</script>
