<template>
  <div class="row edit-gen-temp-sect">
    <div class="col-12">
      <div>
        <div
          v-if="currentPageSectionForEditing.visible_on_page"
          class="dd-edit-btn-container"
          style="margin-bottom: -60px; height: 40px"
        >
          <EditActionsContainer
            :activeEditFabGroup="activeEditFabGroup"
            @setActiveEditFabGroup="setActiveEditFabGroup"
            :allPhotosForSpp="allPhotosForSpp"
            :currentPageSectionForEditing="currentPageSectionForEditing"
          ></EditActionsContainer>
          <div class="q-mt-sm q-ml-md row justify-right"></div>
        </div>
        <div v-else class="hidden-section-header row q-mt-md" style="">
          <div class="col-12">
            <q-card class="hsh-card">
              <q-card-section>
                <div class="row justify-right">
                  <div style="min-width: 80%">
                    <!-- <q-btn
                      fab
                      padding="xs sm"
                      :hide-label="false"
                      @click="onShowSection(currentPageSectionForEditing)"
                      icon="visibility"
                      label="Show This Section"
                      color="primary"
                    /> -->
                    <h4 style="float: right" class="q-mx-lg q-my-xs pull-right">
                      {{ hiddenSectionLabel }} (This section is currently
                      hidden)
                    </h4>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <div v-if="currentPageSectionForEditing.visible_on_page">
        <PagePartResolver
          :isEdit="true"
          :pic_urls="currentPageSectionForEditing.pic_urls"
          :texts="currentPageSectionForEditing.texts"
          :editorTemplate="editorTemplate"
        ></PagePartResolver>
      </div>
    </div>
  </div>
</template>
<script>
// import { ref } from "vue"
// import useModal from "src/packs/spp/compose-in/useModal.js"
import EditActionsContainer from "components/content-page-parts-edit/EditActionsContainer.vue"
import PagePartResolver from "components/content-page-parts/PagePartResolver.vue"
export default {
  components: {
    EditActionsContainer,
    PagePartResolver,
  },
  mounted: function () {},
  computed: {
    canBeMovedUp() {
      return !!this.currentPageSectionForEditing.previousSectionUuid
    },
    canBeMovedDown() {
      let isNotHeaderHero =
        this.currentPageSectionForEditing.editor_template !== "HeroClassic"
      return (
        isNotHeaderHero && !!this.currentPageSectionForEditing.nextSectionUuid
      )
    },
    showImageSelector() {
      return this.currentPageSectionForEditing.has_principal_photo
    },
    hiddenSectionLabel() {
      return this.currentPageSectionForEditing.editor_template
    },
    editorTemplate() {
      return this.currentPageSectionForEditing.editor_template
    },
  },
  methods: {
    setActiveEditFabGroup(activeEditFabGroupUuid) {
      this.$emit("setActiveEditFabGroup", activeEditFabGroupUuid)
    },
  },
  // setup() {
  //   const { onShowSection, onMoveSection } = useModal()
  //   return {
  //     onShowSection,
  //     onMoveSection,
  //   }
  // },
  props: {
    activeEditFabGroup: {
      type: String,
    },
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
