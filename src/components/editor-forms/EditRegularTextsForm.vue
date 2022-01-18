<template>
  <div>
    <div class="edit-reg-texts-form q-pa-md">
      <div>
        <div v-if="showTitleField">
          <div class="text-subtitle1 form-label-head">Title</div>
          <LocalisedContentField
            :baseFieldDetails="baseFieldDetailsTitle"
            :cancelPendingChanges="cancelPendingChanges"
            :modelForEditing="currentPropForEditing"
            @updatePendingChanges="updatePendingChanges"
          ></LocalisedContentField>
        </div>
        <div v-if="showCompHtmlField">
          <div class="text-subtitle1 form-label-head">HTML</div>
          <LocalisedContentField
            :baseFieldDetails="baseFieldDetailsCompHtml"
            :cancelPendingChanges="cancelPendingChanges"
            :modelForEditing="currentPropForEditing"
            @updatePendingChanges="updatePendingChanges"
          ></LocalisedContentField>
        </div>
        <div v-if="showPrimaryContentField">
          <div class="text-subtitle1 form-label-head">Text</div>
          <LocalisedContentField
            :baseFieldDetails="baseFieldDetailsPrimaryContent"
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
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue"
import LocalisedContentField from "src/components/editor-forms-parts//LocalisedContentField.vue"
import SppSubmitter from "src/components/editor-forms-parts//SppSubmitter.vue"
export default defineComponent({
  name: "EditDescriptionForm",
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
    label: {
      type: String,
    },
    // sppDetails: {
    //   type: Object,
    //   default: () => {},
    // },
    showModalFormIncoming: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    showCompHtmlField() {
      // if (this.currentPropForEditing.editor_template === "HeroClassic") {
      if (
        ["TitleWithText"].includes(this.currentPropForEditing.editor_template)
      ) {
        return true
      } else {
        return false
      }
    },
    showPrimaryContentField() {
      // if (this.currentPropForEditing.editor_template === "HeroClassic") {
      if (
        [
          "LargePicWithSmallTextToLeft",
          "LargePicWithSmallTextToRight",
        ].includes(this.currentPropForEditing.editor_template)
      ) {
        return true
      } else {
        return false
      }
    },
    showTitleField() {
      return true
    },
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
      baseFieldDetailsTitle: {
        isHtml: false,
        // labelTextTKey: "client_admin.fieldLabels.title",
        fieldNamePrefix: "primary_title_",
      },
      baseFieldDetailsPrimaryContent: {
        isHtml: false,
        isRichText: false,
        // labelTextTKey: "client_admin.fieldLabels.description",
        fieldNamePrefix: "primary_content_",
      },
      baseFieldDetailsCompHtml: {
        isHtml: true,
        isRichText: true,
        // labelTextTKey: "client_admin.fieldLabels.description",
        fieldNamePrefix: "compiled_html_",
      },
      cancelPendingChanges: false,
      lastChangedField: {
        fieldDetails: {},
        lastUpdateStamp: "",
      },
      // // showModalForm: false,
      // enquiryValues: {},
      // checkboxErrors: "",
      // propertyEnquirySuccess: "",
      // propertyEnquirySending: false,
      // propertyEnquiryErrors: [],
      // formValid: false,
    }
  },
})
</script>
