import { useStore } from "vuex"
import axios from "axios"
import authHeader from "src/services/auth/auth-header"

export default function () {
  const store = useStore()
  let dataApiBase = store.getters["configStore/getDataApiBase"]

  function deleteRealtyAssetAndAssocs(realtyAssetUuid) {
    let apiUrl = `${dataApiBase}/api_clients/v4/realty_assets/${realtyAssetUuid}/with_assocs`
    return axios.delete(apiUrl, { headers: authHeader() })
  }
  function addPageSection(pageForEditingUuid, newSectionConfig) {
    // console.log(store)
    let section_position = { placement: "last" }
    // if (sectionUuidAfterNew) {
    //   section_position = {
    //     placement: "before",
    //     reference_uuid: sectionUuidAfterNew,
    //   }
    // }
    let content_locale = "en"
    let addSectionData = {
      new_section_config: newSectionConfig,
      // section_uuid_after_new: sectionUuidAfterNew,
      section_position: section_position,
      content_locale: content_locale,
    }
    let mgmtBaseURL = `${dataApiBase}/api_mgmt/`
    let apiUrl = `${mgmtBaseURL}v4/pages/${pageForEditingUuid}/add_spp_section`
    return axios.put(apiUrl, addSectionData, { headers: authHeader() })
  }

  function duplicatePageSection(pageSectionUuid) {
    let mgmtBaseURL = `${dataApiBase}/api_mgmt/`
    let apiUrl = `${mgmtBaseURL}v4/duplicate_page_section/${pageSectionUuid}`
    return axios.put(apiUrl, {}, { headers: authHeader() })
  }
  // checkCurrentUser() {
  //   let apiUrl = `${baseURL}v4/check_user`
  //   return axios.get(apiUrl, { headers: authHeader() })
  // }
  // getListingDetails(editorUiLocale, realtyAssetUuid, contentLocale, beTypeAndVersion) {
  //   beTypeAndVersion = beTypeAndVersion || "v4"
  //   let apiUrl = `${baseURL}${beTypeAndVersion}/${editorUiLocale}/listings_mgmt_data/${realtyAssetUuid}/${contentLocale}`
  //   return axios.get(apiUrl, { headers: authHeader() })
  // }
  // getPageDetails(editorUiLocale, pageUuid, contentLocale) {
  //   let apiUrl = `${baseURL}v4/${editorUiLocale}/page_mgmt_data/${pageUuid}/${contentLocale}`
  //   return axios.get(apiUrl, { headers: authHeader() })
  // }
  // getAllRealtyAssets(contentLocale) {
  //   let apiUrl = `${baseURL}v4/${contentLocale}/realty_assets/all`
  //   return axios.get(apiUrl, { headers: authHeader() })
  // }
  function getMgmtRealtyAsset(realtyAssetUuid) {
    let mgmtBaseURL = `${dataApiBase}/api_mgmt/`
    // /api_mgmt/v4/sale_listings/5104ae86-638a-4fc5-bf5d-6d2d7b8bca06
    let apiUrl = `${mgmtBaseURL}v4/realty_assets/by_uuid/${realtyAssetUuid}`
    return axios.get(apiUrl, { headers: authHeader() })
  }
  function getMgmtBoard(boardUuid) {
    let mgmtBaseURL = `${dataApiBase}/api_psq/`
    let apiUrl = `${mgmtBaseURL}v1/property_boards/${boardUuid}`
    return axios.get(apiUrl, { headers: authHeader() })
  }
  function putRealtyAssetWithListing(putData) {
    let mgmtBaseURL = `${dataApiBase}/api_mgmt/`
    let apiUrl = `${mgmtBaseURL}v4/realty_asset_plus_listing`
    return axios.put(apiUrl, putData, { headers: authHeader() })
  }
  function putListingFeatures(putData) {
    let mgmtBaseURL = `${dataApiBase}/api_mgmt/`
    let apiUrl = `${mgmtBaseURL}v4/realty_asset_plus_listing/update_features`
    return axios.put(apiUrl, putData, { headers: authHeader() })
  }
  function putPageSection(pageSectionUuid, putData) {
    let mgmtBaseURL = `${dataApiBase}/api_mgmt/`
    let apiUrl = `${mgmtBaseURL}v4/page_sections/${pageSectionUuid}`
    return axios.put(apiUrl, putData, { headers: authHeader() })
  }
  function putPropertyBoardItem(putData) {
    let mgmtBaseURL = `${dataApiBase}/api_psq/`
    let apiUrl = `${mgmtBaseURL}v1/property_board_items/${putData.property_board_item_uuid}`
    return axios.put(apiUrl, putData, { headers: authHeader() })
  }
  function putPropertyBoardItemChecklistValue(putData) {
    let mgmtBaseURL = `${dataApiBase}/api_psq/`
    let apiUrl = `${mgmtBaseURL}v1/property_board_items/${putData.property_board_item_uuid}`
    apiUrl += `/checklist/${putData.checklist_group}/${putData.checklist_group_item}/${putData.checklist_group_item_value}`
    return axios.put(apiUrl, putData, { headers: authHeader() })
  }
  return {
    getMgmtBoard,
    putPropertyBoardItem,
    putPropertyBoardItemChecklistValue,
    getMgmtRealtyAsset,
    putPageSection,
    addPageSection,
    deleteRealtyAssetAndAssocs,
    duplicatePageSection,
    putListingFeatures,
    putRealtyAssetWithListing
  }
}