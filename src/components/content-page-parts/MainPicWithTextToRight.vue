<template>
  <div v-if="uuid" class="single-sect-ct">
    <div class="page-sec-cont main_pic_with_text">
      <div
        class="
          sec-bg-container
          t-container
          cont-2716ab03
          px-0
          compiled-html-wrap
          mx-auto
        "
      >
        <div class="mx-auto flex flex-wrap items-center pt-2">
          <div class="full-width md:w-6/12 q-px-md">
            <div
              class="
                text-gray-600
                p-3
                text-center
                inline-flex
                items-center
                justify-center
                w-16
                h-16
                mb-6
                shadow-lg
                rounded-full
                bg-gray-100
              "
            >
              <q-icon
                name="supervisor_account"
                :class="[`text-${primaryColorClassSuffix}`]"
                style="font-size: 4.4em"
              />
            </div>
            <!-- <div
              class="
                text-gray-600
                p-3
                text-center
                inline-flex
                items-center
                justify-center
                w-16
                h-16
                mb-6
                shadow-lg
                rounded-full
                bg-gray-100
              "
            >
              <i class="fas fa-user-friends text-xl"></i>
            </div> -->
            <h3 class="text-3xl mb-2 font-semibold leading-normal">
              <span
                ><div>
                  <div contenteditable="false" tabindex="0" class="">
                    <div v-html="texts.primary_title"></div>
                  </div></div
              ></span>
            </h3>
            <div
              class="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700"
            >
              <span
                ><div>
                  <div contenteditable="false" tabindex="0" class="">
                    <div v-html="texts.primary_content"></div>
                  </div></div
              ></span>
            </div>
            <br />
          </div>
          <div class="full-width md:w-6/12 q-px-md">
            <div
              :class="[
                `relative
                flex flex-col
                min-w-0
                break-words
                full-width
                mb-6
                shadow-lg
                rounded-lg`,
                bgPrimaryColorClass,
              ]"
            >
              <span
                ><!---->
                <img
                  alt="content"
                  :src="photo_urls.primary_photo.main_url"
                  class="full-width align-middle rounded-t-lg"
              /></span>
              <blockquote :class="[`relative p-8 mb-4`, bgPrimaryColorClass]">
                <svg
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 583 95"
                  class="absolute left-0 full-width block"
                  style="height: 95px; top: -94px"
                >
                  <polygon
                    points="-30,95 583,95 583,65"
                    :class="[`fill-current text-${primaryColorClassSuffix}`]"
                  ></polygon>
                </svg>
                <h4 class="text-xl font-bold text-white">
                  <span
                    ><div>
                      <div contenteditable="false" tabindex="0" class="">
                        <div v-html="texts.secondary_title"></div>
                      </div></div
                  ></span>
                </h4>
                <div class="text-md font-light mt-2 text-white">
                  <span
                    ><div>
                      <div contenteditable="false" tabindex="0" class="">
                        <div v-html="texts.secondary_content"></div>
                      </div></div
                  ></span>
                </div>
              </blockquote>
            </div>
          </div>
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
  components: {},
  mounted: function () {},
  props: {
    uuid: {
      type: String,
      required: true,
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
    photo_urls: {
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
  computed: {
    bgPrimaryColorClass() {
      let primaryColor = this.colors.primary_class || "green-500"
      return `bg-${primaryColor}`
    },
    primaryColorClassSuffix() {
      return this.colors.primary_class || "green-500"
    },
  },
}
</script>