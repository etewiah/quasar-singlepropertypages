<template>
  <div class="">
    <div class="hover-to-scale" style="overflow: hidden; min-height: 60vh">
      <div
        class="bg-cover <%= @feel['animations']['hero_image_animation'] %>"
        :style="heroBgStyle"
      >
        <div
          class="container max-w-6xl mx-auto text-center break-normal hero-text-container"
        >
          <div class="py-8">
            <p
              class="text-white font-extrabold text-4xl md:text-6xl capitalize"
            >
              {{ texts.primary_title }}
            </p>
            <p class="text-xl md:text-2xl text-gray-500"></p>
            <div class="justify-center">
              <div class="mt-6 flex justify-center">
                <!-- <SocialSharing
                  :socialSharingTitle="texts.primary_title"
                  :urlProp="listingUrl"
                ></SocialSharing> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import SocialSharing from "components/SocialSharing.vue"
export default {
  components: {
    // SocialSharing,
  },
  mounted: function () {},
  props: {
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
    pic_urls: {
      type: Object,
      default: () => {},
      required: false,
    },
    listingLocationOrigin: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    // newPriColorBaseClass: "",
  }),
  methods: {
    // psContentDirectlyChanged() {
    //   this.$emit("psContentDirectlyChanged", this.$refs.templateCompiledContent)
    // },
  },
  computed: {
    listingUrl() {
      // let origin = ""
      // // const cookies = process.env.SERVER
      // //   ? Cookies.parseSSR(ssrContext)
      // //   : Cookies
      // if (typeof window !== "undefined") {
      //   origin = location.origin
      // }
      // Below involves setting location_origin on server
      // but means I can get correct url even when rendered
      // server side with prefetch
      return `${this.listingLocationOrigin}${this.$route.href}`
    },
    heroBgStyle() {
      let bgUrl = ""
      if (this.pic_urls && this.pic_urls.primary) {
        bgUrl = this.pic_urls.primary.default_url
        // this.sppListingDetails.pic_urls.hero_a_image.default_url
      }
      return (
        // "background-image: linear-gradient(rgba(135, 80, 156, 0.9),rgba(135, 80, 156, 0.9)), url('" +
        "background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1)), url('" +
        bgUrl +
        "');" +
        "min-height: 60vh;" +
        // below needed because there was a gap after the bottom of the image (visible against secondary background)
        "margin-bottom: -12px;" +
        "height: 700px;"
      )
    },
    // bgPrimaryColorClass() {
    //   let primaryColor = this.colors.primary_class || "green-500"
    //   return `bg-${primaryColor}`
    // },
    // primaryColorClassSuffix() {
    //   return this.colors.primary_class || "green-500"
    // },
  },
}
</script>
