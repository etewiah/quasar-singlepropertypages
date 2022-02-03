import { boot } from "quasar/wrappers"
import VueGoogleMaps from '@fawmi/vue-google-maps'
import coreDefaultSetup from "src/nuggets/core-default-setup.js"

export default boot(({ app }) => {
  const gak = coreDefaultSetup.general.GMAPS_API_KEY
  app.use(VueGoogleMaps, {
    load: {
      key: gak,
    },
  })
})