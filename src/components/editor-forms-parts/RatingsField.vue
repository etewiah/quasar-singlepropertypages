<template>
  <div class="row">
    <div class="col-xs-6">
      <div class="q-pa-md q-ma-md text-subtitle1 form-label-head">
        {{ fieldDetails.label }}
      </div>
    </div>
    <div class="col-xs-6">
      <div class="q-pa-md q-ma-sm">
        <q-rating
          size="2.5em"
          color="green-5"
          icon="star_border"
          icon-selected="star"
          v-model="fieldValue"
          @update:model-value="fieldChangeHandler"
        />
      </div>
    </div>
    <div></div>
  </div>
</template>
<script>
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
      fieldValue: false,
      origVal: false,
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
          let fieldValue = newValue[this.fieldDetails.fieldName] || 0
          this.fieldValue = fieldValue
          this.origVal = fieldValue
        }
      },
      // deep: true,
      immediate: true,
    },
  },
  computed: {},
  methods: {
    fieldChangeHandler(newValue) {
      this.boardEditProvider.setPendingBoardRatingsChanges({
        fieldDetails: this.fieldDetails,
        newValue: newValue,
      })
      this.$emit("resetChangesCancelled")
    },
  },
}
</script>
