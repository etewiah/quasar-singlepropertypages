<template>
  <div>
    <div class="spp-modal-forms-ctr">
      <!-- <q-btn label="Edit" color="primary" icon="apartment" /> -->
      <q-dialog full-width v-model="showModalFormLocal">
        <q-layout view="Lhh lpR fff" container class="bg-white">
          <q-header class="bg-primary">
            <q-toolbar>
              <!-- <q-btn flat @click="drawer = !drawer" round dense icon="menu" /> -->
              <q-toolbar-title class="text-center">{{ label }}</q-toolbar-title>
              <!-- <q-btn flat @click="drawerR = !drawerR" round dense icon="menu" /> -->
              <q-btn flat v-close-popup round dense icon="close" />
            </q-toolbar>
          </q-header>
          <q-page-container>
            <q-page>
              <component
                :is="formToUse"
                :allPhotosForSpp="allPhotosForSpp"
                :currentPropForEditing="currentPropForEditing"
              ></component>
            </q-page>
          </q-page-container>
        </q-layout>
      </q-dialog>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue"
import EditFeaturesForm from "src/components/editor-forms//EditFeaturesForm.vue"
import EditAttributesForm from "src/components/editor-forms//EditAttributesForm.vue"
// import EditDescriptionForm from "src/components/editor-forms//EditDescriptionForm.vue"
import EditMapForm from "src/components/editor-forms//EditMapForm.vue"
import EditRegularTextsForm from "src/components/editor-forms//EditRegularTextsForm.vue"
import EditRichTextForm from "src/components/editor-forms//EditRichTextForm.vue"
import ImagePickerSection from "src/components/editor-forms//ImagePickerSection.vue"
export default defineComponent({
  name: "SppModalFormsContainer",
  components: {
    EditFeaturesForm,
    EditAttributesForm,
    EditMapForm,
    EditRegularTextsForm,
    // EditDescriptionForm,
    EditRichTextForm,
    ImagePickerSection,
  },
  watch: {
    showModalFormIncoming: {
      handler(newValue, oldVal) {
        this.showModalFormLocal = newValue
      },
      // deep: true,
      // immediate: true,
    },
    showModalFormLocal: {
      handler(newValue, oldVal) {
        if (!!!newValue) {
          this.$emit("modalHasClosed")
        }
        // this.showModalFormLocal = newValue
      },
      // deep: true,
      // immediate: true,
    },
  },
  props: {
    allPhotosForSpp: {
      type: Object,
      default: () => {},
    },
    label: {
      type: String,
    },
    formName: {
      type: String,
    },
    currentPropForEditing: {
      type: Object,
      default: () => {},
    },
    showModalFormIncoming: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    formToUse() {
      return this.formName
    },
  },
  methods: {},
  data() {
    return {
      showModalFormLocal: false,
    }
  },
})
</script>
