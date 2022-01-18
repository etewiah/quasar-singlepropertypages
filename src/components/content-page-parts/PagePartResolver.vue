<template>
  <div class="col-12 gen-temp-resolver">
    <SppCarousel
      v-if="editorTemplate === 'SppCarousel'"
      :pic_urls="pic_urls"
      :texts="texts"
    ></SppCarousel>
    <ListingAttributesSection
      v-else-if="editorTemplate === 'ListingAttributesSection'"
      :pic_urls="pic_urls"
      :texts="texts"
      :currentListingData="currentListingData"
    ></ListingAttributesSection>
    <ListingFeaturesSection
      v-else-if="editorTemplate === 'ListingFeaturesSection'"
      :pic_urls="pic_urls"
      :isEdit="isEdit"
      :texts="texts"
      :currentListingData="currentListingData"
    ></ListingFeaturesSection>
    <ListingEnquirySection
      v-else-if="editorTemplate === 'ListingEnquirySection'"
      :currentListingData="currentListingData"
    ></ListingEnquirySection>
    <TitleWithText
      v-else-if="editorTemplate === 'TitleWithText'"
      :pic_urls="pic_urls"
      :texts="texts"
    ></TitleWithText>
    <MapIframeSection
      v-else-if="editorTemplate === 'MapIframeSection'"
      :currentListingData="currentListingData"
    ></MapIframeSection>
    <LargePicWithSmallTextToRight
      v-else-if="editorTemplate === 'LargePicWithSmallTextToRight'"
      :pic_urls="pic_urls"
      :texts="texts"
    ></LargePicWithSmallTextToRight>
    <LargePicWithSmallTextToLeft
      v-else-if="editorTemplate === 'LargePicWithSmallTextToLeft'"
      :pic_urls="pic_urls"
      :texts="texts"
    ></LargePicWithSmallTextToLeft>
    <SimpleTitle
      v-else-if="editorTemplate === 'SimpleTitle'"
      adjustForEditClass="adjust-gen-template-for-edit"
      :texts="texts"
    ></SimpleTitle>
    <!-- <HeroClassic
      v-else-if="editorTemplate === 'HeroClassic'"
      :pic_urls="pic_urls"
      :texts="texts"
      :listingLocationOrigin="listingLocationOrigin"
    ></HeroClassic> -->
    <!-- <div v-html="compiled_html"></div> -->
  </div>
</template>
<script>
import ListingFeaturesSection from "components/content-page-parts/ListingFeaturesSection.vue"
import ListingAttributesSection from "components/content-page-parts/ListingAttributesSection.vue"
import ListingEnquirySection from "components/content-page-parts/ListingEnquirySection.vue"
// import MainSppDescription from "components/content-page-parts/MainSppDescription.vue"
import TitleWithText from "components/content-page-parts/TitleWithText.vue"
import MapIframeSection from "components/content-page-parts/MapIframeSection.vue"
import LargePicWithSmallTextToLeft from "components/content-page-parts/LargePicWithSmallTextToLeft.vue"
import LargePicWithSmallTextToRight from "components/content-page-parts/LargePicWithSmallTextToRight.vue"
// import HeroClassic from "components/content-page-parts/HeroClassic.vue"
import SimpleTitle from "components/content-page-parts/SimpleTitle.vue"
import SppCarousel from "components/content-page-parts/SppCarousel.vue"
export default {
  // inject: ["listingsStore"],
  components: {
    ListingFeaturesSection,
    ListingAttributesSection,
    ListingEnquirySection,
    // MainSppDescription,
    TitleWithText,
    MapIframeSection,
    LargePicWithSmallTextToRight,
    LargePicWithSmallTextToLeft,
    // HeroClassic,
    SimpleTitle,
    SppCarousel,
  },
  mounted: function () {},
  computed: {
    // listingUuid() {
    //   let listingUuid = this.currentListingData.listing_uuid || ""
    //   return listingUuid
    // },
    listingLocationOrigin() {
      let sppViewDataAsString =
        this.$store.state.sppStore.sppViewDataString || "{}"
      let sppViewData = JSON.parse(sppViewDataAsString)
      if (sppViewData.page) {
        return sppViewData.page.location_origin
      } else {
        return ""
      }
    },
    currentListingData() {
      let sppViewDataAsString =
        this.$store.state.sppStore.sppViewDataString || "{}"
      let sppViewData = JSON.parse(sppViewDataAsString)
      if (sppViewData.listing) {
        return sppViewData.listing
      } else {
        return {}
      }
    },
    // listingsModelName() {
    //   return this.currentListingData.listings_model_name
    // },
  },
  methods: {},
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    pic_urls: {
      type: Object,
      default: () => {},
      required: false,
    },
    texts: {
      type: Object,
      default: () => {},
      required: false,
    },
    colors: {
      type: Object,
      default: () => {},
      required: false,
    },
    // currentPageSectionForEditing: {
    //   type: Object,
    //   default: () => {},
    // },
    editorTemplate: {
      type: String,
      required: false,
    },
  },
  data: () => ({}),
}
</script>
<style scoped>
.gen-temp-resolver {
  border-top-width: 4px;
  border-top-color: green;
}
</style>
