import axios from "axios"

class SppService {
  createSppFromHtml(dataApiBase, importUrl, rawHtml) {
    let apiUrl = `${dataApiBase}/api_psq/v1/spp/create_from_html`
    apiUrl += `?import_url=${importUrl}`
    let propBoardKey = "prop_board:pwbprem"
    let propBoardUuid = localStorage.getItem(propBoardKey) || ""
    return axios.put(apiUrl, {
      raw_import_html: rawHtml,
      prop_board_uuid: propBoardUuid
    })
  }
  createSppFromUrl(dataApiBase, importUrl) {
    let apiUrl = `${dataApiBase}/api_psq/v1/spp/create_from_url`
    apiUrl += `?import_url=${importUrl}`
    let propBoardKey = "prop_board:pwbprem"
    let propBoardUuid = localStorage.getItem(propBoardKey) || ""
    return axios.put(apiUrl, {
      prop_board_uuid: propBoardUuid
    })
  }
  // getSpp(dataUrl, beTypeAndVersion) {
  //   beTypeAndVersion = beTypeAndVersion || "v4"
  //   let apiUrl = `${baseURL}${beTypeAndVersion}/${dataUrl}`
  //   console.log(`getting single listing for ${apiUrl}`)
  //   return axios.get(apiUrl, {})
  // }
}
export default new SppService()
