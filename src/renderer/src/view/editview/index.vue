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
      console.log(this.$route.query)
      const uuid = this.$route.query
      const localcontent = await window.dbcontrol.loaddbcontent(uuid)

      console.log('localcontent: ')
      console.log(localcontent[0])

      this.content.id = uuid
      this.content.cont = localcontent[0]


      console.log('content:')
      console.log(this.content)
      console.log(this.content.cont)
      console.log(this.content.id)

      
    }
  }
}
</script>

<style>
</style>