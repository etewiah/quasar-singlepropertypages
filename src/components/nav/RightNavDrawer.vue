<template>
  <q-drawer
    v-if="drawerVisible"
    v-model="rightDrawerOpenModel"
    side="right"
    show-if-above
    bordered
    class="bg-grey-1"
  >
    <q-list>
      <q-item-label header class="text-grey-8">Actions</q-item-label>
      <q-item clickable>
        <q-btn
          class="full-width"
          :color="listingActionColor"
          label="Preview"
          icon="visibility"
          :to="{ name: sppPreviewRouteName }"
        />
      </q-item>
      <q-item clickable>
        <q-btn
          class="full-width"
          :color="listingActionColor"
          label="Original Listing"
          icon="link"
          :href="originalListingUrl"
          target="_blank"
        />
      </q-item>
      <q-item>
        <q-btn
          class="full-width"
          :color="listingActionColor"
          label="Export To Pdf"
          icon="picture_as_pdf"
          @click="startExportToPdf"
        />
      </q-item>
      <q-item>
        <HomeHuntOverview></HomeHuntOverview>
      </q-item>
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
// import ListingNavItems from "components/nav/ListingNavItems.vue"
import HomeHuntOverview from "components/home-hunt/HomeHuntOverview.vue"
export default defineComponent({
  inject: ["listingsEditProvider"],
  name: "RightNavDrawer",
  components: {
    // ListingNavItems,
    HomeHuntOverview,
  },
  props: {
    drawerVisible: {
      type: Boolean,
    },
    rightDrawerOpen: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  computed: {
    listingActionColor() {
      return "primary"
    },
    sppPreviewRouteName() {
      return "rSppPreview"
    },
    originalListingUrl() {
      let realtyAsset = this.listingsEditProvider.state.currentEditRealtyAsset
      if (realtyAsset.import_url) {
        return realtyAsset.import_url
      } else {
        return "/"
      }
    },
  },
  data() {
    return {
      showPublishModal: false,
      exportToPdfModal: false,
      rightDrawerOpenModel: false,
    }
  },
  watch: {
    rightDrawerOpen: {
      handler(newValue, oldVal) {
        this.rightDrawerOpenModel = newValue
      },
      // deep: true,
      immediate: true,
    },
  },
  methods: {
    startExportToPdf() {
      this.exportToPdfModal = true
    },
    startPublishSpp() {
      this.showPublishModal = true
    },
  },
})
</script>
