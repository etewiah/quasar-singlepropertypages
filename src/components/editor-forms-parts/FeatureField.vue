<template>
  <div class="mr-4">
    <div>
      <div class="text-xs-left">
        <template v-if="fieldDetails.label">{{ fieldDetails.label }}</template>
        <!-- <template v-else>{{$ft(fieldDetails.labelTextTKey) }}</template> -->
      </div>
      <div xs12>
        <q-toggle
          v-bind:label="fieldLabel"
          v-model="fieldValue"
          @update:model-value="booleanFieldHandler"
        />

        <!-- <q-toggle
          v-bind:label="fieldLabel"
          color="pink"
          false-value="Disagreed"
          true-value="Agreed"
          v-model="fieldValue"
        /> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: ["resourceModel", "fieldDetails", "cancelPendingChanges"],
  data() {
    return {
      fieldValue: false,
      origVal: false,
    }
  },
  watch: {
    cancelPendingChanges(newValue, oldValue) {
      if (oldValue === false) {
        // when cancelPendingChanges on parent changes from
        // false to true
        // reset model to its original value
        this.fieldValue = this.origVal // this.fieldDetails.originalValue
      }
    },
    resourceModel: {
      handler(newValue, oldVal) {
        // this.fieldDetails.originalValue = false
        if (newValue) {
          // Features are stored on the server as a list of field keys
          // The resourceModel represents this list
          // Any feature in that list should have a value of true
          // here in this FeatureField
          // (ie - the property in question has that feature)
          if (newValue.includes(this.fieldDetails.fieldName)) {
            // this.fieldLabel = "Yes"
            this.fieldValue = true
            this.origVal = true
            // this.fieldDetails.originalValue = true
          }
        }
      },
      // deep: true,
      immediate: true,
    },
  },
  computed: {
    fieldLabel() {
      if (this.fieldValue) {
        return "Yes"
      } else {
        return "No"
      }
    },
  },
  methods: {
    booleanFieldHandler(newValue) {
      // this.fieldDetails.newValue = newValue
      this.$emit("updatePendingChanges", {
        fieldDetails: this.fieldDetails,
        newValue: newValue,
      })
    },
  },
}
</script>