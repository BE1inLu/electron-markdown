<template>
  <el-tabs v-model="activeName" class="indexview_main">
    <el-tab-pane label="table" name="tableview" style="padding-left: 10px">
      <!-- tableview -->
      <tableview />
    </el-tab-pane>
    <el-tab-pane label="card" name="cardview"> cardview </el-tab-pane>
  </el-tabs>
  <div><el-button @click="getsqldata">test</el-button></div>
</template>

<script>
import tableview from './tableview.vue'
export default {
  name: 'IndexView',
  components: { tableview },
  data() {
    return {
      activeName: 'tableview',
      sqldata: []
    }
  },
  methods: {
    async getsqldata() {
      console.log('click')
      await window.dbcontrol.testdb()
    }
  }
}
</script>

<style>
.el-tabs--top .el-tabs__item.is-top:nth-child(2) {
  padding-left: 20px;
}

.el-tabs__item {
  color: #fff;
}

.indexview_main > .el-tabs__content {
  padding: 0 20px;
}
</style>