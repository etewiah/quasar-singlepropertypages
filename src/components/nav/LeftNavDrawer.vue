<template>
  <q-drawer
    v-model="leftDrawerOpenModel"
    show-if-above
    bordered
    class="bg-grey-1"
  >
    <q-list>
      <q-item-label header class="text-grey-8">Actions</q-item-label>
      <q-item clickable>
        <q-btn
          :to="{ name: sppHomeRouteName }"
          class="full-width"
          color="primary"
          icon="home"
          label="home"
        />
      </q-item>
      <q-item clickable>
        <q-btn
          class="full-width"
          color="brown-5"
          label="Log Out"
          icon="logout"
          @click="logUserOut"
        />
      </q-item>
      <q-item>
        <q-btn
          class="full-width"
          color="blue"
          label="Export To Pdf"
          icon="picture_as_pdf"
          @click="startExportToPdf"
        />
      </q-item>
      <q-item>
        <HomeHuntOverview></HomeHuntOverview>
      </q-item>
      <ListingNavItems></ListingNavItems>
      <!-- <q-btn
          align="around"
          class="full-width"
          color="secondary"
          label="Export To HTML"
          icon="visibility"
          @click="exportSppToHtml"
        />
        <q-btn
          align="around"
          class="full-width"
          color="secondary"
          label="Export To Pdf"
          icon="visibility"
          @click="exportSppToPdf"
        /> -->
      <!-- <q-item clickable>
        <q-btn
          align="around"
          class="full-width"
          color="brown-5"
          label="Publish"
          icon="settings"
          @click="startPublishSpp"
        />
      </q-item> -->
    </q-list>
  </q-drawer>
  <q-dialog v-model="exportToPdfModal">
    <q-card>
      <q-card-section>
        <div class="text-h6">Export to PDF functionality coming soon</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <!-- <h4>Coming soon</h4> -->
        <div>
          Follow progress here:
          <br />
          <a
            target="_blank"
            href="https://github.com/etewiah/quasar-singlepropertypages/issues/1"
            >https://github.com/etewiah/quasar-singlepropertypages/issues/1</a
          >
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="showPublishModal">
    <q-layout view="Lhh lpR fff" container class="bg-white">
      <!-- <SppPublishForm></SppPublishForm> -->
    </q-layout>
  </q-dialog>
</template>
<script>
import { defineComponent, ref } from "vue"
import ListingNavItems from "components/nav/ListingNavItems.vue"
import HomeHuntOverview from "components/home-hunt/HomeHuntOverview.vue"
export default defineComponent({
  name: "LeftNavDrawer",
  components: {
    ListingNavItems,
    HomeHuntOverview,
  },
  computed: {
    sppHomeRouteName() {
      return "rHomePage"
    },
  },
  props: {
    leftDrawerOpen: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  watch: {
    leftDrawerOpen: {
      handler(newValue, oldVal) {
        this.leftDrawerOpenModel = newValue
      },
      // deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      leftDrawerOpenModel: false,
      showPublishModal: false,
      exportToPdfModal: false,
    }
  },
  methods: {
    startExportToPdf() {
      this.exportToPdfModal = true
    },
    logUserOut() {
      this.$q.cookies.set("spp_user_token", null, { path: "/" })
      this.$router.push({ name: "rHomePage" })
      // this.$q.cookies.set("spp_user", null)
      // let sppItemsKey = "spp_items:pwbprem"
      // Clear out locally store SPPs:
      // localStorage.setItem(sppItemsKey, "[]")
      // location.reload()
    },
    // deleteSpp() {},
    startPublishSpp() {
      this.showPublishModal = true
    },
  },
})
</script>
