// https://dev.to/nonso/shared-state-management-with-vue-composition-api-2938
import { reactive, computed, readonly } from "vue";

const state = reactive({
  pbCheckListItemsForFeatures: {},
  propertyBoardRatingConcerns: {},
  pendingBoardChanges: {
    // checklist_values_for_features: {},
    // ratings_breakdown: {}
  },
  currentEditListing: {},
  propertyBoardItem: {},
  propertyBoard: {},
  propertyBoardItems: []
})

// Called when the value of a rating_item is set on a property
function setPendingBoardRatingsChanges({ fieldDetails, newValue }) {
  let ratingsBreakdown = state.pendingBoardChanges.ratings_breakdown || {}
  ratingsBreakdown[fieldDetails.fieldName] = newValue
  state.pendingBoardChanges.ratings_breakdown = ratingsBreakdown
  fieldDetails.newValue = newValue
}

// Called a rating_item is added or removed to a board
function setPendingRatingConcernsChanges(ratingCriteria, addOrRemove) {
  if (addOrRemove === "add") {
    let newCriteriaParam = ratingCriteria
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 -]/, "")
      .replace(/\s/g, "-")
    state.propertyBoardRatingConcerns[newCriteriaParam] = {
      // ratingConcerns[newCriteriaParam] = {
      fieldName: newCriteriaParam,
      label: ratingCriteria,
    }
  }
  if (addOrRemove === "remove") {
    // let ratingConcerns = this.ratingsConcerns
    // lodashRemove(ratingConcerns, function (n) {
    //   return n.fieldName === concern.fieldName
    // })
    delete state.propertyBoardRatingConcerns[ratingCriteria]
  }
  state.pendingBoardChanges["rating_concerns"] = state.propertyBoardRatingConcerns
}

// Called when the value of a check_list item is set on a property
// function setPendingChecklistValueChanges({ fieldDetails, newValue }) {
//   let checklistValuesForFeatures = state.pendingBoardChanges.checklist_values_for_features || {}
//   checklistValuesForFeatures[fieldDetails.fieldName] = newValue
//   state.pendingBoardChanges.checklist_values_for_features = checklistValuesForFeatures
//   fieldDetails.newValue = newValue
// }

// Called a check_list item is added or removed for a board
function setPendingChecklistChanges(ratingCriteria, addOrRemove) {
  if (addOrRemove === "add") {
    let newCriteriaParam = ratingCriteria
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 -]/, "")
      .replace(/\s/g, "-")
    state.pbCheckListItemsForFeatures[newCriteriaParam] = {
      // ratingConcerns[newCriteriaParam] = {
      fieldName: newCriteriaParam,
      label: ratingCriteria,
    }
  }
  if (addOrRemove === "remove") {
    delete state.pbCheckListItemsForFeatures[ratingCriteria]
  }
  state.pendingBoardChanges["checklist_items_for_features"] = state.pbCheckListItemsForFeatures
}

function setPendingBoardChanges({ fieldDetails, newValue }) {
  state.pendingBoardChanges[fieldDetails.fieldName] = newValue
  fieldDetails.newValue = newValue
}

function clearPendingBoardChanges() {
  state.pendingBoardChanges = {}
}

function setCurrentPropertyBoardItem(propertyBoardItem) {
  state.propertyBoardItem = propertyBoardItem
  //  this.parseCurrentEditListing(propertyBoardItem)
}
function setCurrentPropertyBoard(propertyBoard) {
  state.propertyBoard = propertyBoard
  state.propertyBoardRatingConcerns = propertyBoard.rating_concerns
  state.pbCheckListItemsForFeatures = propertyBoard.checklist_items_for_features
  //  this.parseCurrentEditListing(propertyBoard)
}
function setCurrentPropertyBoardItems(propertyBoardItems) {
  state.propertyBoardItems = propertyBoardItems
  //  this.parseCurrentEditListing(propertyBoardItem)
}

// function parseCurrentEditListing(incomingData, listingsGrouping) {
//   let currentEditListing = {}
//   if (listingsGrouping === "for-sale") {
//     currentEditListing = incomingData.mgmt_content.sale_listing
//   } else {
//     currentEditListing = incomingData.mgmt_content.rental_listing
//   }
//   return currentEditListing
// }


export const boardEditProvider = readonly({
  state,
  setCurrentPropertyBoardItems,
  setCurrentPropertyBoardItem,
  setCurrentPropertyBoard,
  // parseCurrentEditListing,
  setPendingBoardChanges,
  setPendingBoardRatingsChanges,
  setPendingRatingConcernsChanges,
  setPendingChecklistChanges,
  // setPendingChecklistValueChanges,
  clearPendingBoardChanges
});