<template>
  <div class="listing-enq-section">
    <div :class="paddingClass" style="">
      <q-card class="listing-enq-card">
        <q-card-section>
          <div>
            <h4
              class="sm:text-2xl font-medium title-font text-gray-900 q-pb-md text-center"
            >
              Find out more about this listing:
            </h4>
          </div>
          <q-form
            @submit="onSubmitEnquiry"
            @reset="onReset"
            class="q-gutter-md"
          >
            <template
              v-for="field in propertyEnquiryShortFields"
              :key="field.fieldName"
            >
              <div class="listing-enq-field">
                <q-input
                  class="listing-enq-field-input"
                  outlined
                  v-model="enquiryContent.contact[field.fieldName]"
                  :label="field.labelTextTKey"
                  :hint="field.hintTextTKey"
                  lazy-rules
                  :rules="field.validationRules"
                />
              </div>
            </template>
            <!-- <q-toggle v-model="acceptTerms">
              <a v-on:click.stop class="" :href="tAndCLink">
                <span>
                  {{ "standard.forms.tAndCAcceptancePrefix" }}
                </span>
                <span class="acceptance-link color-primary">
                  {{ "standard.forms.tAndCAcceptanceLinkText" }}
                </span> </a
              >.
            </q-toggle> -->
            <div>
              <q-btn label="Submit" type="submit" color="primary" />
              <!-- <q-btn
                label="Reset"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              /> -->
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <div class="listing-form-target">
    <div>
      <div class="full-width flex flex-col flex-grow flex-shrink pl-4">
        <div class="h-full ma-0 pa-0 v-card v-sheet theme--light">
          <div class="v-card__text">
            <div>
              <div>
                <div>
                  <p v-if="propertyEnquiryErrors.length">
                    <template
                      v-for="error in propertyEnquiryErrors"
                      :key="error"
                    >
                      <div outlined color="error" icon="warning" :value="true">
                        {{ error }}
                      </div>
                    </template>
                  </p>
                  <div v-if="propertyEnquirySuccess.length">
                    <div outlined color="success" dismissible>
                      {{ propertyEnquirySuccess }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios"
import { useQuasar } from "quasar"
import { ref } from "vue"
export default {
  setup() {
    const $q = useQuasar()
    const acceptTerms = ref(true)
    return {
      acceptTerms,
      onReset() {
        acceptTerms.value = false
      },
    }
  },
  components: {},
  props: {
    listingUuid: {
      type: String,
    },
    listingsModelName: {
      type: String,
    },
    currentListingData: {
      type: Object,
      default: () => {
        // title: "ee"
      },
      required: true,
    },
  },
  // beforeDestroy() {
  //   // this.$store.commit('clearPropertyEnquiryStatus', {})
  // },
  data() {
    return {
      enquiryValues: {},
      checkboxErrors: "",
      propertyEnquirySuccess: "",
      propertyEnquirySending: false,
      propertyEnquiryErrors: [],
      formValid: false,
      propertyEnquiryShortFields: [
        {
          labelTextTKey: "Name",
          hintTextTKey: "Your Name",
          fieldName: "name",
          inputType: "text",
          validationRules: [(v) => !!v || "Name is required"],
        },
        {
          labelTextTKey: "Email",
          hintTextTKey: "Your Email",
          fieldName: "email",
          inputType: "text",
          required: true,
          validationRules: [
            (v) => !!v || "E-mail is required",
            (v) =>
              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
              "E-mail must be valid",
          ],
        },
        {
          labelTextTKey: "Telephone No",
          hintTextTKey: "Your Telephone No",
          fieldName: "tel",
          inputType: "text",
          validationRules: [],
        },
      ],
      enquiryContent: {
        contact: {
          pref_lang: "",
          ask_type: "",
          name: "",
          // message: "Hi, I'm interested in your property and I want more information about it. Thanks.."
        },
        alertAgreed: false,
        alert_details: {},
      },
    }
  },
  computed: {
    paddingClass() {
      return ""
      // Dec 2021 - disabling for now
      // if (this.$q.screen.lt.md) {
      //   // where screen is less than md don't apply left padding
      //   return ""
      // } else {
      //   return "q-pl-md"
      // }
      // could enable below to save this computed prop but will add a lot to css:
      // https://quasar.dev/style/spacing#flex-addons
    },
    // tAndCLink() {
    //   let tAndCLink = ""
    //   if (this.currentListingData) {
    //     tAndCLink = this.currentListingData.urls.terms_and_conditions || "/"
    //   }
    //   return tAndCLink
    //   // TODO - figure out a way to get tAndCLink
    // },
  },
  watch: {},
  methods: {
    onSubmitEnquiry() {
      if (this.acceptTerms !== true) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "standard.forms.tAndCWarn",
        })
        return
      }
      let listingsModelName = this.currentListingData.listings_model_name
      let listingUuid = this.currentListingData.listing_uuid
      let dataApiBase = this.$store.getters["configStore/getDataApiBase"]

      let apiUrl = `${dataApiBase}/api_public/v4/forms/request_property_info/${listingsModelName}/${listingUuid}`
      let enquiryContent = this.enquiryContent
      this.propertyEnquirySending = true
      axios.post(apiUrl, enquiryContent).then(
        (response) => {
          this.propertyEnquirySending = false
          if (response.data.success_message) {
            this.propertyEnquirySuccess = response.data.success_message
            this.propertyEnquiryErrors = []
          } else {
            this.propertyEnquiryErrors.push("Sorry, there has been an error")
          }
        },
        (err) => {
          this.propertyEnquirySending = false
          this.propertyEnquiryErrors.push(err.message)
          console.log(err)
        }
      )
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Submitted",
      })
    },
  },
}
</script>
<style>
/* Fix gap introduced by tailwindcss: */
.listing-enq-field .q-placeholder {
  margin-top: 1px;
  margin-bottom: 1px;
}
</style>
<style scoped>
.acceptance-link {
  text-decoration: underline;
}
</style>
