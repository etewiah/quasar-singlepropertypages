<template>
  <q-page class="container">
    <div class="col-xs-12">
      <h4
        class="font-medium text-center title-font text-gray-900 q-mb-sm pt-10"
      >
        Overview
      </h4>
      <div class="q-ma-sm">
        <ListingsTable :savedSppItems="propertyBoardItems"></ListingsTable>
      </div>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, ref } from "vue"
import { useQuasar } from "quasar"
import { useRoute } from "vue-router"
import useMgmtService from "src/compose/useMgmtService.js"
import ListingsTable from "components/home-hunt/ListingsTable.vue"
export default defineComponent({
  name: "BoardOverview",
  inject: ["boardEditProvider"],
  components: {
    ListingsTable,
  },
  computed: {
    propertyBoardItems(){
      return this.boardEditProvider.state.propertyBoardItems || []
    }
  },
  data() {
    return {
      savedSppItems: [],
    }
  },
  mounted() {
    // Running data load from here ensures it does not
    // get triggered on the server side where cookies etc can be a pain
    this.runEditorDataLoad()
  },
  setup() {
    const $q = useQuasar()
    // const store = useStore()
    const currentEditData = ref(null)
    currentEditData.value = {
      editor_setup: {},
      mgmt_content: {},
    }
    const route = useRoute()
    const { getMgmtBoard } = useMgmtService()
    function runEditorDataLoad() {
      let boardUuid = route.params.board_uuid
      getMgmtBoard(boardUuid)
        .then((response) => {
          currentEditData.value = response.data
          this.boardEditProvider.setCurrentPropertyBoardItems(
            response.data.property_board_items
          )
          this.boardEditProvider.setCurrentPropertyBoard(
            response.data.property_board
          )
          // this.listingsEditProvider.setEditorConfig(response.data)
        })
        .catch((error) => {
          let errorMessage = "Board Retrieval Error: "
          if (error) {
            if (error.response) {
              errorMessage +=
                error.response.data.error ||
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString()
            } else {
              errorMessage += error.toString()
            }
          }
          $q.notify({
            color: "negative",
            position: "top",
            message: errorMessage,
            icon: "report_problem",
          })
        })
    }
    return {
      currentEditData,
      runEditorDataLoad,
    }
  },
  methods: {},
})
</script>
