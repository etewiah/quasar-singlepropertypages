<template>
  <q-header v-if="showAdminSection" elevated>
    <q-toolbar style="" class="spp-top-admin-bg">
      <q-btn
        flat
        dense
        round
        class=""
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      />
      <!-- <q-toolbar-title class="mobile-hide">
        <q-btn
          :to="{ name: sppHomeRouteName }"
          color="primary"
          icon="home"
          label="home"
        />
        <q-btn
          align="around"
          class="btn-fixed-width q-ml-md"
          color="brown-5"
          label="Log Out"
          icon="logout"
          @click="logUserOut"
        />
      </q-toolbar-title> -->
      <q-tabs align="right" class="sta-q-tabs full-width" style="">
        <div class="float-right">
          <q-btn
            align="around"
            class="btn-fixed-width q-mr-md"
            color="blue"
            label="Preview"
            icon="visibility"
            :to="{ name: sppPreviewRouteName }"
          />
          <!-- <q-btn
          align="around"
          class="btn-fixed-width q-mr-md"
          color="secondary"
          label="Export To HTML"
          icon="visibility"
          @click="exportSppToHtml"
        />
        -->

          <!-- <q-btn
            align="around"
            class="btn-fixed-width q-mr-md"
            color="red"
            label="Delete"
            icon="delete"
            @click="deleteSpp"
          /> -->
          <!-- <q-btn
            align="around"
            class="btn-fixed-width q-mr-md"
            color="brown-5"
            label="Publish"
            icon="settings"
            @click="startPublishSpp"
          /> -->
        </div>
      </q-tabs>
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
    </q-toolbar>
  </q-header>

  <q-drawer
    v-if="showAdminSection"
    v-model="leftDrawerOpen"
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
      <!-- <EssentialLink
        v-for="link in essentialLinks"
        :key="link.title"
        v-bind="link"
      /> -->
      <q-item clickable>
        <q-btn
          class="full-width"
          color="blue"
          label="Preview"
          icon="visibility"
          :to="{ name: sppPreviewRouteName }"
        />
      </q-item>
      <q-item clickable>
        <q-btn
          class="full-width"
          color="blue"
          label="Original Listing"
          icon="link"
          :href="originalListingUrl"
          target="_blank"
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
</template>
<script>
// import Jspdf from "jspdf"
// import useClientService from "src/compose/useClientService.js"
// import SppPublishForm from "src/packs/bvh-spp/SppPublishForm.vue"
import HomeHuntOverview from "components/home-hunt/HomeHuntOverview.vue"

import { ref } from "vue"
// // let domtoimage = {}
// if (!process.env.SERVER) {
//   // domtoimage = require("dom-to-image-more")
//   // import domtoimage from "dom-to-image-more"
// }
// Idea for above from:
// https://forum.quasar-framework.org/topic/2576/ssr-window-is-not-defined/2
export default {
  inject: ["listingsEditProvider"],
  components: {
    // SppPublishForm,
    HomeHuntOverview,
  },
  props: {},
  data() {
    return {
      showPublishModal: false,
      exportToPdfModal: false,
    }
  },
  setup() {
    // const { deleteRealtyAssetAndAssocs } = useClientService()
    const leftDrawerOpen = ref(false)
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      // deleteRealtyAssetAndAssocs,
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
    deleteSpp() {
      // let realtyAssetUuid =
      //   this.listingsEditProvider.state.currentEditRealtyAsset.realty_asset_uuid
      // // let dataApiBase = this.$store.getters["configStore/getDataApiBase"]
      // this.deleteRealtyAssetAndAssocs(realtyAssetUuid).then((response) => {
      //   // TODO - find a better way to refresh than this:
      //   // location.reload()
      // })
    },
    startPublishSpp() {
      this.showPublishModal = true
    },
    exportSppToPdf() {
      // // let doc = new Jspdf()
      // let doc = new Jspdf({
      //   orientation: "p",
      //   unit: "px",
      //   format: "a4",
      //   hotfixes: ["px_scaling"],
      // })
      // // let fullCurrentHtml = document.documentElement.outerHTML
      // // let contentHtml = this.$refs.qr.$el
      // // let image = fullCurrentHtml.toDataURL("image/jpeg", 0.8)
      // let currentDocEl = document.documentElement
      // let imageOpts = {
      //   width: currentDocEl.scrollWidth,
      //   height: currentDocEl.scrollHeight,
      //   style: {
      //     // transform: "scale(2)",
      //     // "transform-origin": "top left",
      //   },
      // }
      // domtoimage
      //   .toPng(currentDocEl, imageOpts)
      //   .then(function (dataUrl) {
      //     var image = new Image()
      //     image.src = dataUrl
      //     // document.body.appendChild(img)
      //     doc.addImage(image, "JPEG", 20, 20)
      //     doc.save("sample.pdf")
      //   })
      //   .catch(function (error) {
      //     console.error("oops, something went wrong!", error)
      //   })
      // // doc.addImage(image, "JPEG", 20, 20)
      // // doc.save("sample.pdf")
    },
    exportSppToHtml() {
      let fullCurrentHtml = document.documentElement.outerHTML
      this.downloadCurrentPage("Demo SPP", fullCurrentHtml)
    },
    downloadCurrentPage(filename, text) {
      var element = document.createElement("a")
      element.setAttribute(
        "href",
        "data:text/html;charset=utf-8," + encodeURIComponent(text)
      )
      // filename = args.filename || "report.html"
      // data = "data:text/html;charset=utf-8," + encodeURIComponent(csv)
      // console.log(data)
      element.setAttribute("download", filename)
      element.style.display = "none"
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    },
    // Start file download.
    // download("hello.txt","This is the content of my file :)");
  },
  computed: {
    originalListingUrl() {
      let realtyAsset = this.listingsEditProvider.state.currentEditRealtyAsset
      if (realtyAsset.import_url) {
        return realtyAsset.import_url
      } else {
        return "/"
      }
    },
    sppPreviewRouteName() {
      return "rSppPreview"
    },
    sppHomeRouteName() {
      return "rHomePage"
    },
    showAdminSection() {
      return ["rSppEdit"].includes(this.$route.name)
    },
    //   return textForAction
    // },
  },
}
</script>
<style>
.spp-top-admin-bg {
  background-color: #48bb78;
}
</style>
