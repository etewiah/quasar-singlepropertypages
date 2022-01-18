<template>
  <div class="row">
    <div class="col-12">
      <q-card class="listing-desc-card">
        <q-card-section>
          <div :class="adjustForEditClass">
            <div class="full-height items-center row">
              <div class="full-width align-middle q-px-md">
                <h3 class="text-3xl mb-2 font-semibold leading-normal">
                  <span
                    ><div>
                      <div
                        contenteditable="false"
                        tabindex="0"
                        class="ProseMirror"
                      >
                        <div v-html="texts.primary_title"></div>
                      </div></div
                  ></span>
                </h3>
                <div
                  class="
                    text-lg
                    font-light
                    leading-relaxed
                    mt-0
                    mb-4
                    text-gray-700
                  "
                >
                  <div contenteditable="false" tabindex="0" class="ProseMirror">
                    <div v-html="texts.primary_content"></div>
                  </div>
                </div>
                <br />
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script>
// import ColorSwitcher from "@jsroot/edit-pages-ui/forms/ColorSwitcher"
// import ColorMgmtHelper from "@jsroot/edit-pages-ui/mixins/ColorMgmtHelper"
export default {
  // mixins: [ColorMgmtHelper],
  components: {
    // ColorSwitcher,
  },
  mounted: function () {},
  props: {
    adjustForEditClass: {
      type: String,
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
    // photo_urls: {
    //   type: Object,
    //   default: () => {},
    //   required: false,
    // },
  },
  data: () => ({}),
  methods: {},
  computed: {},
}
</script>
<style scoped>
.adjust-gen-template-for-edit {
  margin-top: 40px;
}
</style>