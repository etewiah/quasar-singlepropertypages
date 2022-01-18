<template>
  <q-layout view="lhh LpR ffr">
    <SppTopAdminSection></SppTopAdminSection>
    <q-page-container class="main-layout-router-view-cont">
      <router-view @showNotification="showNotification" />
    </q-page-container>
    <div class="ajax-bar-container">
      <q-ajax-bar
        ref="bar"
        position="top"
        color="accent"
        size="10px"
        :skip-hijack="false"
      />
    </div>
  </q-layout>
</template>
<script>
import SppTopAdminSection from "src/components/SppTopAdminSection.vue"
import { defineComponent, ref } from "vue"
import { useQuasar, useMeta } from "quasar"
export default defineComponent({
  name: "SppLayout",
  components: {
    SppTopAdminSection,
  },
  preFetch({
    store,
    currentRoute,
    previousRoute,
    redirect,
    ssrContext,
    urlPath,
    publicPath,
  }) {
    let originProtocolAndHost = `${
      ssrContext.req.protocol
    }://${ssrContext.req.get("Host")}`
    console.log(`originProtocolAndHost is ${originProtocolAndHost}`);
    let requestDetails = {
      originProtocolAndHost: originProtocolAndHost,
    }
    return store.dispatch("configStore/fetchWebConfig", requestDetails).then(
      (data) => {
        // console.log(data)
      },
      (error) => {}
    )
  },
  computed: {},
  setup() {
    // const metaData = {
    //   // // sets document title
    //   // title: sharedConfig.defaultPageTitle,
    //   // // optional; sets final title as "Index Page - My Website", useful for multiple level meta
    //   // // titleTemplate: (title) => `${title} - My Website`,
    //   // // meta tags
    //   // meta: {
    //   //   description: {
    //   //     name: "description",
    //   //     content: sharedConfig.defaultPageDesc,
    //   //   },
    //   //   // keywords: { name: "keywords", content: "Quasar website" },
    //   // },
    //   // <noscript> tags
    //   noscript: {
    //     default: "Please enable javascript to be able to use this site.",
    //   },
    // }
    // useMeta(() => {
    //   return metaData
    // })
    const $q = useQuasar()
    function showNotification(notificationMessage) {
      $q.notify(notificationMessage)
    }
    return {
      showNotification,
      // qLang: $q.lang,
    }
  },
})
</script>
<style></style>
