// import axios from "axios"
import coreDefaultSetup from "src/nuggets/core-default-setup.js"

export const configStore = {
  namespaced: true,
  // state: initialState,
  state: {
    // currentPage: {},
    item: {},
    webConfigString: ""
  },
  actions: {
    fetchWebConfig({ commit }, requestDetails) {
      console.log(`requestDetails is ${requestDetails}`)
      // console.log("fetching websetup from local data nugget")
      let stringifiedResponseData = JSON.stringify(coreDefaultSetup)
      console.log("Setupdata is returned with string length of " + stringifiedResponseData.length.toString())
      commit("commitWebConfigData", { webConfigData: { asString: stringifiedResponseData } })
    },
  },
  mutations: {
    commitWebConfigData: (state, { webConfigData }) => {
      console.log("attempting to commitSetupString :")
      // console.log(webConfigData)
      // state.webConfigData.asString = webConfigData.asString
      state.webConfigString = webConfigData //.asString
    },
  },
  getters: {
    getDataApiBase: (state) => {
      // Couldn't figure out how to call getWebConfigData from here
      if (state.webConfigString) {
        let webConfig = JSON.parse(state.webConfigString.asString)
        return webConfig.general.dataApiBase
      } else {
        return "/"
      }
    },
    getWebConfigData: (state) => {
      if (state.webConfigString) {
        return JSON.parse(state.webConfigString.asString)
      } else {
        return {}
      }
    },
  },
}
