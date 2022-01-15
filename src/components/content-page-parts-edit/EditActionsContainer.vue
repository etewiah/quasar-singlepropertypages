<template>
  <div>
    <!-- <SppModalFormsContainer
      @modalHasClosed="sppModalHasClosed"
      :label="editFormLabel"
      :showModalFormIncoming="showModalForm"
      :formName="editFormName"
      :allPhotosForSpp="allPhotosForSpp"
      :currentPropForEditing="currentPageSectionForEditing"
    ></SppModalFormsContainer> -->
    <div class="q-mt-sm q-ml-md row justify-right" style="">
      <div class="col-12 edit-actions-qfab-cont" v-if="showEditFab">
        <q-fab
          @hide="onEditFabHide"
          @mouseleave="onEditFabMouseLeave"
          @show="onEditFabShow(currentPageSectionForEditing)"
          @mouseenter="onEditFabMouseEnter(currentPageSectionForEditing)"
          v-model="heroFabBtnMod"
          vertical-actions-align="left"
          label="Edit Options"
          label-position="bottom"
          :glossy="false"
          color="green"
          class="float-right q-mr-lg"
          icon="keyboard_arrow_down"
          direction="down"
          padding="xs md"
          :outline="true"
          :hide-label="false"
        >
          <TextsEditBtn
            @onStartTextEdit="onStartTextEdit"
            :currentPageSectionForEditing="currentPageSectionForEditing"
          ></TextsEditBtn>
          <!-- <q-fab-action
                v-if="showTextsEditor"
                :hide-label="false"
                color="primary"
                @click="
                  onStartTextEdit(
                    'EditRichTextForm',
                    currentPageSectionForEditing
                  )
                "
                icon="mode_edit"
                label="Edit Texts"
              /> -->
          <q-fab-action
            v-if="showImageSelector"
            :hide-label="false"
            color="primary"
            @click="onStartSingleImageSelect"
            icon="perm_media"
            label="Select Image"
          />
          <q-fab-action
            v-if="currentPageSectionForEditing.can_be_hidden"
            :hide-label="false"
            color="primary"
            @click="onStartHideSection(currentPageSectionForEditing)"
            icon="visibility_off"
            label="Hide Section"
          />
          <q-fab-action
            v-if="currentPageSectionForEditing.can_be_duplicated"
            :hide-label="false"
            color="primary"
            @click="onStartDuplicateSection(currentPageSectionForEditing)"
            icon="content_copy"
            label="Copy Section"
          />
          <q-fab-action
            v-if="canBeMovedUp"
            :hide-label="false"
            color="primary"
            @click="onMoveSection(currentPageSectionForEditing, 'up')"
            icon="arrow_upward"
            label="Move Up"
          />
          <q-fab-action
            v-if="canBeMovedDown"
            :hide-label="false"
            color="primary"
            @click="onMoveSection(currentPageSectionForEditing, 'down')"
            icon="arrow_downward"
            label="Move Down"
          />
        </q-fab>
      </div>
    </div>
  </div>
</template>
<script>
import useEditorModal from "src/compose/useEditorModal.js"
// import useMgmtService from "src/packs/spp/compose-in/useMgmtService.js"
import TextsEditBtn from "components/content-page-parts-edit/TextsEditBtn.vue"
// import SppModalFormsContainer from "src/packs/spp/edit/SppModalFormsContainer.vue"
export default {
  components: {
    TextsEditBtn,
    // SppModalFormsContainer,
  },
  mounted: function () {},
  computed: {
    showEditFab() {
      if (this.activeEditFabGroup === "0") {
        return true
      } else {
        return (
          this.activeEditFabGroup === this.currentPageSectionForEditing.uuid
        )
      }
    },
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
    // Jan 2022 - previously had functions like below in useEditorModal composable but no longer see that as necessary
    onStartDuplicateSection(currentPageSectionForEditing) {
      let pageSectionUuid = currentPageSectionForEditing.uuid
      // let dataApiBase = this.$store.getters["configStore/getDataApiBase"]
      this.duplicatePageSection(pageSectionUuid, {}).then((response) => {
        location.reload()
      })
    },
    onEditFabMouseEnter(currentPageSectionForEditing) {
      // activeEditFabGroup.value = currentPageSectionForEditing.uuid
      setTimeout(() => {
        this.heroFabBtnMod = true
        this.$emit("setActiveEditFabGroup", currentPageSectionForEditing.uuid)
      }, 500)
    },
    onEditFabShow(currentPageSectionForEditing) {
      this.heroFabBtnMod = true
      this.$emit("setActiveEditFabGroup", currentPageSectionForEditing.uuid)
    },
    onEditFabHide() {
      setTimeout(() => {
        this.heroFabBtnMod = false
        this.$emit("setActiveEditFabGroup", "0")
      }, 500)
    },
    onEditFabMouseLeave() {
      setTimeout(() => {
        this.heroFabBtnMod = false
        this.$emit("setActiveEditFabGroup", "0")
      }, 3000)
    },
  },
  setup() {
    const {
      heroFabBtnMod,
      showModalForm,
      editFormName,
      editFormLabel,
      onStartTextEdit,
      onStartSingleImageSelect,
      sppModalHasClosed,
      onStartHideSection,
      onMoveSection,
    } = useEditorModal()
    // const { duplicatePageSection } = useMgmtService()

    return {
      heroFabBtnMod,
      editFormName,
      editFormLabel,
      showModalForm, //: ref(showModalForm),
      onStartSingleImageSelect,
      onStartTextEdit,
      sppModalHasClosed,
      onStartHideSection,
      onMoveSection,
      // duplicatePageSection,
    }
  },
  props: {
    activeEditFabGroup: {
      type: String,
    },
    currentPageSectionForEditing: {
      type: Object,
      default: () => {},
    },
    // compiled_html: {
    //   type: String,
    //   required: false,
    // },
    allPhotosForSpp: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({}),
}
</script>
<style scoped>
.edit-actions-qfab-cont .q-fab {
  background-color: white;
}
</style>
