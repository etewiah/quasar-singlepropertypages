import axios from "axios"
// import { Cookies, LocalStorage, useQuasar } from "quasar"
// const $q = useQuasar()
// const user = JSON.parse(LocalStorage.getItem("user"))
// const cookies = Cookies

// const sppUser = cookies.get("spp_user")
// // const user = JSON.parse(localStorage.getItem("user"))
// const initialState = sppUser
//   ? { status: { loggedIn: true }, sppUser }
//   : { status: { loggedIn: false }, user: null }
// - Above does not work so will have to ignore attempt to set initialState:(
// In any case it is easier to read cookies directly in preFetch hook
// which is where I want to determine if user is logged in.
const initialState = { status: {} }

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, userParams) {
      let dataApiBase = this.getters["configStore/getDataApiBase"]
      let loginUrl = `${dataApiBase}/api_clients/v4/login`
      return axios
        .post(loginUrl, {
          email: userParams.email,
          password: userParams.password,
        })
        .then((response) => {
          let sppUser = {}
          if (response.data.user.accessToken) {
            sppUser = {
              accessToken: response.data.user.accessToken,
              uuid: response.data.user.uuid,
              email: response.data.user.email,
            }
            commit("loginSuccess", sppUser)
            // localStorage.setItem("user", JSON.stringify(sppUser))
            // $q.cookies.set("spp_user", user)
          }
          // return Promise.resolve(sppUser)
          // loginSuccess(state, sppUser) {
          return sppUser
        })

    },
    // logout({ commit }) {
    //   AuthService.logout()
    //   commit("logout")
    // },
    // register({ commit }, user) {
    //   return AuthService.register(user).then(
    //     (response) => {
    //       commit("registerSuccess")
    //       return Promise.resolve(response.data)
    //     },
    //     (error) => {
    //       commit("registerFailure")
    //       return Promise.reject(error)
    //     }
    //   )
    // },
  },
  mutations: {
    loginSuccess(state, sppUser) {
      state.status.loggedIn = true
      state.user = sppUser.user
    },
    loginFailure(state) {
      state.status.loggedIn = false
      state.user = null
    },
    logout(state) {
      state.status.loggedIn = false
      state.user = null
    },
    registerSuccess(state) {
      state.status.loggedIn = false
    },
    registerFailure(state) {
      state.status.loggedIn = false
    },
  },
}
