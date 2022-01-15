<template>
  <div class="text-with-title">
    <q-card class="text-with-title-card">
      <q-card-section>
        <div class="mb-10">
          <h1
            class="
              sm:text-3xl
              text-2xl
              font-medium
              title-font
              text-gray-900
              mb-4
              text-center
            "
          >
            {{ texts.primary_title }}
          </h1>
          <p class="text-base leading-relaxed mx-auto"></p>
          <div v-html="texts.compiled_html"></div>
        </div>
        <div class="flex features-container mb-10 gap-4"></div>
        <!-- <SocialSharing :urlProp="listingUrl"></SocialSharing> -->
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
// import SocialSharing from "components/SocialSharing.vue"
export default {
  components: {
    // SocialSharing,
  },
  props: {
    texts: {
      type: Object,
      default: () => {},
      required: false,
    },
  },
  data: function () {
    return {}
  },
  computed: {},
}
</script>
<style>
</style>