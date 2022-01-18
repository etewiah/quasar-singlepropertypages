import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import { configStore } from "./config-store.module"
import { sppStore } from "./spp-store.module"
import { auth } from "./auth.module"

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      configStore,
      sppStore,
      auth
      // example
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: false // process.env.DEBUGGING
  })

  return Store
})
