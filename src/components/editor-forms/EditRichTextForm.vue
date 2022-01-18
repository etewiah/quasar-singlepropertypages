<template>
  <div>
    <q-card class="listing-enq-card">
      <q-card-section>
        <div>
          <h3>Rich Text</h3>
          <!-- <div class="q-pa-md q-gutter-sm">
            <q-editor v-model="compiledHtmlContent" min-height="5rem" />
          </div> -->
          <LocalisedContentField
            :baseFieldDetails="baseFieldDetailsCompiledHtml"
            :cancelPendingChanges="cancelPendingChanges"
            :modelForEditing="currentPropForEditing"
            @updatePendingChanges="updatePendingChanges"
          ></LocalisedContentField>
        </div>
        <div>
          <SppSubmitter
            :cancelPendingChanges="cancelPendingChanges"
            :lastChangedField="lastChangedField"
            :currentModelForEditing="currentPropForEditing"
            @changesCanceled="changesCanceled"
          ></SppSubmitter>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue"
import LocalisedContentField from "src/components/editor-forms-parts//LocalisedContentField.vue"
import SppSubmitter from "src/components/editor-forms-parts//SppSubmitter.vue"
export default defineComponent({
  name: "EditRichTextForm",
  components: {
    LocalisedContentField,
    SppSubmitter,
  },
  watch: {},
  props: {
    currentPropForEditing: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    // compiledHtmlContent: {
    //   get: function () {
    //     if (this.compiledHtmlContentProxy === "") {
    //       return this.currentPropForEditing.compiled_html || ""
    //     } else {
    //       return this.compiledHtmlContentProxy
    //     }
    //   },
    //   set: function (newValue) {
    //     this.currentFieldDetails.newValue = newValue
    //     this.lastChangedField.fieldDetails = this.currentFieldDetails
    //     this.lastChangedField.lastUpdateStamp = Date.now()
    //     this.cancelPendingChanges = false
    //     this.compiledHtmlContentProxy = newValue
    //     // I cannot directly change incoming prop below which is why I'm
    //     // using this.compiledHtmlContentProxy = above
    //     // this.currentPropForEditing.compiled_html = newValue
    //     //
    //   },
    // },
  },
  methods: {
    updatePendingChanges(fieldDetails, newValue) {
      fieldDetails.newValue = newValue
      // Dec 2021 - previous I had set above in child component but now linter
      // complains about modifying a prop so doing it here
      this.lastChangedField.fieldDetails = fieldDetails
      this.lastChangedField.lastUpdateStamp = Date.now()
      // also $set is no longer available in vue 3:
      // // this.$store.dispatch('updatePendingPropChanges', fieldDetails)
      // this.$set(this.lastChangedField, "fieldDetails", fieldDetails)
      // // below exists just to trigger watcher in formsubmitter:
      // this.$set(this.lastChangedField, "lastUpdateStamp", Date.now())
      this.cancelPendingChanges = false
    },
    changesCanceled() {
      // this.$set(this.lastChangedField, 'fieldDetails', {})
      // this.$set(this.lastChangedField, 'lastUpdateStamp', Date.now())
      this.$emit("changesCanceled")
      this.cancelPendingChanges = true
    },
  },
  data() {
    return {
      // currentFieldDetails: {
      //   // tooltipTextTKey: "",
      //   // autofocus: false,
      //   fieldName: "compiled_html_en",
      // },
      // compiledHtmlContentProxy: "",
      // baseFieldDetailsTitle: {
      //   isHtml: false,
      //   labelTextTKey: "client_admin.fieldLabels.title",
      //   fieldNamePrefix: "primary_title_",
      // },
      baseFieldDetailsCompiledHtml: {
        isRichText: true,
        labelTextTKey: "client_admin.fieldLabels.description",
        fieldNamePrefix: "compiled_html_",
      },
      cancelPendingChanges: false,
      lastChangedField: {
        fieldDetails: {},
        lastUpdateStamp: "",
      },
    }
  },
})
</script>
