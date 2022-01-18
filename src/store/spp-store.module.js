import axios from "axios"
// import SppService from "src/services/spp.service"
// import store from "./index"
// import { configStore } from "./config-store.module"
// import { useRouter } from "vue-router"

export const sppStore = {
  namespaced: true,
  // state: initialState,
  state: {
    item: {},
    sppViewDataString: ""
  },
  actions: {
    fetchSpp({ commit }, listingParams) {
      // https://newbedev.com/vuex-access-state-from-another-module
      // just need "this." to be able to access other stores:
      let webConfigData = this.getters["configStore/getWebConfigData"]
      let dataApiBase = webConfigData.general.dataApiBase || "/"
      let listingsGrouping = "for-sale"
      let listingSlug = listingParams.listingSlug
      // dataUrl += "/custom"
      let beTypeAndVersion = "v4"
      let dataUrl = `${dataApiBase}/api_public/${beTypeAndVersion}/spp/${listingsGrouping}/${listingSlug}`
      console.log(`Fetching SPP from ${dataUrl}`)
      return axios.get(dataUrl)
        .then((response) => {
          if (response.data) {
            let stringifiedResponseData = JSON.stringify(response.data)
            console.log("...resp is returned with string length of " + stringifiedResponseData.length.toString())
            commit("commitSpp", { sppViewData: { asString: stringifiedResponseData } })
          } else {
            console.log("resp empty")
          }
          return response
          // return Promise.resolve(response)
          // this.listingsStore.setCurrentListingAndPage(response.data)
          // currentListingData.value = response.data
        })
        .catch((error) => {
          console.log("Error prefetching SPP")
          console.log(error)
        })
    },
  },
  getters: {
    // getWebConfigData: (state) => {
    //   if (state.webConfigString) {
    //     return JSON.parse(state.webConfigString.asString)
    //   } else {
    //     return {}
    //   }
    // },
  },
  mutations: {
    commitSpp: (state, { sppViewData }) => {
      console.log("attempting to commitSppString :")
      // console.log(sppViewData)
      // state.sppViewData.asString = sppViewData.asString
      state.sppViewDataString = sppViewData.asString
    },
  },
}
