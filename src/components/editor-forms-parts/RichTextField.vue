<template>
  <div>
    <q-editor
      class="richtext-field-input"
      outlined
      v-on:keyup="fieldChangeHandler"
      v-model="localFieldValue"
      :label="fieldLabel"
      hint="No hint"
      min-height="5rem"
    />
    <!-- 
    <q-input
      class="listing-enq-field-input"
      outlined
      v-on:keyup="fieldChangeHandler"
      v-model="localFieldValue"
      :label="fieldLabel"
      hint="No hint"
      lazy-rules
      filled
      type="textarea"
      autogrow
    /> -->
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
      let newValue = event.currentTarget.innerHTML
      // this.fieldDetails.newValue = newValue
      // Dec 2021 - linter complains about setting value above
      // so have to pass to parent to set it there
      this.$emit("updatePendingChanges", {
        fieldDetails: this.fieldDetails,
        newValue: newValue,
      })
    },
  },
}
</script>