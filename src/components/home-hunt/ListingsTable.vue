<template>
  <q-table
    title=""
    :columns="listingColumns"
    :rows="propertyBoardItems"
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
  computed: {},
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
