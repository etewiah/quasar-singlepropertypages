<template>
  <div>
    <h1>Features</h1>
    <div v-if="isEdit || listingFeatures.length > 0" class="q-pt-md" style="">
      <q-card class="listing-features-card">
        <q-card-section>
          <div>
            <h4
              class="
                sm:text-2xl
                font-medium
                title-font
                text-gray-900
                q-pb-md
                text-center
              "
            >
              Features
            </h4>
          </div>
          <div class="q-pa-md">
            <q-chip
              v-for="(feature, index) in listingFeatures"
              :key="index"
              outline
              color="primary"
              text-color="white"
              size="lg"
              icon="check_circle"
            >
              {{ feature.label }}
            </q-chip>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script>
// import { publicApi } from "boot/axios"
export default {
  setup() {},
  components: {},
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    currentListingData: {
      type: Object,
      default: () => {
        // title: "ee"
      },
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    listingFeatures() {
      return this.currentListingData.feature_field_keys || []
    },
  },
  watch: {},
  methods: {},
}
</script>
<style>
</style>