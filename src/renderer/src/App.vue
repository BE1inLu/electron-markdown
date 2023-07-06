<script setup>
import manuNav from './components/manuNav.vue'
import sideNav from './components/sideNav.vue'
import timeComp from './components/timeComp.vue'
</script>

<template>
  <div class="mainwindow">
    <div class="navheader">
      <manuNav></manuNav>
    </div>
    <el-container class="maincontainer">
      <el-aside class="nav_header_aside">
        <sideNav></sideNav>
      </el-aside>
      <el-container>
        <el-header class="main_header" style="--el-header-height: 30px;">
          <div>
            <span style="display: flex;height: 50px;"> Hallo world|<timeComp></timeComp></span>
          </div>
        </el-header>

        <el-main class="mainwindowByTable">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less">
@import './assets/less/main_styles.less';
</style>
