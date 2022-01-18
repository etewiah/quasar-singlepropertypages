<template>
  <router-view />
</template>
<script>
import { defineComponent } from "vue"
import { listingsEditProvider } from "src/compose/listings-edit-provider.js"

export default defineComponent({
  name: "App",
  provide: {
    listingsEditProvider,
  },
})
</script>
