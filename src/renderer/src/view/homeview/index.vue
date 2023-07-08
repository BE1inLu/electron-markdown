<template>
  <div>
    <h1>homeview</h1>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getsqldata()
  },
  methods: {
    async getsqldata() {
      console.log('loaddbdata')
      await window.dbcontrol.createdb()
    }
  }
}
</script>

<style>
</style>