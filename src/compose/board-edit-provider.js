// https://dev.to/nonso/shared-state-management-with-vue-composition-api-2938
import { reactive, computed, readonly } from "vue";

const state = reactive({
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
  clearPendingBoardChanges
});