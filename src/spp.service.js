import axios from "axios"

class SppService {
  createSppFromUrl(dataApiBase, importUrl) {
    let apiUrl = `${dataApiBase}/api_public/v4/spp/create_from_url`
    apiUrl += `?import_url=${importUrl}`
    return axios.get(apiUrl, {})
  }
  // getSpp(dataUrl, beTypeAndVersion) {
  //   beTypeAndVersion = beTypeAndVersion || "v4"
  //   let apiUrl = `${baseURL}${beTypeAndVersion}/${dataUrl}`
  //   console.log(`getting single listing for ${apiUrl}`)
  //   return axios.get(apiUrl, {})
  // }
}
export default new SppService()
