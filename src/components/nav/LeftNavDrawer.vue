<template>
  <q-drawer
    side="left"
    v-model="leftDrawerOpenModel"
    show-if-above
    bordered
    class="bg-grey-1"
  >
    <q-list>
      <!-- <q-item-label header class="text-grey-8">Actions</q-item-label> -->
      <q-item clickable>
        <q-btn
          :to="{ name: sppHomeRouteName }"
          class="full-width"
          color="primary"
          icon="home"
          label="home"
        />
      </q-item>
      <q-item clickable>
        <q-btn
          class="full-width"
          color="brown-5"
          label="Log Out"
          icon="logout"
          @click="logUserOut"
        />
      </q-item>
      <q-item>
        <HomeHuntOverview></HomeHuntOverview>
      </q-item>
      <ListingNavItems></ListingNavItems>
      <!-- <q-btn
          align="around"
          class="full-width"
          color="secondary"
          label="Export To HTML"
          icon="visibility"
          @click="exportSppToHtml"
        />
        <q-btn
          align="around"
          class="full-width"
          color="secondary"
          label="Export To Pdf"
          icon="visibility"
          @click="exportSppToPdf"
        /> -->
      <!-- <q-item clickable>
        <q-btn
          align="around"
          class="full-width"
          color="brown-5"
          label="Publish"
          icon="settings"
          @click="startPublishSpp"
        />
      </q-item> -->
    </q-list>
  </q-drawer>
</template>
<script>
import { defineComponent, ref } from "vue"
import ListingNavItems from "components/nav/ListingNavItems.vue"
import HomeHuntOverview from "components/home-hunt/HomeHuntOverview.vue"
export default defineComponent({
  name: "LeftNavDrawer",
  components: {
    ListingNavItems,
    HomeHuntOverview,
  },
  computed: {
    sppHomeRouteName() {
      return "rHomePage"
    },
  },
  props: {
    leftDrawerOpen: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  watch: {
    leftDrawerOpen: {
      handler(newValue, oldVal) {
        this.leftDrawerOpenModel = newValue
      },
      // deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      leftDrawerOpenModel: false,
      showPublishModal: false,
      exportToPdfModal: false,
    }
  },
  methods: {
    logUserOut() {
      this.$q.cookies.set("spp_user_token", null, { path: "/" })
      this.$router.push({ name: "rHomePage" })
      // this.$q.cookies.set("spp_user", null)
      // let sppItemsKey = "spp_items:pwbprem"
      // Clear out locally store SPPs:
      // localStorage.setItem(sppItemsKey, "[]")
      // location.reload()
    },
  },
})
</script>
