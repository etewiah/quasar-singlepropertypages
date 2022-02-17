// https://dev.to/nonso/shared-state-management-with-vue-composition-api-2938
import { reactive, computed, readonly } from "vue";

const state = reactive({
  propertyBoardRatingConcerns: {},
  pendingBoardChanges: {
    // checklist_values_for_features: {},
    // ratings_breakdown: {}
  },
  currentEditListing: {},
  propertyBoardItem: {},
  propertyBoard: {}
})

function setPendingBoardRatingsChanges({ fieldDetails, newValue }) {
  let ratingsBreakdown = state.pendingBoardChanges.ratings_breakdown || {}
  ratingsBreakdown[fieldDetails.fieldName] = newValue
  state.pendingBoardChanges.ratings_breakdown = ratingsBreakdown
  fieldDetails.newValue = newValue
}

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
  //  this.parseCurrentEditListing(propertyBoard)
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
  setCurrentPropertyBoardItem,
  setCurrentPropertyBoard,
  // parseCurrentEditListing,
  setPendingBoardChanges,
  setPendingBoardRatingsChanges,
  setPendingRatingConcernsChanges,
  clearPendingBoardChanges
});