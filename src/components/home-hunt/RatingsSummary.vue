<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md column">
      <q-rating
        readonly
        v-model="overallRatingModel"
        size="2.5em"
        color="green-5"
        icon="star_border"
        icon-selected="star"
        @click="showRatingsBreakdown"
      />
    </div>
  </div>
  <q-dialog v-model="ratingsModalVisible">
    <q-layout view="Lhh lpR fff" container class="bg-white">
      <q-header class="bg-primary">
        <q-toolbar>
          <!-- <q-btn flat @click="drawer = !drawer" round dense icon="menu" /> -->
          <q-toolbar-title>Rate this property</q-toolbar-title>
          <!-- <q-btn flat @click="drawerR = !drawerR" round dense icon="menu" /> -->
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
            <div v-if="isEditRatingValuesMode" class="col-xs-12">
              <RatingsField
                v-for="(concern, index) in ratingsConcerns"
                :key="index"
                :fieldDetails="concern"
                :resourceModel="ratingsBreakdown"
                :cancelPendingChanges="cancelPendingChanges"
                @resetChangesCancelled="resetChangesCancelled"
              ></RatingsField>
            </div>
            <div v-else class="col-xs-12">
              <div class="q-pa-md q-ma-md">
                <q-chip
                  class="q-mb-md"
                  v-for="(concern, index) in ratingsConcerns"
                  :key="index"
                  color="teal"
                  text-color="white"
                  @remove="removeRatingCriteria(concern)"
                  removable
                >
                  {{ concern.label }}
                </q-chip>
                <q-input
                  style="display: inline-flex"
                  hide-bottom-space
                  class="ratings-criteria-input"
                  outlined
                  dense
                  label="New Rating Option"
                  hint=""
                  v-model="newRatingCriteria"
                  @keydown.enter.prevent="addRatingCriteria"
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
            <div class="col-12">
              <div class="q-pa-md q-ma-md float-right">
                <q-toggle
                  :false-value="true"
                  label="Edit Rating Options"
                  :true-value="false"
                  color="green"
                  v-model="isEditRatingValuesMode"
                />
              </div>
              <!-- <div class="q-pa-md q-ma-md">
                <a @click="changeEditRatingValuesMode">Edit ratings criteria</a>
              </div> -->
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
import RatingsField from "src/components/editor-forms-parts/RatingsField.vue"
import PropertyBoardSubmitter from "src/components/editor-forms-parts/PropertyBoardSubmitter.vue"
export default defineComponent({
  inject: ["boardEditProvider"],
  name: "RatingsSummary",
  components: {
    RatingsField,
    PropertyBoardSubmitter,
  },
  data() {
    return {
      newRatingCriteria: "",
      ratingsModalVisible: false,
      cancelPendingChanges: false,
      // lastChangedField: {
      //   fieldDetails: {},
      //   lastUpdateStamp: "",
      // },
      editableRatingsConcerns: {},
      isEditRatingValuesMode: true,
    }
  },
  computed: {
    overallRatingModel() {
      return this.boardEditProvider.state.propertyBoardItem.rating_overall || 0
    },
    ratingsBreakdown() {
      return this.boardEditProvider.state.propertyBoardItem.ratings_breakdown
    },
    ratingsConcerns() {
      // return {
      //   location: {
      //     fieldName: "location",
      //     label: "Location",
      //   },
      //   valueForMoney: {
      //     fieldName: "valueForMoney",
      //     label: "Value For Money",
      //   },
      // }
      return this.boardEditProvider.state.propertyBoardRatingConcerns
    },
  },
  methods: {
    // changeEditRatingValuesMode() {
    //   this.isEditRatingValuesMode = false
    // },
    addRatingCriteria() {
      // let ratingConcerns = this.ratingsConcerns
      // let newCriteriaParam = this.newRatingCriteria
      //   .trim()
      //   .toLowerCase()
      //   .replace(/[^a-zA-Z0-9 -]/, "")
      //   .replace(/\s/g, "-")
      // ratingConcerns[newCriteriaParam] = {
      //   fieldName: newCriteriaParam,
      //   label: this.newRatingCriteria,
      // }
      this.boardEditProvider.setPendingRatingConcernsChanges(
        this.newRatingCriteria,
        "add"
      )
      this.cancelPendingChanges = true
      this.newRatingCriteria = ""
    },
    removeRatingCriteria(concern) {
      this.boardEditProvider.setPendingRatingConcernsChanges(
        concern.fieldName,
        "remove"
      )
      this.cancelPendingChanges = true
    },
    showRatingsBreakdown() {
      this.ratingsModalVisible = true
    },
    // updatePendingChanges({ fieldDetails, newValue }) {
    //   fieldDetails.newValue = newValue
    //   // Dec 2021 - previous I had set above in child component but now linter
    //   // complains about modifying a prop so doing it here
    //   this.lastChangedField.fieldDetails = fieldDetails
    //   this.lastChangedField.lastUpdateStamp = Date.now()
    //   this.cancelPendingChanges = false
    // },
    changesCanceled() {
      // submitter will have called       this.boardEditProvider.clearPendingBoardChanges()
      // before getting here
      this.cancelPendingChanges = true
      this.isEditRatingValuesMode = true
    },
    resetChangesCancelled() {
      this.cancelPendingChanges = false
    },
  },
})
</script>
