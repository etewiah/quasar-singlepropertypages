<template>
  <div v-if="rawContentValue">
    <!-- <template v-if="baseFieldDetails.isHtml">
        <HtmlField
          :cancelPendingChanges="cancelPendingChanges"
          :fieldDetails="contentFieldDetails"
          :currentFieldValue="rawContentValue"
          v-on:updatePendingChanges="updatePendingChanges(...arguments)"
        ></HtmlField>
      </template> -->
    <div v-if="baseFieldDetails.isRichText" class="q-pb-md q-gutter-sm">
      <RichTextField
        :cancelPendingChanges="cancelPendingChanges"
        :fieldDetails="contentFieldDetails"
        :currentFieldValue="rawContentValue"
        v-on:updatePendingChanges="updatePendingChanges"
      ></RichTextField>
    </div>
    <div v-else>
      <TextField
        :cancelPendingChanges="cancelPendingChanges"
        :fieldDetails="contentFieldDetails"
        :currentFieldValue="rawContentValue"
        v-on:updatePendingChanges="updatePendingChanges"
      ></TextField>
    </div>
  </div>
</template>
<script>
// Idea is to centralise where I calculate fieldname with _locale suffices
// Based off previous component called LocalisedContentField
// import TextField from '@jsroot/shared-admin/components-edit/TextField'
import TextField from "src/components/editor-forms-parts//TextField.vue"
import RichTextField from "src/components/editor-forms-parts//RichTextField.vue"
// import HtmlField from '@jsroot/shared-admin/components-edit/HtmlField'
export default {
  components: {
    TextField,
    RichTextField,
    // HtmlField,
  },
  props: {
    baseFieldDetails: {},
    cancelPendingChanges: {},
    // 'modelForEditing',
    // 'cancelPendingChanges',
    modelForEditing: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    rawContentValue() {
      // " || '' " bit is for where page might have no raw_html set
      let rawContentValue = this.modelForEditing[this.contentFieldName] || " "
      return rawContentValue
    },
    contentFieldName() {
      var shortLocale = "en" // this.$route.params.content_locale
      // this.$i18n.locale returns en-GB
      // TODO - add shortLocale to $i18n
      return this.baseFieldDetails.fieldNamePrefix + shortLocale
    },
    contentFieldDetails() {
      var contentFieldDetails = {
        tooltipTextTKey: "",
        autofocus: false,
        // fieldName: "desc",
        fieldType: "simpleInput",
        inputType: "text",
        constraints: {
          inputValue: {},
        },
      }
      contentFieldDetails.labelTextTKey =
        this.baseFieldDetails.labelTextTKey || ""
      contentFieldDetails.fieldName = this.contentFieldName
      contentFieldDetails.rows = this.baseFieldDetails.rows
      // var shortLocale = this.$route.params.locale
      // // this.$i18n.locale returns en-GB
      // // TODO - add shortLocale to $i18n
      // contentFieldDetails.fieldName = this.fieldNamePrefix + shortLocale
      return contentFieldDetails
    },
  },
  methods: {
    updatePendingChanges({ fieldDetails, newValue }) {
      this.$emit("updatePendingChanges", fieldDetails, newValue)
      // this.$store.dispatch('updatePendingPageChanges', fieldDetails)
    },
    // changesCanceled() {
    //   // below will trigger to child input components to reset
    //   this.$store.commit('setPageCancelPendingChanges', true)
    //   this.$store.commit('setPageHasPendingChanges', false)
    //   // this.$store.commit('setPostCancelPendingChanges', true)
    //   // this.$store.commit('setPostHasPendingChanges', false)
    // },

    // triggerPageUpdate() {
    //   this.$store.dispatch('updatePage')
    // }
  },
}
</script>