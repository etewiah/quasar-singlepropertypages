import axios from "axios"
import { LocalStorage } from "quasar"

// const $q = useQuasar()
const user = JSON.parse(LocalStorage.getItem("user"))

// const user = JSON.parse(localStorage.getItem("user"))
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null }
// Spt 2021 - Above does not work :(

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
          if (response.data.user.accessToken) {
            let userData = {
              accessToken: response.data.user.accessToken,
              uuid: response.data.user.uuid,
              email: response.data.user.email,
              // user: {
              //   uuid: response.data.user.uuid,
              //   email: response.data.user.email,
              // },
            }
            localStorage.setItem("user", JSON.stringify(userData))
          }
          commit("loginSuccess", userData)
          // return Promise.resolve(userData)
          // loginSuccess(state, userData) {
          return response.data
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
    loginSuccess(state, userData) {
      state.status.loggedIn = true
      state.user = userData.user
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
