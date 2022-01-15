<template>
  <div class="q-pa-none">
    <!-- <div
      v-for="image in carouselSlides"
      :name="image.src"
      :key="image.src"
      :img-src="image.src"
    >
      <q-img :src="image.src"></q-img>
    </div> -->
    <q-responsive class="col" :ratio="16 / 9" style="max-width: 100%">
      <q-carousel
        swipeable
        thumbnails
        animated
        v-model="slideModel"
        :autoplay="autoplay"
        ref="carousel"
        infinite
        arrows
        control-type="regular"
        control-color="orange"
        control-text-color="grey-8"
        class="bg-purple text-white rounded-borders"
      >
        <q-carousel-slide
          v-for="image in carouselSlides"
          :name="image.src"
          :key="image.src"
          :img-src="image.src"
        >
          <q-scroll-area class="fit"> </q-scroll-area>
        </q-carousel-slide>
      </q-carousel>
    </q-responsive>
  </div>
</template>
<script>
import { ref, toRef, watch } from "vue"
export default {
  components: {},
  props: {
    pic_urls: {
      type: Object,
      default: () => {},
      required: false,
    },
    // sppDetails: {
    //   type: Object,
    //   default: () => {},
    // },
  },
  setup(props) {
    return {
      // showThumbnailsRef,
      slideModel: ref(1),
      autoplay: ref(false),
      fullscreen: ref(false),
    }
  },
  watch: {
    carouselSlides: {
      deep: true,
      immediate: true,
      handler: function (newVal) {
        // needed to set initial image
        if (newVal[0]) {
          this.slideModel = newVal[0].src
        }
      },
    },
  },
  computed: {
    carouselSlides() {
      var carouselSlides = []
      var imageDetails = this.pic_urls.collection || []
      // if (
      //   this.sppDetails.pic_urls &&
      //   this.sppDetails.pic_urls.carousel_a_images
      // ) {
      //   imageDetails = this.sppDetails.pic_urls.carousel_a_images.default_urls
      // }
      // console.log(imageDetails)
      if (imageDetails.length > 0) {
        imageDetails.forEach(function (imageUrl, index) {
          carouselSlides.push({
            thumb: imageUrl,
            src: imageUrl,
            alt_text: "",
          })
        })
        return carouselSlides
      } else {
        return []
      }
    },
  },
  methods: {},
}
</script>