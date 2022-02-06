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
  props: ["fieldDetails", "currentFieldValue", "cancelPendingChanges"],
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
        this.localFieldValue = newValue
        // this.fieldDetails.newValue = newValue
        this.$emit("updatePendingChanges", this.fieldDetails)
      }
    },
    currentFieldValue: {
      handler(newValue, oldVal) {
        // This is effectively an initializer
        // that will not change as a result of typing
        // Will retrigger though when an update is pushed
        // to the server
        if (newValue) {
          if (this.fieldDetails.fieldType === "localesHash") {
            newValue = newValue[this.fieldDetails.activeLocale]
          }
          if (this.fieldDetails.inputType === "moneyField") {
            newValue = newValue / 100
          }
        }
        this.localFieldValue = newValue
        this.originalValue = newValue
      },
      // deep: true,
      immediate: true,
    },
  },
  computed: {
    fieldLabel() {
      if (this.fieldDetails.labelEn) {
        return this.fieldDetails.labelEn
      } else {
        return ""
        // return (
        //   this.$ft(this.fieldDetails.labelTextTKey) +
        //   " " +
        //   this.$ft(this.fieldDetails.suffixTKey)
        // )
      }
    },
    // not going to use mask prop for textfield
    // cos it conflicts with an input type of number
    // mask() {
    //   return "#"
    // },
    textFieldType() {
      if (this.fieldDetails.fieldDbType === "int") {
        return "number"
      } else {
        return ""
      }
    },
  },
  methods: {
    fieldChangeHandler(event) {
      let newValue = event.currentTarget.value
      if (this.fieldDetails.inputType === "moneyField") {
        newValue = newValue * 100
      }
      // in case of (this.fieldDetails.fieldType === "localesHash")
      // the updatePendingPropChanges function in the store will take
      // care of re-structuring the data
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
