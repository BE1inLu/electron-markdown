<template>
  <el-tabs v-model="activeName" class="indexview_main">
    <el-tab-pane label="table" name="tableview" style="padding-left: 10px">
      <!-- tableview -->
      <tableview :paramdata="tabledata" />
    </el-tab-pane>
    <el-tab-pane label="card" name="cardview"> cardview </el-tab-pane>
  </el-tabs>
  <div></div>
</template>

<script>
import tableview from './tableview.vue'
export default {
  name: 'IndexView',
  components: { tableview },
  data() {
    return {
      activeName: 'tableview',
      tabledata: [],
      timer:null,
    }
  },
  mounted() {
    this.loaddbdata()
  },
  methods: {
    async loaddbdata() {
      const dbdata = await window.dbcontrol.loaddbdata()
      for (var i = 0; i < dbdata.length; i++) {
        var localtable
        localtable = {
          id: dbdata[i][0],
          name: 'null',
          createdate: dbdata[i][2],
          update: dbdata[i][3]
        }
        this.tabledata.push(localtable)
      }

      console.log(this.tabledata)
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

@media (prefers-color-scheme: light) {
  .el-tabs__item {
    color: #000;
  }
}

.indexview_main > .el-tabs__content {
  padding: 0 20px;
}
</style>