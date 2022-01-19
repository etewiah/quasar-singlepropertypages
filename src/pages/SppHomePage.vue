<template>
  <q-page class="">
    <div class="container p-0 mx-auto">
      <div class="row mt-10">
        <div class="col-xs-12">
          <RegularSppCreator></RegularSppCreator>
        </div>
        <div class="col-xs-12">
          <LocalSppItems></LocalSppItems>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, ref } from "vue"
import RegularSppCreator from "src/components/RegularSppCreator.vue"
import LocalSppItems from "src/components/LocalSppItems.vue"
export default defineComponent({
  name: "SppHomePage",
  components: {
    RegularSppCreator,
    LocalSppItems,
  },
  methods: {},
  props: {},
  computed: {},
  mounted() {},
})
</script>
