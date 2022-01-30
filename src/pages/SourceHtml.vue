<template>
  <q-page class="">
    <div class="container p-0 mx-auto">
      <div class="row mt-10">
        <div class="col-xs-12">
          <div class="q-mx-md intro-cont">
            <h3 class="title-font text-gray-900 pb-5 pt-10">
            </h3>
            <!-- <div>
              <p class="text-body1 q-mx-md">
                It has not been possible to get all the data for this listing
                automatically.
              </p>
            </div> -->
          </div>
        </div>
        <div class="col-xs-12">
          <HtmlSppCreator></HtmlSppCreator>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, ref } from "vue"
import HtmlSppCreator from "src/components/HtmlSppCreator.vue"
export default defineComponent({
  name: "SourceHtml",
  components: {
    HtmlSppCreator,
  },
  methods: {},
  props: {},
  computed: {},
  mounted() {},
})
</script>
