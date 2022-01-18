<template>
  <div
    :class="[
      'spp-edit-sect-resolver row q-mb-lg q-mt-lg main-section-row',
      sectionContainerClasses,
    ]"
    v-if="editPageSectionComponent"
  >
    <div class="col-12">
      <component
        @setActiveEditFabGroup="setActiveEditFabGroup"
        :activeEditFabGroup="activeEditFabGroup"
        :is="editPageSectionComponent"
        :currentPageSectionForEditing="currentPageSectionForEditing"
        :compiled_html="currentPageSectionForEditing.compiled_html"
        :allPhotosForSpp="allPhotosForSpp"
      ></component>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue"
// import EditRichTextSection from "components/content-page-parts-edit/EditRichTextSection.vue"
import EditPagePart from "src/components/content-page-parts-edit/EditPagePart.vue"
// import ImageWithTextSection from "src/packs/spp/page-parts/ImageWithTextSection.vue"
export default defineComponent({
  name: "SppEditSectionsHost",
  components: {
    // EditRichTextSection,
    // ImageWithTextSection,
    EditPagePart,
  },
  props: {
    activeEditFabGroup: {
      type: String,
    },
    currentPageSectionForEditing: {
      type: Object,
      default: () => {},
    },
    allPhotosForSpp: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    sectionContainerClasses() {
      // Jan 2021 TODO - calculate classes based on section
      // also in SppSectionsResolver
      return ""
    },
    editPageSectionComponent() {
      let confSlug = this.currentPageSectionForEditing.config_slug
      let editorTemplate = this.currentPageSectionForEditing.editor_template
      if (
        confSlug === "genericTemplateView" &&
        editorTemplate !== "HeroClassic"
      ) {
        // Excluding HeroClassic as I use it for SppHero
        return "EditPagePart"
        // } else if (confSlug === "richTextSection") {
        //   return "EditRichTextSection"
      } else {
        return null
      }
    },
  },
  methods: {
    setActiveEditFabGroup(activeEditFabGroupUuid) {
      this.$emit("setActiveEditFabGroup", activeEditFabGroupUuid)
    },
  },
})
</script>
<style scoped>
.main-section-row {
  border-top: green;
}
</style>
