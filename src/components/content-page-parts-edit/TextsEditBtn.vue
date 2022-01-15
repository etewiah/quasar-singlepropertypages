<template>
  <q-fab-action
    v-if="showTextsEditor"
    :hide-label="false"
    color="primary"
    @click="onStartTextEdit(targetEditForm, editFormLabel)"
    icon="mode_edit"
    :label="editFormLabel"
  />
</template>
<script>
// import useModal from "src/packs/spp/compose-in/useModal.js"
export default {
  components: {},
  mounted: function () {},
  computed: {
    showTextsEditor() {
      return this.currentPageSectionForEditing.has_editable_texts
    },
    editFormLabel() {
      if (
        this.currentPageSectionForEditing.editor_template === "MapIframeSection"
      ) {
        return "Edit Location"
      } else if (
        this.currentPageSectionForEditing.editor_template ===
        "ListingFeaturesSection"
      ) {
        return "Edit Features"
      } else if (
        this.currentPageSectionForEditing.editor_template ===
        "ListingAttributesSection"
      ) {
        return "Edit Attributes"
      } else {
        return "Edit Texts"
      }
    },
    targetEditForm() {
      if (
        this.currentPageSectionForEditing.editor_template === "MapIframeSection"
      ) {
        return "EditMapForm"
      } else if (
        this.currentPageSectionForEditing.editor_template ===
        "ListingFeaturesSection"
      ) {
        return "EditFeaturesForm"
      } else if (
        this.currentPageSectionForEditing.editor_template ===
        "ListingAttributesSection"
      ) {
        return "EditAttributesForm"
      // } else {
      //   return "EditRichTextForm"
      } else {
        return "EditRegularTextsForm"
      }
    },
  },
  methods: {
    onStartTextEdit(editFormNameToUse, editFormLabel) {
      this.$emit(
        "onStartTextEdit",
        editFormNameToUse,
        editFormLabel
      )
    },
  },
  props: {
    currentPageSectionForEditing: {
      type: Object,
      default: () => {},
    },
    compiled_html: {
      type: String,
      required: false,
    },
    allPhotosForSpp: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({}),
}
</script>