<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="q-py-sm">
        <q-checkbox
          keep-color
          true-value="yes"
          false-value="no"
          v-model="fieldValue"
          :label="fieldDetails.label"
          @update:model-value="fieldChangeHandler"
          color="cyan"
        />
      </div>
    </div>
    <div></div>
  </div>
</template>
<script>
import useMgmtService from "src/compose/useMgmtService.js"
export default {
  inject: ["boardEditProvider"],
  components: {},
  props: {
    fieldDetails: {
      type: Object,
      default: () => {},
    },
    resourceModel: {
      type: Object,
      default: () => {},
    },
    cancelPendingChanges: {
      type: Boolean,
    },
  },
  //  ["resourceModel", "fieldDetails", "cancelPendingChanges"],
  data() {
    return {
      fieldValue: "no",
      origVal: "no",
    }
  },
  watch: {
    cancelPendingChanges(newValue, oldValue) {
      if (oldValue === false) {
        this.fieldValue = this.origVal // this.fieldDetails.originalValue
      }
    },
    resourceModel: {
      handler(newValue, oldVal) {
        if (newValue) {
          let fieldValue = newValue[this.fieldDetails.fieldName] || "no"
          this.fieldValue = fieldValue
          this.origVal = fieldValue
        }
      },
      // deep: true,
      immediate: true,
    },
  },
  computed: {},
  setup() {
    const { putPropertyBoardItemChecklistValue } = useMgmtService()
    return { putPropertyBoardItemChecklistValue }
  },
  methods: {
    fieldChangeHandler(newValue) {
      // this.boardEditProvider.setPendingChecklistValueChanges({
      //   fieldDetails: this.fieldDetails,
      //   newValue: newValue,
      // })
      // Feb 2022 - unlike other fields where I would set pending changes
      // first, I will set checklist items directly...
      let propertyBoardItemUuid =
        this.boardEditProvider.state.propertyBoardItem.uuid
      this.putPropertyBoardItemChecklistValue({
        property_board_item_uuid: propertyBoardItemUuid,
        checklist_group: "checklist_values_for_features",
        checklist_group_item: this.fieldDetails.fieldName,
        checklist_group_item_value: newValue,
      }).then((response) => {
        this.boardEditProvider.clearPendingBoardChanges()
        // TODO - find a better way to refresh than this:
        // location.reload()
      })
      // // Called when the value of a check_list item is set on a property
      // let checklistValuesForFeatures =
      //   state.pendingBoardChanges.checklist_values_for_features || {}
      // checklistValuesForFeatures[fieldDetails.fieldName] = newValue
      // state.pendingBoardChanges.checklist_values_for_features =
      //   checklistValuesForFeatures
      // fieldDetails.newValue = newValue
      this.$emit("resetChangesCancelled")
    },
  },
}
</script>
