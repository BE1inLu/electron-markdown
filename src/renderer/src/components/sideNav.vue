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
        <el-sub-menu class="sub-menu-style" index="1">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>Setting</span>
          </template>
          <el-menu-item class="settingitem" index="1-1">Setting</el-menu-item>
          <el-menu-item class="settingitem" index="1-2" @click="open">About</el-menu-item>
          <el-menu-item class="settingitem" index="1-3">Exit</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { ElMessageBox } from 'element-plus'
import { reactive } from 'vue'
export default {
  name: 'Sidenav',
  methods: {
    open() {
      const versions = reactive({ ...window.electron.process.versions })
      ElMessageBox({
        title: 'about',
        message:
          'Electron v' +
          versions.electron +
          ',chromeium v' +
          versions.chrome +
          ',Node v' +
          versions.node +
          ',V8 v' +
          versions.v8,
      })
    }
  }
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

.buttonNav,
.sideNav {
  border-right: 0 !important;
}

.el-menu-item.settingitem {
  height: 24px;
  padding: 5px;
}
</style>