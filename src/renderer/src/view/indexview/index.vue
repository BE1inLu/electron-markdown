<template>
  <el-tabs v-model="activeName" class="indexview_main">
    <el-tab-pane label="table" name="tableview" style="padding-left: 10px">
      <!-- tableview -->
      <tableview :list="tabledata"/>
    </el-tab-pane>
    <el-tab-pane label="card" name="cardview"> cardview </el-tab-pane>
  </el-tabs>
  <div>
    <el-button @click="getsqldata">test</el-button>
    <el-button @click="loaddbdata">loaddbdata</el-button>
  </div>
</template>

<script>
import tableview from './tableview.vue'
export default {
  name: 'IndexView',
  components: { tableview },
  data() {
    return {
      activeName: 'tableview',
      tabledata: [
        { id: 1, name: 'test1', createdate: '2023-7-7', update: '2023-7-8' },
        { id: 2, name: 'test2', createdate: '2023-7-5', update: '2023-7-8' },
        { id: 3, name: 'test3', createdate: '2023-7-6', update: '2023-7-8' }
      ]
    }
  },

  methods: {
    async loaddbdata() {
       const dbdata=await window.dbcontrol.loaddbdata()
       console.log(dbdata);
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