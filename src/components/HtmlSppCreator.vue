<template>
  <div>
    <q-card class="row q-my-xl text-black">
      <div class="col-xs-12">
        <h4
          class="font-medium text-center title-font text-gray-900 q-mb-sm pt-10"
        >
          Help us retrieve the data for this listing
        </h4>
        <div>
          <div class="text-body1 q-mx-md q-mt-lg">
            It has not been possible to get all the data automatically.
          </div>
          <div class="text-body1 q-mx-md">
            Please paste the source html for this listing below:
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-md-12">
        <div class="q-pa-md" style="">
          <form
            @submit.prevent.stop="createSpp"
            @reset.prevent.stop="onReset"
            class="q-gutter-md"
          >
            <q-input
              style=""
              bg-color="white"
              ref="rawHtmlRef"
              color="teal"
              type="textarea"
              autofocus
              outlined
              v-model="rawHtmlToParse"
              lazy-rules
            />
            <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->
            <div>
              <q-btn
                label="Create my single property page"
                type="submit"
                color="green"
              />
              <q-btn
                label="Reset"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
          </form>
        </div>
      </div>
    </q-card>
    <div class="q-mt-xl q-mx-md">
      <h4 class="q-my-sm">How to copy the source html for your listing</h4>

      <p class="text-body1">
        Start by opening
        <a target="_blank" :href="remoteListingSrc">{{ remoteListingSrc }}</a>
        in a new tab.
        <br />
        You can then use the following keyboard commands to view the webpage
        source code. Once you can see the source code, simply copy it all and
        paste it in the section above.
      </p>
      <h5 class="q-my-sm">PC</h5>
      <ul>
        <li>
          <b>Firefox:</b> CTRL + U (Meaning press the CTRL key on your keyboard
          and hold it down. While holding down the CTRL key, press the “u” key.)
          Alternatively, you can go to the “Firefox” menu and then click on “Web
          Developer,” and then “Page Source.”
        </li>
        <li>
          <strong>Edge/</strong><b>Internet Explorer</b><strong>:</strong> CTRL
          + U. Or right click and select “View Source.”
        </li>
        <li>
          <strong><b>Chrome</b>:</strong> CTRL + U. Or you can click on the
          weird-looking key with three horizontal lines in the upper right hand
          corner. Then click on “Tools” and select “View Source.”
        </li>
        <li>
          <strong><b>Opera</b>:</strong> CTRL + U. You also can right click on
          the webpage and select “View Page Source.”
        </li>
      </ul>
      <h5 class="q-my-sm">Mac</h5>
      <ul>
        <li>
          <b>Safari:</b> The keyboard shortcut is Option+Command+U. You also can
          right-click on the webpage and select “Show Page Source.”
        </li>
        <li>
          <strong>Firefox</strong>: You can right-click and select “Page Source”
          or you can navigate to your “Tools” menu, select “Web Developer,” and
          click on “Page Source.” The keyboard shortcut is Command + U.
        </li>
        <li>
          <strong>Chrome:</strong> Navigate to “View,” click on “Developer,” and
          then “View Source.” You also can right-click and select “View Page
          Source.” The keyboard shortcut is Option+Command+U.
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import lodashRemove from "lodash.remove"
import { ref } from "vue"
import SppService from "src/spp.service"
export default {
  components: {},
  mounted() {},
  watch: {},
  data() {
    return {}
  },
  setup() {
    // const $q = useQuasar()
    const rawHtmlToParse = ref("")
    const rawHtmlRef = ref(null)
    const accept = ref(false)
    // const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const urlRegex = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    )
    // return this.customer.email && emailRegex.test(this.customer.email) || 'Please enter a valid email address';

    return {
      accept,
      rawHtmlToParse,
      rawHtmlRef,
      urlRules: [
        (val) => (val && val.length > 0) || "Please type something",
        (val) => (val && urlRegex.test(val)) || "Please enter a valid url",
      ],
      onReset() {
        rawHtmlToParse.value = null
        rawHtmlRef.value.resetValidation()
      },
    }
  },
  methods: {
    addToLocalSppItems(listing) {
      let sppItemsKey = "spp_items:pwbprem"
      let localSppItems = JSON.parse(localStorage.getItem(sppItemsKey)) || []
      if (!Array.isArray(localSppItems)) {
        localSppItems = []
      }
      let sppType = "regular"
      let listingToSave = {
        sppType: sppType,
        listing_uuid: listing.listing_uuid,
        preview_url: listing.preview_url,
        formatted_display_price: listing.formatted_display_price,
        title: listing.title,
        reference: listing.reference,
        count_bathrooms: listing.count_bathrooms,
        count_bedrooms: listing.count_bedrooms,
        slug: listing.slug,
      }
      // from lodash:
      // union(localSppItems, [this.currentListingData])
      lodashRemove(localSppItems, function (n) {
        return n.listing_uuid === listingToSave.listing_uuid
      })
      localSppItems.push(listingToSave)
      // prefer removing then setting as it ensures latest details are used
      localStorage.setItem(sppItemsKey, JSON.stringify(localSppItems))
      // Below would ensure that list does not have duplicates but might keep older version:
      // localSppItems = uniqBy(localSppItems, "listing_uuid")
    },
    createSpp() {
      // this.rawHtmlRef.validate()
      let dataApiBase = this.$store.getters["configStore/getDataApiBase"]
      SppService.createSppFromHtml(
        dataApiBase,
        this.remoteListingSrc,
        this.rawHtmlToParse
      )
        .then((response) => {
          this.addToLocalSppItems(response.data.listing)
          let targetPath = `/p/spp/for-sale/${response.data.listing.listing_uuid}`
          this.$router.push(targetPath)
        })
        .catch((error) => {
          this.$q.notify({
            color: "negative",
            position: "top",
            message: error,
            icon: "report_problem",
          })
        })
    },
  },
  computed: {
    // remoteListingSrc() {
    //   return "https://www.immobilienscout24.de/expose/131882134?referrer=HP_INSPIRATION_ONE#/"
    //   //  "https://www.redfin.com/HI/Hilo/918-Kumukoa-St-96720/unit-B303/home/88415062"
    // },
  },
  props: {
    remoteListingSrc: {
      type: String,
    },
  },
}
</script>
<style></style>
