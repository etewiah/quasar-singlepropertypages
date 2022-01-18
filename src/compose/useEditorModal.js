import { ref, computed } from "vue";
// import ClientService from "src/services/client.service"
import { useStore } from "vuex"
import axios from "axios"
import authHeader from "src/services/auth/auth-header"

export default function () {
  const store = useStore()
  let dataApiBase = store.getters["configStore/getDataApiBase"]
  let mgmtBaseURL = `${dataApiBase}/api_mgmt/`

  let showModalForm = ref(false)
  let heroFabBtnMod = ref(false)
  // let activeEditFabGroup = ref("0")
  let editFormName = ref("EditRegularTextsForm")
  let editFormLabel = ref("Edit Main Texts")

  function onMoveSection(currentPageSectionForEditing, direction) {
    let sectionUuidToSwapWith = currentPageSectionForEditing.nextSectionUuid
    if (direction === 'up') {
      sectionUuidToSwapWith = currentPageSectionForEditing.previousSectionUuid
    }
    let pageSectionUuid = currentPageSectionForEditing.uuid
    let apiUrl = `${mgmtBaseURL}v4/swap_page_sections/${pageSectionUuid}/${sectionUuidToSwapWith}`
    return axios.put(apiUrl, {}, { headers: authHeader() }).then((response) => {
      location.reload()
    })
  }
  function onStartHideSection(currentPageSectionForEditing) {
    // really wanted to use props here but couldn't find a way
    // to pass them in.  This works well enough though..
    currentPageSectionForEditing.visible_on_page = false
    let pageSectionUuid = currentPageSectionForEditing.uuid
    let putData = {
      page_section: currentPageSectionForEditing,
    }
    let apiUrl = `${mgmtBaseURL}v4/page_sections/${pageSectionUuid}`
    return axios.put(apiUrl, putData, { headers: authHeader() }).then((response) => {
      location.reload()
    })
  }
  function onShowSection(currentPageSectionForEditing) {
    currentPageSectionForEditing.visible_on_page = true
    let pageSectionUuid = currentPageSectionForEditing.uuid
    let putData = {
      page_section: currentPageSectionForEditing,
    }
    let apiUrl = `${mgmtBaseURL}v4/page_sections/${pageSectionUuid}`
    return axios.put(apiUrl, putData, { headers: authHeader() }).then((response) => {
      location.reload()
    })
    // let dataApiBase = store.getters["configStore/getDataApiBase"]
    // ClientService.putPageSection(
    //   dataApiBase,
    //   pageSectionUuid,
    //   {
    //     page_section: currentPageSectionForEditing,
    //   },
    //   {}
    // ).then((response) => { })
  }
  function onStartTextEdit(editFormNameToUse, editFormLabelToUse) {
    showModalForm.value = true
    editFormName.value = editFormNameToUse || "EditRegularTextsForm"
    editFormLabel.value = editFormLabelToUse || "Edit Main Texts"
  }
  function onStartSingleImageSelect() {
    showModalForm.value = true
    editFormName.value = "ImagePickerSection"
    editFormLabel.value = "Select Main Image"
  }
  function sppModalHasClosed() {
    showModalForm.value = false
  }
  // function onEditFabMouseLeave() {
  //   setTimeout(() => {
  //     heroFabBtnMod.value = false
  //     this.$emit("setActiveEditFabGroup", "0")
  //   }, 3000)
  // }
  // // function onEditFabMouseEnter(currentPageSectionForEditing) {
  //   // activeEditFabGroup.value = currentPageSectionForEditing.uuid
  //   heroFabBtnMod.value = true
  // }
  return {
    // activeEditFabGroup,
    heroFabBtnMod,
    showModalForm,
    editFormName,
    editFormLabel,
    onStartTextEdit,
    // onEditFabMouseLeave,
    // onEditFabMouseEnter,
    sppModalHasClosed,
    onStartSingleImageSelect,
    onStartHideSection,
    onShowSection,
    onMoveSection
  }
}