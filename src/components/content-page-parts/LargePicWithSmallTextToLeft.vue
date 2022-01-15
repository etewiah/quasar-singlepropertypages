<template>
  <div class="row bg-white lpic-with-txt-to-left">
    <div class="mobile-hide col-md-4">
      <div class="full-height items-center row">
        <div class="w-full align-middle px-4 mr-auto ml-auto">
          <h3 class="text-3xl mb-2 font-semibold leading-normal">
            <span
              ><div>
                <div contenteditable="false" tabindex="0" class="ProseMirror">
                  <div v-html="texts.primary_title"></div>
                </div></div
            ></span>
          </h3>
          <div
            class="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700"
          >
            <div contenteditable="false" tabindex="0" class="ProseMirror">
              <div v-html="texts.primary_content"></div>
            </div>
          </div>
          <br />
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-8">
      <div>
        <img
          alt="content"
          :src="pic_urls.primary.default_url"
          class="w-full align-middle"
          style="object-fit: cover; max-height: 500px"
        />
      </div>
    </div>
    <div class="col-xs-12 col-sm-12 mobile-only">
      <div class="full-height items-center row">
        <div class="w-full align-middle px-4 mr-auto ml-auto">
          <h3 class="text-3xl mb-2 font-semibold leading-normal">
            <span
              ><div>
                <div contenteditable="false" tabindex="0" class="ProseMirror">
                  <div v-html="texts.primary_title"></div>
                </div></div
            ></span>
          </h3>
          <div
            class="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700"
          >
            <div contenteditable="false" tabindex="0" class="ProseMirror">
              <div v-html="texts.primary_content"></div>
            </div>
          </div>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import ColorSwitcher from "@jsroot/edit-pages-ui/forms/ColorSwitcher"
// import ColorMgmtHelper from "@jsroot/edit-pages-ui/mixins/ColorMgmtHelper"
export default {
  // mixins: [ColorMgmtHelper],
  components: {
    // SectionImageManager,
    // TipTapCapsuleLocaliser,
    // ColorSwitcher,
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
  },
  data: () => ({
    // newPriColorBaseClass: "",
  }),
  methods: {
    // psContentDirectlyChanged() {
    //   this.$emit("psContentDirectlyChanged", this.$refs.templateCompiledContent)
    // },
  },
  computed: {},
}
</script>
