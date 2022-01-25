<template>
  <div class="">
    <q-img
      :ratio="16 / 9"
      :src="primaryImageUrl"
      style="height: 680px"
      placeholder-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="
    >
      <div
        style="background: rgb(0, 0, 0, 0.25)"
        class="absolute column items-center full-width hero-classic-text-cont"
      >
        <h1 style="" class="text-h2 text-white text-center text-weight-bold">
          {{ texts.primary_title }}
        </h1>
        <div>
          <SocialSharing
            :urlProp="listingUrl"
            :socialSharingTitle="texts.primary_title"
          ></SocialSharing>
        </div>
      </div>
    </q-img>
    <!-- <q-parallax :height="heroImageHeight" :src="primaryImageUrl">
      <h1 style="" class="hero-classic-text text-h3 text-white text-center">
        {{ texts.primary_title }}
      </h1>
    </q-parallax> -->
  </div>
</template>
<script>
import SocialSharing from "components/SocialSharing.vue"
export default {
  components: {
    SocialSharing,
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
    // listingLocationOrigin: {
    //   type: String,
    //   default: "",
    // },
  },
  data: () => ({}),
  methods: {},
  computed: {
    // heroImageHeight() {
    //   return 500
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
    listingUrl() {
      // Below involves setting location_origin on server
      // but means I can get correct url even when rendered
      // server side with prefetch
      return `${this.listingLocationOrigin}${this.$route.href}`
    },
    primaryImageUrl() {
      let primaryImageUrl = ""
      if (this.pic_urls && this.pic_urls.primary) {
        primaryImageUrl = this.pic_urls.primary.default_url
        // this.sppListingDetails.pic_urls.hero_a_image.default_url
      }
      return primaryImageUrl
    },
    // heroBgStyle() {
    //   return (
    //     // "background-image: linear-gradient(rgba(135, 80, 156, 0.9),rgba(135, 80, 156, 0.9)), url('" +
    //     "background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1)), url('" +
    //     this.primaryImageUrl +
    //     "');" +
    //     "min-height: 60vh;" +
    //     // below needed because there was a gap after the bottom of the image (visible against secondary background)
    //     "margin-bottom: -12px;" +
    //     "height: 700px;"
    //   )
    // },
  },
}
</script>
<style scoped>
/* .hero-classic-text {
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1));
} */
</style>
