<template>
  <el-table :data="tabledata">
    <el-table-column type="index" label="id" width="50px" />
    <el-table-column prop="id" label="SQL-ID" width="150px" />
    <el-table-column prop="name" label="Name" />
    <el-table-column prop="date" label="Date" />
    <el-table-column prop="setting" label="satting">
      <template #default="">
        <el-button class="edit" type="primary">Edit</el-button>
        <el-button class="del" type="danger">Del</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'Tableview',
  data() {
    return {
      tabledata: [
        { id: 1, name: 'test1', date: '2023-7-7' },
        { id: 2, name: 'test2', date: '2023-7-5' },
        { id: 3, name: 'test3', date: '2023-7-6' }
      ]
    }
  },
}
</script>

<style >
@media (prefers-color-scheme: dark) {
  .el-table {
    --el-table-text-color: #86a5b1;
    --el-table-header-text-color: #86a5b1;
    --el-table-row-hover-bg-color: #2f3241;
    --el-table-current-row-bg-color: #2f3241;
    --el-table-header-bg-color: #2f3241;
    --el-table-bg-color: #2f3241;
    --el-table-tr-bg-color: #2f3241;
    --el-table-expanded-cell-bg-color: #2f3241;
    --el-table-fixed-left-column: inset 10px 0 10px -10px rgba(0, 0, 0, 0.15);
    --el-table-fixed-right-column: inset -10px 0 10px -10px rgba(0, 0, 0, 0.15);
    --el-bg-color: #2f3241;
  }
}
</style>