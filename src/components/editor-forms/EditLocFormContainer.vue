<template>
  <div v-if="isRegularMap">
    <EditLocFromAutoCompleteForm></EditLocFromAutoCompleteForm>
  </div>
  <div v-else>
    <EditMapForm></EditMapForm>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue"
import EditMapForm from "src/components/editor-forms/EditMapForm.vue"
import EditLocFromAutoCompleteForm from "src/components/editor-forms//EditLocFromAutoCompleteForm.vue"
export default defineComponent({
  inject: ["listingsEditProvider"],
  components: {
    EditLocFromAutoCompleteForm,
    EditMapForm,
  },

  name: "EditLocFormContainer",
  created() {
    // this.$nextTick(function () {
    //   var formSource = document.getElementById("loc-form-source")
    //   var formTarget = document.getElementById("loc-form-target")
    //   // var formTarget = this.$el.getElementsByClassName(
    //   //   "loc-form-target-class"
    //   // )[0]
    //   formSource.parentNode.removeChild(formSource)
    //   formTarget.appendChild(formSource)
    //   // var content = this.$el.getElementsByClassName("tab-content")[0]
    //   // var body = this.$el.getElementsByClassName("panel-body")[0]
    //   // content.parentNode.removeChild(content)
    //   // body.appendChild(content)
    // })
  },
  computed: {
    currentRealtyAsset() {
      return this.listingsEditProvider.state.currentEditRealtyAsset
    },
    isRegularMap() {
      return (
        !!this.currentRealtyAsset.longitude &&
        !!this.currentRealtyAsset.latitude
      )
    },
  },
})
</script>
<style scoped></style>
