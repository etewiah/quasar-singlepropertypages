<template>
  <div class="row mt-1">
    <div class="col-xs-12">
      <h2
        class="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 pb-5 pt-10"
      >
        Enter url to import your custom page from
      </h2>
    </div>
    <div class="col-xs-12 col-md-12">
      <div class="q-pa-md" style="">
        <form
          @submit.prevent.stop="createSpp"
          @reset.prevent.stop="onReset"
          class="q-gutter-md"
        >
          <q-input
            ref="urlRef"
            filled
            v-model="importUrl"
            label="Url to import listing from *"
            hint="Must be a valid url"
            lazy-rules
            :rules="urlRules"
          />
          <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->
          <div>
            <q-btn
              label="Create my single property page"
              type="submit"
              color="primary"
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
  </div>
</template>
<script>
// import { useQuasar } from "quasar"
import { ref } from "vue";
import SppService from "src/spp.service";
export default {
  components: {},
  mounted() {},
  watch: {},
  data() {
    return {
      // loadingSearch: false,
      // setupData: {},
    };
  },
  setup() {
    // const $q = useQuasar()
    const importUrl = ref("https://www.rightmove.co.uk/properties/115881926");
    const urlRef = ref(null);
    const accept = ref(false);
    // const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const urlRegex = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    // return this.customer.email && emailRegex.test(this.customer.email) || 'Please enter a valid email address';

    return {
      accept,
      importUrl,
      urlRef,
      urlRules: [
        (val) => (val && val.length > 0) || "Please type something",
        (val) => (val && urlRegex.test(val)) || "Please enter a valid url",
      ],
      onReset() {
        importUrl.value = null;
        urlRef.value.resetValidation();
      },
    };
  },
  methods: {
    createSpp() {
      this.urlRef.validate();
      if (this.urlRef.hasError) {
        // form has error
        // } else if (accept !== true) {
        //   $q.notify({
        //     color: "negative",
        //     message: "You need to accept the license and terms first",
        //   })
      } else {
        let dataApiBase = this.$store.getters["configStore/getDataApiBase"];
        SppService.createSppFromUrl(dataApiBase, this.importUrl)
          .then((response) => {
            let targetPath = `/p/spp/for-sale/${response.data.listing.listing_uuid}`;
            this.$router.push(targetPath);
          })
          .catch((error) => {
            $q.notify({
              color: "negative",
              position: "top",
              message: error,
              icon: "report_problem",
            });
          });
      }
    },
  },
  computed: {},
  props: {},
};
</script>
