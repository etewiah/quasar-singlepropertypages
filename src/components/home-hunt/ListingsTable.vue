<template>
  <q-table
    title=""
    :columns="listingColumns"
    :rows="propertyBoardItems"
    :sort-method="customSort"
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
      <ListingRow :isOverview="isOverview" :incomingProps="props"></ListingRow>
    </template>
  </q-table>
</template>
<script>
import ListingRow from "components/home-hunt/ListingRow.vue"
export default {
  components: {
    ListingRow,
  },
  methods: {
    customSort(rows, sortBy, descending) {
      const data = [...rows]
      if (sortBy) {
        data.sort((a, b) => {
          const x = descending ? b : a
          const y = descending ? a : b
          let sortType = sortBy.split("#")[0]
          let sortTypeName = sortBy.split("#")[1]
          if (sortType === "checklist") {
            let yItem =
              y.item.checklist_values_for_features[sortTypeName] || "no"
            let xItem =
              x.item.checklist_values_for_features[sortTypeName] || "no"
            console.log(`yitem is ${yItem}`)
            console.log(`xitem is ${xItem}`)
            // return xItem < yItem ? 1 : xItem > yItem ? -1 : 0
            return xItem === "no" ? 1 : xItem !== "no" ? -1 : -1
          } else if (sortBy === "rating") {
            let yItem = y.item.rating_overall || 0
            let xItem = x.item.rating_overall || 0
            console.log(`yitem is ${yItem}`)
            console.log(`xitem is ${xItem}`)
            return xItem < yItem ? 1 : xItem > yItem ? -1 : 0
          } else if (sortType === "rating" ) {
            let yItem = y.item.ratings_breakdown[sortTypeName] || 0
            let xItem = x.item.ratings_breakdown[sortTypeName] || 0
            console.log(`yitem is ${yItem}`)
            console.log(`xitem is ${xItem}`)
            return xItem < yItem ? 1 : xItem > yItem ? -1 : 0
          } else if (sortBy === "title") {
            // string sort
            return x.listing[sortBy] > y.listing[sortBy]
              ? 1
              : x.listing[sortBy] < y.listing[sortBy]
              ? -1
              : 0
            //  x[sortBy] > y[sortBy] ? 1 : x[sortBy] < y[sortBy] ? -1 : 0
          } else if (sortBy === "price") {
            // numeric sort
            return (
              parseFloat(x.listing["formatted_display_price"].substr(1)) -
              parseFloat(y.listing["formatted_display_price"].substr(1))
            )
          } else {
            // string sort
            return x[sortBy] > y[sortBy] ? 1 : x[sortBy] < y[sortBy] ? -1 : 0
          }
        })
      }

      return data
    },
  },
  data() {
    return {}
  },
  props: {
    propertyBoardItems: {
      type: Array,
      default: () => [],
    },
    listingColumns: {
      type: Array,
      default: () => [],
    },
    isOverview: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
