<template>
  <div
    class="spp-listing-main-edit bg-gray-200 leading-normal tracking-normal"
    style="font-family: 'Source Sans Pro', sans-serif"
  >
    <div v-if="heroPageSection && heroPageSection.texts">
      <div class="d">
        <div class="col-12">
          <EditPagePart
            activeEditFabGroup="0"
            :currentPageSectionForEditing="heroPageSection"
            :allPhotosForSpp="allPhotosForSpp"
          ></EditPagePart>
        </div>
      </div>
    </div>
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
import { filter } from "lodash"
// import { useStore } from "vuex"
import HeroClassic from "src/components/content-page-parts/HeroClassic.vue"
import SppEditSectionsHost from "src/components/sections/SppEditSectionsHost.vue"
// import SppEditSectionsResolver from "src/packs/spp/sections/SppEditSectionsResolver.vue"
import useMgmtService from "src/compose/useMgmtService.js"
// import SectionAdder from "src/packs/spp/edit/SectionAdder.vue"
import EditPagePart from "src/components/content-page-parts-edit/EditPagePart.vue"
export default defineComponent({
  inject: ["listingsEditProvider", "boardEditProvider"],
  components: {
    HeroClassic,
    SppEditSectionsHost,
    EditPagePart,
    // SectionAdder,
  },
  mounted() {
    // SocialSharing // this.loadcurrentListing(this.currentSearchFieldsParams)
  },
  watch: {
    sppViewData: {
      handler(newVal, oldVal) {
        if (newVal && newVal.listing.realty_asset_uuid) {
          this.runEditorDataLoad()
        }
      },
    },
  },
  setup() {
    const $q = useQuasar()
    // const store = useStore()
    const currentEditData = ref(null)
    currentEditData.value = {
      editor_setup: {},
      mgmt_content: {},
    }
    const { getMgmtRealtyAsset } = useMgmtService()
    function runEditorDataLoad() {
      let realtyAssetUuid = this.sppViewData.listing.realty_asset_uuid
      getMgmtRealtyAsset(realtyAssetUuid)
        .then((response) => {
          currentEditData.value = response.data
          let listingsGrouping = this.$route.params.listings_grouping
          this.boardEditProvider.setCurrentPropertyBoardItem(
            response.data.mgmt_content.property_board_item
          )
          this.boardEditProvider.setCurrentPropertyBoard(
            response.data.mgmt_content.property_board
          )
          this.listingsEditProvider.setCurrentEditRealtyAsset(
            response.data,
            listingsGrouping
          )
          this.listingsEditProvider.setCurrentEditListing(
            response.data,
            listingsGrouping
          )
          this.listingsEditProvider.setEditorConfig(response.data)
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
      runEditorDataLoad,
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
      let allSppEditPageSections = this.listingPage
        ? this.listingPage.sections_for_editing
        : []
      allSppEditPageSections.forEach((pageSection) => {
        if (pageSection.editor_template === "HeroClassic") {
          heroPageSection = pageSection
        }
      })
      return heroPageSection
    },
    sppEditPageSections() {
      // return this.sppPageSections
      let sppEditPageSections = this.listingPage
        ? this.listingPage.sections_for_editing
        : []
      // lodashRemove(sppEditPageSections, function (pageSection) {
      //   return pageSection.editor_template === "HeroClassic"
      // })
      let sectionsToReturn = filter(
        sppEditPageSections,
        function (pageSection) {
          return !!!["HeroClassic", "ListingEnquirySection"].includes(
            pageSection.editor_template
          )
        }
      )
      sectionsToReturn.forEach((currentPageSection, index) => {
        if (sectionsToReturn[index - 1]) {
          currentPageSection.previousSectionUuid =
            sectionsToReturn[index - 1].uuid
        }
        if (sectionsToReturn[index + 1]) {
          // if (sectionsToReturn[index+1] && sectionsToReturn[index+1].visible_on_page) {
          currentPageSection.nextSectionUuid = sectionsToReturn[index + 1].uuid
        }
      })
      return sectionsToReturn
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
