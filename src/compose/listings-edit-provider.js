// https://dev.to/nonso/shared-state-management-with-vue-composition-api-2938
import { reactive, computed, readonly } from "vue";

const state = reactive({
  items: [],
  pendingLocationChanges: {},
  currentEditListing: {},
  currentEditRealtyAsset: {},
  editorConfig: {}
})

function setPendingLocationChanges({ fieldDetails, newValue }) {
  state.pendingLocationChanges[fieldDetails.fieldName] = newValue
  fieldDetails.newValue = newValue
  // this.lastChangedField.fieldDetails = fieldDetails
  // this.lastChangedField.lastUpdateStamp = Date.now()
}

function clearPendingLocationChanges() {
  state.pendingLocationChanges = {}
}

function setEditorConfig(incomingData) {
  // let editorConfig = {}
  state.editorConfig = incomingData.editor_setup
}

function setCurrentEditListing(incomingData, listingsGrouping) {
  state.currentEditListing = this.parseCurrentEditListing(incomingData, listingsGrouping)
}

function parseCurrentEditListing(incomingData, listingsGrouping) {
  let currentEditListing = {}
  if (listingsGrouping === "for-sale") {
    currentEditListing = incomingData.mgmt_content.sale_listing
  } else {
    currentEditListing = incomingData.mgmt_content.rental_listing
  }
  return currentEditListing
}

function setCurrentEditRealtyAsset(incomingData, listingsGrouping) {
  let currentEditListing = this.parseCurrentEditListing(incomingData, listingsGrouping)
  let currentEditRealtyAsset = {}
  // A bit convuluted doing all this client side but prefer as it gives
  // me more flexibility down the line
  currentEditRealtyAsset.import_url = incomingData.mgmt_content.realty_asset.import_url
  currentEditRealtyAsset.constructed_area = incomingData.mgmt_content.realty_asset.constructed_area
  currentEditRealtyAsset.count_bedrooms = incomingData.mgmt_content.realty_asset.count_bedrooms
  currentEditRealtyAsset.count_bathrooms = incomingData.mgmt_content.realty_asset.count_bathrooms
  currentEditRealtyAsset.street_number = incomingData.mgmt_content.realty_asset.street_number
  currentEditRealtyAsset.street_address = incomingData.mgmt_content.realty_asset.street_address
  currentEditRealtyAsset.postal_code = incomingData.mgmt_content.realty_asset.postal_code
  currentEditRealtyAsset.city = incomingData.mgmt_content.realty_asset.city
  currentEditRealtyAsset.country = incomingData.mgmt_content.realty_asset.country
  currentEditRealtyAsset.latitude = incomingData.mgmt_content.realty_asset.latitude
  currentEditRealtyAsset.longitude = incomingData.mgmt_content.realty_asset.longitude
  currentEditRealtyAsset.realty_asset_uuid = incomingData.mgmt_content.realty_asset.uuid
  currentEditRealtyAsset.listing_uuid = currentEditListing.uuid
  currentEditRealtyAsset.listing_model_name = currentEditListing.model_name
  state.currentEditRealtyAsset = currentEditRealtyAsset
}
// function addItem(todo) {
//   state.items.push(todo);
// }

// function removeItem(id) {
//   state.items = state.items.filter(item => item.id !== id);
// }

// const totalLength = computed(() => state.items.length);

// const listingUuid = computed(() => {
//   return state.items.length
// });

export const listingsEditProvider = readonly({
  state,
  // totalLength,
  // addItem,
  // removeItem,
  // listingUuid,
  setCurrentEditListing,
  setCurrentEditRealtyAsset,
  parseCurrentEditListing,
  setEditorConfig,
  setPendingLocationChanges,
  clearPendingLocationChanges
});