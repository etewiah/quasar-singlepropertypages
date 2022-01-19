<template>
  <div
    class="spp-listing-main-view bg-gray-200 leading-normal tracking-normal"
    style="font-family: 'Source Sans Pro', sans-serif"
  >
    <HeroClassic
      :isEdit="false"
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
            <div v-for="pageSection in sppPageSections" :key="pageSection.uuid">
              <SppViewSectionsHost
                :pageSection="pageSection"
              ></SppViewSectionsHost>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, toRef } from "vue"
import { useMeta } from "quasar"
import { useStore } from "vuex"
import SppViewSectionsHost from "src/components/sections/SppViewSectionsHost.vue"
// import SppHero from "src/packs/spp/sections/SppHero.vue"
import HeroClassic from "src/components/content-page-parts/HeroClassic.vue"
// import { useSSRContext } from "vue"
export default defineComponent({
  components: {
    SppViewSectionsHost,
    HeroClassic,
  },
  setup(props) {
    // const pageTitleRef = toRef(props, "title")
    // https://v3.vuejs.org/guide/composition-api-setup.html#props
    // this.sppViewData.page.title_meta_en

    const pageTitleRef = ref("Some title") // we define the "title" prop

    const $store = useStore()
    let sppViewDataAsString = $store.state.sppStore.sppViewDataString || "{}"
    let sppViewData = JSON.parse(sppViewDataAsString)
    let pageTitle = ""
    let pageDescription = ""
    let pageImage = ""
    if (sppViewData.page && sppViewData.page.title_meta_en) {
      pageTitle = sppViewData.page.title_meta_en
      pageDescription = sppViewData.page.description_meta_en
      // TODO - set and use image_url_meta or image_url_thumbnail on page
      // instead of below
      pageImage = sppViewData.listing.thumb_image_url
    }
    const metaData = {
      // // sets document title
      title: pageTitle,
      // // optional; sets final title as "Index Page - My Website", useful for multiple level meta
      // // titleTemplate: (title) => `${title} - My Website`,
      // // meta tags
      meta: {
        description: {
          name: "description",
          content: pageDescription,
        },
        // TODO
        // tcard: { name: "twitter:card", content: pageTitle },
        // tsite: { name: "twitter:site", content: pageTitle },
        keywords: { name: "keywords", content: "Quasar website" },
        // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
        ogTitle: {
          property: "og:title",
          content: pageTitle,
          // // optional; similar to titleTemplate, but allows templating with other meta properties
          // template(ogTitle) {
          //   return `${ogTitle} - My Website`
          // },
        },
        ogDesc: {
          property: "og:description",
          content: pageDescription,
        },
        ogSn: { property: "og:site_name", content: "Single Property Pages" },
        ogImage: { property: "og:image", content: pageImage },
      },
      // <noscript> tags
      noscript: {
        default: "Please enable javascript to be able to use this site.",
      },
      equiv: {
        "http-equiv": "Content-Type",
        content: "text/html; charset=UTF-8",
      },
    }
    // useMeta(() => {
    //   return metaData
    // })
    function setAnotherTitle() {
      pageTitleRef.value = "Another title"
      // According to docs
      // will automatically trigger a Meta update due to the binding
      // but failed during my tests
    }
    return {
      pageTitleRef,
      setAnotherTitle,
    }
  },
  watch: {},
  data() {
    return {}
  },
  // mounted: function () {
  //   this.setAnotherTitle()
  // },
  computed: {
    heroPageSection() {
      let heroPageSection = null
      this.sppPageSections.forEach((pageSection) => {
        if (pageSection.editor_template === "HeroClassic") {
          heroPageSection = pageSection
        }
      })
      return heroPageSection
    },
    sppPageSections() {
      if (this.sppPageDetails.sections_for_viewing) {
        return this.sppPageDetails.sections_for_viewing
      } else {
        return []
      }
    },
    sppPageDetails() {
      if (this.sppViewData && this.sppViewData.page) {
        return this.sppViewData.page
      } else {
        return {}
      }
    },
  },
  props: {
    // sppPageSections: {
    //   type: Array,
    //   default: () => [],
    // },
    sppViewData: {
      type: Object,
      default: () => {
        listing: {
        }
      },
      required: true,
    },
  },
})
</script>
