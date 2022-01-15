<template>
  <div class="rich-text-section">
    <q-card class="listing-desc-card">
      <q-card-section>
        <div :class="adjustForEditClass" v-html="compiled_html"></div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
export default {
  components: {},
  mounted: function () {},
  props: {
    adjustForEditClass: {
      type: String,
      required: false,
    },
    compiled_html: {
      type: String,
      required: false,
    },
  },
  data: () => ({}),
  methods: {},
  computed: {},
}
</script>
<style scoped>
.adjust-rich-text-for-edit {
  margin-top: 40px;
}
</style>