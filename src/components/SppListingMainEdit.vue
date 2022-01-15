<template>
  <div
    class="spp-listing-main-edit bg-gray-200 leading-normal tracking-normal"
    style="font-family: 'Source Sans Pro', sans-serif"
  >
    <HeroClassic
      :isEdit="true"
      :allPhotosForSpp="allPhotosForSpp"
      :heroPageSection="heroPageSection"
      :sppListingDetails="sppViewData"
      :pic_urls="heroPageSection.pic_urls"
      :texts="heroPageSection.texts"
    >
    </HeroClassic>
    <div>
      <div class="container max-w-6xl mx-auto">
        <div class="mx-0">
          <div>
            <div
              v-for="pageSectionForEditing in sppEditPageSections"
              :key="pageSectionForEditing.uuid"
            >
              <SppEditSectionsHost
                :activeEditFabGroup="activeEditFabGroup"
                @setActiveEditFabGroup="setActiveEditFabGroup"
                :isEdit="true"
                :allPhotosForSpp="allPhotosForSpp"
                :currentPageSectionForEditing="pageSectionForEditing"
              ></SppEditSectionsHost>
            </div>
          </div>
        </div>
        <!-- <SectionAdder :currentPageUuid="currentPageUuid"> </SectionAdder> -->
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue"
import { useQuasar } from "quasar"
import { useStore } from "vuex"
import HeroClassic from "src/components/content-page-parts/HeroClassic.vue"
import SppEditSectionsHost from "src/components/sections/SppEditSectionsHost.vue"
// import SppEditSectionsResolver from "src/packs/spp/sections/SppEditSectionsResolver.vue"
// import ClientService from "src/services/client.service"
import axios from "axios"
// import SectionAdder from "src/packs/spp/edit/SectionAdder.vue"
// import { listingsEditStore } from "src/packs/spp/compose-in/listings-edit-provider.js"
export default defineComponent({
  // inject: ["listingsEditStore"],
  components: {
    HeroClassic,
    SppEditSectionsHost,
    // SectionAdder,
  },
  mounted() {
    // SocialSharing // this.loadcurrentListing(this.currentSearchFieldsParams)
  },
  watch: {
    sppViewData: {
      handler(newVal, oldVal) {
        if (newVal && newVal.listing.realty_asset_uuid) {
          // this.runMgmtDataLoad()
        }
      },
    },
  },
  setup(props) {
    const $q = useQuasar()
    const store = useStore()
    const currentEditData = ref(null)
    currentEditData.value = {
      editor_setup: {},
      mgmt_content: {},
    }
    // const route = useRoute()
    // const router = useRouter()
    function runMgmtDataLoad() {
      let realtyAssetUuid = this.sppViewData.listing.realty_asset_uuid
      // console.log(store)
      let webConfigData = store.getters["configStore/getWebConfigData"]
      let dataApiBase = webConfigData.general.dataApiBase || "/"
      ClientService.getMgmtRealtyAsset(dataApiBase, realtyAssetUuid)
        .then((response) => {
          currentEditData.value = response.data
          let listingsGrouping = this.$route.params.listings_grouping
          this.listingsEditStore.setCurrentEditRealtyAsset(
            response.data,
            listingsGrouping
          )
          this.listingsEditStore.setCurrentEditListing(
            response.data,
            listingsGrouping
          )
          this.listingsEditStore.setEditorConfig(response.data)
        })
        .catch((error) => {
          let errorMessage = "SppListingMainEdit Error: "
          if (error) {
            if (error.response) {
              errorMessage +=
                error.response.data.error ||
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString()
            } else {
              errorMessage += error.toString()
            }
          }
          $q.notify({
            color: "negative",
            position: "top",
            message: errorMessage,
            icon: "report_problem",
          })
        })
    }
    return {
      currentEditData,
      runMgmtDataLoad,
    }
  },
  data() {
    return {
      activeEditFabGroup: "0",
    }
  },
  methods: {
    setActiveEditFabGroup(activeEditFabGroupUuid) {
      this.activeEditFabGroup = activeEditFabGroupUuid
    },
  },
  computed: {
    isForSale() {
      return this.$route.params.listings_grouping === "for-sale"
    },
    listingPage() {
      if (this.isForSale) {
        return this.currentEditData.mgmt_content.sale_listing_page
      } else {
        return this.currentEditData.mgmt_content.rental_listing_page
      }
    },
    listingForEdit() {
      if (this.isForSale) {
        return this.currentEditData.mgmt_content.sale_listing
      } else {
        return this.currentEditData.mgmt_content.rental_listing
      }
    },
    currentPageUuid() {
      let currentPageUuid = this.listingPage ? this.listingPage.uuid : ""
      return currentPageUuid
    },
    heroPageSection() {
      let heroPageSection = {
        texts: {},
      }
      this.sppEditPageSections.forEach((pageSection) => {
        if (pageSection.editor_template === "HeroClassic") {
          heroPageSection = pageSection
        }
      })
      return heroPageSection
    },
    sppEditPageSections() {
      return this.sppPageSections
      // let sppEditPageSections = this.listingPage
      //   ? this.listingPage.sections_for_editing
      //   : []
      // sppEditPageSections.forEach((currentPageSection, index) => {
      //   if (sppEditPageSections[index - 2]) {
      //     // Using "-2 above because the section immediately after page hero cannot be moved up"
      //     currentPageSection.previousSectionUuid =
      //       sppEditPageSections[index - 1].uuid
      //   }
      //   if (sppEditPageSections[index + 1]) {
      //     // if (sppEditPageSections[index+1] && sppEditPageSections[index+1].visible_on_page) {
      //     currentPageSection.nextSectionUuid =
      //       sppEditPageSections[index + 1].uuid
      //   }
      // })
      // return sppEditPageSections
    },
    allPhotosForSpp() {
      let allPhotosForSpp = this.listingForEdit
        ? this.listingForEdit.mgmt_pics
        : []
      // TODO - perhaps use a listingForEdit composable store
      // to avoid having to pass this through multiple components to imagepicker
      return allPhotosForSpp
    },
  },
  props: {
    sppPageSections: {
      type: Array,
      default: () => [],
    },
    sppViewData: {
      type: Object,
      default: () => {
        listing: {
        }
        page: {
        }
      },
      required: true,
    },
  },
})
</script>
