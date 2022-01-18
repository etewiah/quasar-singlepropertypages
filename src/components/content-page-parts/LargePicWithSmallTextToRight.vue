<template>
  <q-card class="row bg-white lpic-with-txt-to-right">
    <div class="col-xs-12 col-sm-12 col-md-8">
      <div class="full-height">
        <img
          alt="content"
          :src="pic_urls.primary.default_url"
          class="full-width full-height align-middle"
          style="object-fit: cover; max-height: 500px"
        />
      </div>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-4">
      <div class="full-height items-center row">
        <div class="full-width align-middle q-px-md">
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
  </q-card>
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
