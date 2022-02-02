<template>
  <q-page class="">
    <div v-if="!!!showUrlPromptModal" class="container p-0 mx-auto">
      <div class="row mt-10">
        <div class="col-xs-12">
          <div class="q-mx-md intro-cont">
            <h3 class="title-font text-gray-900 pb-5 pt-10"></h3>
            <!-- <div>
              <p class="text-body1 q-mx-md">
                It has not been possible to get all the data for this listing
                automatically.
              </p>
            </div> -->
          </div>
        </div>
        <div class="col-xs-12">
          <HtmlSppCreator :remoteListingSrc="importUrl"></HtmlSppCreator>
        </div>
      </div>
    </div>
    <q-dialog v-model="showUrlPromptModal">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            Please provide a valid url to import listing from:
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <!-- <h4>Coming soon</h4> -->
          <div>
            <form @submit.prevent.stop="updateImportUrl" class="q-gutter-md">
              <q-input
                style=""
                bg-color="white"
                ref="urlRef"
                color="black"
                autofocus
                outlined
                v-model="importUrl"
                label=""
                hint=""
                lazy-rules
                :rules="urlRules"
              />
              <div>
                <q-btn label="Ok" type="submit" color="green" />
              </div>
            </form>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
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
  methods: {
    updateImportUrl() {
      this.urlRef.validate()
      if (!this.urlRef.hasError) {
        // this.$route.query["url"] = this.importUrl
        this.$router.push({ query: { url: this.importUrl } })
        this.showUrlPromptModal = false
      }
    },
  },
  props: {},
  computed: {},
  data() {
    return {
      showUrlPromptModal: false,
    }
  },
  setup() {
    const importUrl = ref("")
    const urlRef = ref(null)
    // const urlRegex = new RegExp(
    //   "^(https?:\\/\\/)?" + // protocol
    //     "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    //     "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    //     "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    //     "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    //     "(\\#[-a-z\\d_]*)?$",
    //   "i"
    // )
    function urlValidator(urlString) {
      const urlObject = new URL(urlString)
      if (urlObject.host.length > 1) {
        return true
      } else {
        return false
      }
    }
    return {
      urlValidator,
      importUrl,
      urlRef,
      urlRules: [
        (val) => (val && val.length > 0) || "Please enter url",
        (val) => (val && urlValidator(val)) || "Please enter a valid url",
        // (val) => (val && urlRegex.test(val)) || "Please enter a valid url",
      ],
    }
  },
  mounted() {
    if (this.$route.query["url"]) {
      this.importUrl = this.$route.query["url"]
      // let validUrlProvided = this.urlRegex.test(this.$route.query["url"])
      let validUrlProvided = this.urlValidator(this.$route.query["url"])
      if (!validUrlProvided) {
        this.showUrlPromptModal = true
      }
    } else {
      this.showUrlPromptModal = true
    }
  },
})
</script>
