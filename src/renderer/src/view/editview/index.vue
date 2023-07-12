<template>
  <div>
    <markdownComp :content="content.cont" :uuid="content.id"/>
  </div>
</template>

<script>
import markdownComp from '../../components/markdownComp.vue'

export default {
  components: { markdownComp },
  data() {
    return {
      content: {
        cont: [],
        id: []
      }
    }
  },
  // eslint-disable-next-line vue/require-prop-types
  mounted() {
    this.loaddbcontent()
  },
  methods: {
    async loaddbcontent() {
      const uuid = this.$route.query
      const localcontent = await window.dbcontrol.loaddbcontent(uuid)
      this.content.id = uuid
      this.content.cont = localcontent[0]
    }
  }
}
</script>

<style>
</style>