<template>
  <div class="q-py-sm">
    <PropertyChecklistField
      v-for="(clItem, index) in checklistItems"
      :key="index"
      :fieldDetails="clItem"
      :resourceModel="featuresChecklist"
      :cancelPendingChanges="cancelPendingChanges"
      @resetChangesCancelled="resetChangesCancelled"
    ></PropertyChecklistField>
    <q-btn
      class="full-width"
      color="blue"
      label="Manage Checklist Items"
      icon="checklist"
      @click="showChecklistEditor"
    />
  </div>
  <q-dialog v-model="checklistModalVisible">
    <q-layout view="Lhh lpR fff" container class="bg-white">
      <q-header class="bg-primary">
        <q-toolbar>
          <q-toolbar-title>Checklist Items</q-toolbar-title>
          <q-btn flat v-close-popup round dense icon="close" />
        </q-toolbar>
      </q-header>
      <q-page-container>
        <q-page>
          <div class="row">
            <div class="col-12">
              <div class="q-pa-md q-ma-md">
                <PropertyBoardSubmitter
                  :currentModelForEditing="{}"
                  @changesCanceled="changesCanceled"
                ></PropertyBoardSubmitter>
              </div>
            </div>
            <div class="col-xs-12">
              <div class="q-pa-md q-ma-md">
                <div :key="index" v-for="(clItem, index) in checklistItems">
                  <q-chip
                    class="q-mb-md"
                    size="lg"
                    text-color="black"
                    style="min-width: 160px"
                    @remove="removeChecklistItem(clItem)"
                    removable
                  >
                    {{ clItem.label }}
                  </q-chip>
                </div>

                <q-input
                  style="display: inline-flex; min-width: 200px"
                  hide-bottom-space
                  class="ratings-criteria-input"
                  outlined
                  dense
                  label="Enter New Checklist Item Here"
                  hint=""
                  v-model="newChecklistItem"
                  @keydown.enter.prevent="addChecklistItem"
                  lazy-rules
                />
              </div>
            </div>
            <div class="col-12">
              <div class="q-pa-md q-ma-md">
                <PropertyBoardSubmitter
                  :currentModelForEditing="{}"
                  @changesCanceled="changesCanceled"
                ></PropertyBoardSubmitter>
              </div>
            </div>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-dialog>
</template>
<script>
// import lodashRemove from "lodash.remove"
import { defineComponent } from "vue"
import PropertyChecklistField from "src/components/editor-forms-parts/PropertyChecklistField.vue"
import PropertyBoardSubmitter from "src/components/editor-forms-parts/PropertyBoardSubmitter.vue"
export default defineComponent({
  inject: ["boardEditProvider"],
  name: "ChecklistSummary",
  components: {
    PropertyChecklistField,
    PropertyBoardSubmitter,
  },
  data() {
    return {
      newChecklistItem: "",
      checklistModalVisible: false,
      cancelPendingChanges: false,
    }
  },
  computed: {
    featuresChecklist() {
      return this.boardEditProvider.state.propertyBoardItem
        .checklist_values_for_features
    },
    checklistItems() {
      return this.boardEditProvider.state.pbCheckListItemsForFeatures
    },
  },
  methods: {
    addChecklistItem() {
      this.boardEditProvider.setPendingChecklistChanges(
        this.newChecklistItem,
        "add"
      )
      this.cancelPendingChanges = true
      this.newChecklistItem = ""
    },
    removeChecklistItem(clItem) {
      this.boardEditProvider.setPendingChecklistChanges(
        clItem.fieldName,
        "remove"
      )
      this.cancelPendingChanges = true
    },
    showChecklistEditor() {
      this.checklistModalVisible = true
    },
    changesCanceled() {
      // submitter will have called       this.boardEditProvider.clearPendingBoardChanges()
      // before getting here
      this.cancelPendingChanges = true
      this.checklistModalVisible = false
    },
    resetChangesCancelled() {
      this.cancelPendingChanges = false
      this.checklistModalVisible = false
    },
  },
})
</script>
