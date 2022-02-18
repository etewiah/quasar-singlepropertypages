<template>
  <q-page class="container">
    <div class="col-xs-12">
      <h4
        class="font-medium text-center title-font text-gray-900 q-mb-sm pt-10"
      >
        Mortgage Calculator
      </h4>
      <div class="q-ma-sm">
        <ListingsTable :savedSppItems="savedSppItems"></ListingsTable>
      </div>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, ref } from "vue"
import ListingsTable from "components/home-hunt/ListingsTable.vue"
export default defineComponent({
  name: "BoardOverview",
  components: {
    ListingsTable,
  },
  computed: {},
  data() {
    return {
    }
  },
  methods: {},
})
</script>
