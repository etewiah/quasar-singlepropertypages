<template>
  <q-layout view="lhh LpR ffr">
    <!-- <SppTopAdminSection
      :setupData="setupData"
    ></SppTopAdminSection> -->
    <q-page-container class="main-layout-router-view-cont">
      <router-view
        :setupData="setupDataFromApi"
        @showNotification="showNotification"
      />
    </q-page-container>
    <div class="q-pa-md">
      <q-ajax-bar
        ref="bar"
        position="top"
        color="accent"
        size="10px"
        :skip-hijack="false"
      />
      <!-- <q-btn color="primary" label="Trigger" /> -->
    </div>
  </q-layout>
</template>
<script>
// import coreDefaultSetup from "src/nuggets/setup/core-default.js";
// import SppTopAdminSection from "src/packs/bvh-spp/SppTopAdminSection.vue"
import { defineComponent, ref } from "vue";
import { useQuasar, useMeta } from "quasar";
// import { sharedConfig } from "boot/shared-config";
// import { setupApi } from "boot/axios";
export default defineComponent({
  name: "SppLayout",
  components: {
    // SppTopAdminSection,
  },
  computed: {
    // setupData() {
    //   let setupData = coreDefaultSetup;
    //   if (sharedConfig.CADDYFIED) {
    //     setupData = this.setupDataFromApi;
    //   }
    //   return setupData;
    // },
  },
  setup() {
    const $q = useQuasar();
    // const data = ref(null)
    let setupDataFromApi = ref({
      header_section: "",
    });
    function showNotification(messageToShow) {
      $q.notify(messageToShow);
    }
    return {
      setupDataFromApi,
      showNotification,
      // qLang: $q.lang,
    };
  },
});
</script>
<style></style>
