<template>
  <div>
    <markdownComp :content="content"/>
  </div>
</template>

<script>
import markdownComp from '../../components/markdownComp.vue'

export default {
  components: { markdownComp },
  data(){
    return{
      content:[],
    }
  },
  // eslint-disable-next-line vue/require-prop-types
  mounted() {
    this.loaddbcontent()
  },
  methods: {
    async loaddbcontent() {
      console.log(this.$route.query)
      const uuid = this.$route.query;
      const localcontent =await window.dbcontrol.loaddbcontent(uuid)
      console.log("localcontent: ");
      console.log(localcontent[0]);
      this.content=localcontent[0]
    }
  }
}
</script>

<style>
</style>