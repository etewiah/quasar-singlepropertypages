<template>
  <q-page class="">
    <!-- <div class="container p-0 mx-auto">
      <div class="row mt-10">
        <div class="col-xs-12">
          <h2
            class="sm:text-2xl text-1xl font-medium text-center title-font text-gray-900 pb-5 pt-10"
          >
            {{ pageHeading }}
          </h2>
        </div>
      </div>
    </div> -->
    <div class="container p-0 mx-auto">
      <div class="row mt-10">
        <div class="col-xs-12">
          <RegularSppCreator></RegularSppCreator>
        </div>
        <div class="col-xs-12">
          <!-- <LocalSppItems></LocalSppItems> -->
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, ref } from "vue"
import RegularSppCreator from "src/components/RegularSppCreator.vue"
export default defineComponent({
  name: "BvhSppHomePage",
  components: {
    RegularSppCreator,
  },
  methods: {},
  props: {
    // setupData: {
    //   type: Object,
    //   // default: "",
    // },
  },
  computed: {
    // pageHeading() {
    //   return "Enter the url of a listing to create a custom page for it";
    // },
  },
  mounted() {},
})
</script>
