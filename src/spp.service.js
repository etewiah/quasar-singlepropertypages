import axios from "axios"
// import { sharedConfig } from "boot/shared-config"

// let baseURL = `${sharedConfig.BE_API_BASE}/api_public/` // ${beTypeAndVersion}`

class SppService {
  createSppFromUrl(dataApiBase, importUrl) {
    debugger
    // importUrl = "https://www.rightmove.co.uk/properties/115881926"
    // let apiUrl = "http://spp.lvh.me:3000/api_dashboard/v1/spp/dashboard_setup/319c7ad5-c670-404e-9b06-6695985c8532/91c20424-42d8-45c8-95c9-ced3616e5fa3"
    // https://burns-be1.app.test
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
