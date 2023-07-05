<template>
  <div class="sidenavdisplay">
    <div class="sidenavhead">
      <el-menu class="sideNav" collapse="true" :router="true">
        <el-menu-item itemid="1" index="/home">
          <el-icon><House /></el-icon>
          <template #title>
            <span>Home</span>
          </template>
        </el-menu-item>
        <el-menu-item itemid="2" index="/edit">
          <el-icon><Edit /></el-icon>
          <template #title>
            <span>Edit</span>
          </template>
        </el-menu-item>
        <el-menu-item itemid="3" index="/testview">
          <el-icon><Document /></el-icon>
          <template #title>
            <span>test</span>
          </template>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="sidenavbutton">
      <el-menu class="buttonNav" collapse="true">
        <el-menu-item itemid="1">
          <el-icon><Setting /></el-icon>
          <template #title>
            <span>Setting</span>
          </template>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidenav',
}
</script>

<style lang="css">
.sidenavdisplay {
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.flex-grow {
  flex-grow: 3;
}

.buttonNav,.sideNav{
  border-right: 0 !important;
}
</style>