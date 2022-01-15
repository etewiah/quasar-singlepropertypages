<template>
  <div
    :class="[
      'spp-sect-resolver row q-mb-lg q-mt-lg main-section-row',
      sectionContainerClasses,
    ]"
    v-if="showSection"
  >
    <div class="col-12">
      <PagePartResolver
        :pic_urls="pageSection.pic_urls"
        :texts="pageSection.texts"
        :editorTemplate="pageSection.editor_template"
      ></PagePartResolver>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue"
import PagePartResolver from "src/components/content-page-parts/PagePartResolver.vue"
export default defineComponent({
  name: "SppViewSectionsHost",
  components: {
    PagePartResolver,
  },
  props: {
    pageSection: {
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
    showSection() {
      let editorTemplate = this.pageSection.editor_template
      if (
        this.pageSection.config_slug === "genericTemplateView" &&
        editorTemplate !== "HeroClassic"
      ) {
        return true
      } else {
        return false
      }
    },
    // pageSectionComponent() {
    //   let editorTemplate = this.pageSection.editor_template
    //   if (this.pageSection.config_slug === "richTextSection") {
    //     return "RichTextSection"
    //   } else if (
    //     this.pageSection.config_slug === "genericTemplateView" &&
    //     editorTemplate !== "HeroClassic"
    //   ) {
    //     return "PagePartResolver"
    //   } else {
    //     return null
    //   }
    // },
  },
  methods: {},
})
</script>
