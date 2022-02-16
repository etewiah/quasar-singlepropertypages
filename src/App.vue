<template>
  <router-view />
</template>
<script>
import { defineComponent } from "vue"
import { listingsEditProvider } from "src/compose/listings-edit-provider.js"
import { boardEditProvider } from "src/compose/board-edit-provider.js"

export default defineComponent({
  name: "App",
  provide: {
    listingsEditProvider,
    boardEditProvider,
  },
})
</script>
