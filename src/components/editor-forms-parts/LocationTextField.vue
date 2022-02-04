<template>
  <div>
    <q-input
      :hide-bottom-space="true"
      class="regular-textfield-input"
      outlined
      v-on:keyup="fieldChangeHandler"
      v-model="localFieldValue"
      :label="fieldLabel"
      hint=""
      lazy-rules
      type="textarea"
      autogrow
    />
  </div>
</template>
<script>
export default {
  props: {
    locationResourceModel: {
      type: Object,
    },
    fieldDetails: {
      type: Object,
    },
    currentFieldValue: {
      type: String,
    },
    cancelPendingChanges: {
      type: Boolean,
    },
  },
  // props: ["fieldDetails", "currentFieldValue", "cancelPendingChanges"],
  data() {
    return {
      localFieldValue: "",
      originalValue: "",
    }
  },
  watch: {
    cancelPendingChanges(newValue, oldValue) {
      if (oldValue === false) {
        // when cancelPendingChanges on parent changes from
        // false to true
        // reset model to its original value
        this.localFieldValue = this.originalValue
      }
    },
    "fieldDetails.newValFromMap"(newValue, oldValue) {
      if (newValue && newValue.length > 0) {
        // This triggers when map marker is dragged and dropped
        // or autocomplete changes
        this.localFieldValue = newValue
        this.$emit("updatePendingChanges", {
          fieldDetails: this.fieldDetails,
          newValue: newValue,
        })
      }
    },
    currentFieldValue: {
      handler(newValue, oldVal) {
        // This is effectively an initializer
        // that will not change as a result of typing
        // Will retrigger though when an update is pushed
        // to the server
        if (newValue) {
          // if (this.fieldDetails.fieldType === "localesHash") {
          //   newValue = newValue[this.fieldDetails.activeLocale]
          // }
          // if (this.fieldDetails.inputType === "moneyField") {
          //   newValue = newValue / 100
          // }
        } else {
          this.localFieldValue =
            this.locationResourceModel[this.fieldDetails.fieldName]
          this.originalValue =
            this.locationResourceModel[this.fieldDetails.fieldName]
        }
        // this.localFieldValue = newValue
        // this.originalValue = newValue
      },
      // deep: true,
      immediate: true,
    },
  },
  computed: {
    fieldLabel() {
      return this.fieldDetails.labelEn
    },
    // not going to use mask prop for textfield
    // cos it conflicts with an input type of number
  },
  methods: {
    fieldChangeHandler(event) {
      let newValue = event.currentTarget.value
      // this.fieldDetails.newValue = newValue
      // Dec 2021 - linter complains about setting value above
      this.$emit("updatePendingChanges", {
        fieldDetails: this.fieldDetails,
        newValue: newValue,
      })
    },
  },
}
</script>
