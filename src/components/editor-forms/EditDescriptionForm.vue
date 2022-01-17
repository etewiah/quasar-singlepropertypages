// dec 2021 - not in use any more??
<template>
  <div>
    <q-card class="edit-desc-card">
      <q-card-section>
        <div>
          <LocalisedContentField
            :baseFieldDetails="baseFieldDetailsDesc"
            :cancelPendingChanges="cancelPendingChanges"
            :modelForEditing="currentPropForEditing"
            @updatePendingChanges="updatePendingChanges"
          ></LocalisedContentField>
        </div>
        <div>
          <SppSubmitter
            :cancelPendingChanges="cancelPendingChanges"
            :lastChangedField="lastChangedField"
            :currentModelForEditing="currentPropForEditing"
            submitObjectType="listing"
            @changesCanceled="changesCanceled"
          ></SppSubmitter>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue"
import LocalisedContentField from "src/components/editor-forms-parts//LocalisedContentField.vue"
import SppSubmitter from "src/components/editor-forms-parts//SppSubmitter.vue"
export default defineComponent({
  name: "EditDescriptionForm",
  components: {
    LocalisedContentField,
    SppSubmitter,
  },
  watch: {},
  props: {
    currentPropForEditing: {
      type: Object,
      default() {
        return {}
      },
    },
    label: {
      type: String,
    },
    // sppDetails: {
    //   type: Object,
    //   default: () => {},
    // },
    // showModalFormIncoming: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  computed: {},
  methods: {
    updatePendingChanges(fieldDetails, newValue) {
      fieldDetails.newValue = newValue
      // Dec 2021 - previous I had set above in child component but now linter
      // complains about modifying a prop so doing it here
      this.lastChangedField.fieldDetails = fieldDetails
      this.lastChangedField.lastUpdateStamp = Date.now()
      // also $set is no longer available in vue 3:
      // // this.$store.dispatch('updatePendingPropChanges', fieldDetails)
      // this.$set(this.lastChangedField, "fieldDetails", fieldDetails)
      // // below exists just to trigger watcher in formsubmitter:
      // this.$set(this.lastChangedField, "lastUpdateStamp", Date.now())
      this.cancelPendingChanges = false
    },
    changesCanceled() {
      // this.$set(this.lastChangedField, 'fieldDetails', {})
      // this.$set(this.lastChangedField, 'lastUpdateStamp', Date.now())
      this.$emit("changesCanceled")
      this.cancelPendingChanges = true
    },
  },
  data() {
    return {
      baseFieldDetailsDesc: {
        isHtml: true,
        labelTextTKey: "client_admin.fieldLabels.description",
        fieldNamePrefix: "description_",
      },
      cancelPendingChanges: false,
      lastChangedField: {
        fieldDetails: {},
        lastUpdateStamp: "",
      },
      // // showModalForm: false,
      // enquiryValues: {},
      // checkboxErrors: "",
      // propertyEnquirySuccess: "",
      // propertyEnquirySending: false,
      // propertyEnquiryErrors: [],
      // formValid: false,
    }
  },
})
</script>
