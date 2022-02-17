<template>
  <div
    v-if="hasPendingChanges"
    class="q-gutter-md spp-loc-submit-cont"
    xs12
    sm12
    offset-sm0
  >
    <q-btn @click="startUpdate" color="primary" type="submit"> Save </q-btn>
    <q-btn @click="runCancelListingChanges">Cancel</q-btn>
  </div>
</template>
<script>
import useMgmtService from "src/compose/useMgmtService.js"
export default {
  inject: ["boardEditProvider"],
  components: {},
  props: {
    currentModelForEditing: {
      type: Object,
      default() {
        return {}
      },
    },
    lastChangedField: {
      type: Object,
      default() {
        return {}
      },
    },
    // cancelPendingChanges: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  watch: {},
  data() {
    return {
      // currPendingChanges: {},
    }
  },
  computed: {
    hasPendingChanges() {
      return (
        Object.keys(this.boardEditProvider.state.pendingBoardChanges).length > 0
      )
    },
  },
  setup() {
    const { putPropertyBoardItem } = useMgmtService()
    return { putPropertyBoardItem }
  },

  methods: {
    runCancelListingChanges() {
      this.$emit("changesCanceled")
      this.boardEditProvider.clearPendingBoardChanges()
    },
    startUpdate() {
      let propertyBoardItemUuid = this.boardEditProvider.state.propertyBoardItem.uuid
      this.putPropertyBoardItem({
        property_board_item_uuid: propertyBoardItemUuid,
        board_item_changes: this.boardEditProvider.state.pendingBoardChanges,
      }).then((response) => {
        this.boardEditProvider.clearPendingBoardChanges()
        // TODO - find a better way to refresh than this:
        location.reload()
      })
    },
  },
}
</script>
