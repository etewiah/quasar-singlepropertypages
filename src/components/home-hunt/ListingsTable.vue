<template>
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
</template>
<script>
import ListingRow from "components/home-hunt/ListingRow.vue"
export default {
  components: {
    ListingRow,
  },
  computed: {},
  data() {
    return {
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
    }
  },
  props: {
    savedSppItems: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
