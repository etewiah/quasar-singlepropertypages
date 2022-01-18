<template>
  <q-card class="listing-summ-det flex" v-if="currentListingData">
    <q-item
      class="q-mr-lg q-mb-sm border-gray-800 bg-gray-200 border-2 float-left cursor-none"
      clickable
    >
      <q-item-section side>
        <q-icon color="blue" name="bathtub" />
      </q-item-section>
      <q-item-section class="q-mr-sm">
        <q-item-label class="text-weight-medium text-h6">
          {{ currentListingData.count_bathrooms }}
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      class="q-mr-lg q-mb-sm border-gray-800 bg-gray-200 border-2 float-left cursor-none"
      clickable
    >
      <q-item-section side>
        <q-icon color="blue" name="hotel" />
      </q-item-section>
      <q-item-section class="q-mr-sm">
        <q-item-label class="text-weight-medium text-h6">
          {{ currentListingData.count_bedrooms }}
        </q-item-label>
        <!-- <q-item-label caption>Fill your gas tank.</q-item-label> -->
      </q-item-section>
    </q-item>
    <q-item
      class="q-mr-lg q-mb-sm border-gray-800 bg-gray-200 border-2 float-left cursor-none"
      clickable
    >
      <q-item-section side>
        <q-icon color="blue" :name="mdiAspectRatio" />
      </q-item-section>
      <q-item-section class="q-mr-sm">
        <q-item-label class="text-weight-medium text-h6">
          {{ currentListingData.formatted_constructed_area }}
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      class="q-mr-lg q-mb-sm border-gray-800 bg-gray-200 border-2 float-left cursor-none"
      clickable
    >
      <q-item-section side>
        <q-icon color="blue" :name="mdiCashMultiple" />
      </q-item-section>
      <q-item-section class="q-mr-sm">
        <q-item-label class="text-weight-medium text-h6">
          {{ currentListingData.formatted_display_price }}
        </q-item-label>
      </q-item-section>
    </q-item>
    <!--  -->
  </q-card>
</template>
<script>
// import { ref, toRef, watch } from "vue"
import { mdiAspectRatio, mdiCashMultiple } from "@quasar/extras/mdi-v5"
export default {
  created() {
    this.mdiAspectRatio = mdiAspectRatio
    this.mdiCashMultiple = mdiCashMultiple
  },
  data() {
    return {}
  },
  props: {
    currentListingData: {
      type: Object,
      default: () => {},
    },
  },
  watch: {},
  computed: {},
}
</script>
