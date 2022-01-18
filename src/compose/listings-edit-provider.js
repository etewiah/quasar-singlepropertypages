// https://dev.to/nonso/shared-state-management-with-vue-composition-api-2938
import { reactive, computed, readonly } from "vue";

const state = reactive({
  items: [],
  currentEditListing: {},
  currentEditRealtyAsset: {},
  editorConfig: {}
})

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
  currentEditRealtyAsset.constructed_area = incomingData.mgmt_content.realty_asset.constructed_area
  currentEditRealtyAsset.count_bedrooms = incomingData.mgmt_content.realty_asset.count_bedrooms
  currentEditRealtyAsset.count_bathrooms = incomingData.mgmt_content.realty_asset.count_bathrooms
  currentEditRealtyAsset.country = incomingData.mgmt_content.realty_asset.country
  currentEditRealtyAsset.city = incomingData.mgmt_content.realty_asset.city
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
  setEditorConfig
});