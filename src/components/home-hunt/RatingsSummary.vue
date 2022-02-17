<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md column">
      <q-rating
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

            <div class="col-xs-12">
              <RatingsField
                :fieldDetails="{ fieldName: 'location', label: 'Location' }"
                :resourceModel="ratingsBreakdown"
                :cancelPendingChanges="cancelPendingChanges"
                @resetChangesCancelled="resetChangesCancelled"
              ></RatingsField>
            </div>
            <div class="col-xs-12">
              <RatingsField
                :fieldDetails="{
                  fieldName: 'valueForMoney',
                  label: 'Value For Money',
                }"
                :resourceModel="ratingsBreakdown"
                :cancelPendingChanges="cancelPendingChanges"
                @resetChangesCancelled="resetChangesCancelled"
              ></RatingsField>
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
      ratingsModalVisible: false,
      bedroomsFieldDetails: {
        labelEn: "Bedrooms",
        tooltipTextTKey: "",
        autofocus: false,
        fieldName: "count_bedrooms",
        fieldType: "simpleInput",
        qInputType: "number",
        constraints: {
          inputValue: {},
        },
      },
      cancelPendingChanges: false,
      lastChangedField: {
        fieldDetails: {},
        lastUpdateStamp: "",
      },
    }
  },
  computed: {
    overallRatingModel() {
      return this.boardEditProvider.state.propertyBoardItem.rating_overall
    },
    ratingsBreakdown() {
      return this.boardEditProvider.state.propertyBoardItem.ratings_breakdown
      // return {
      //   location: 1,
      //   valueForMoney: 2,
      // }
    },
  },
  methods: {
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
    },
    resetChangesCancelled() {
      this.cancelPendingChanges = false
    },
  },
})
</script>
