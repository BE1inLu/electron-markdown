<template>
  <div class="darkbutton">
    <el-tooltip :content="'Dark Mode: ' + openDarkMode">
      <el-switch
        id="toggle-theme-button"
        v-model="openDarkMode"
        size="small"
        @change="toggleTheme"
      />
    </el-tooltip>
  </div>
</template>

<script>
// test1:实现 dark mode
export default {
  name: 'Darkcomponent',
  data() {
    return {
      openDarkMode: true
    }
  },
  methods: {
    toggleTheme() {
      this.openDarkMode ? window.darkMode.toggleDarkTheme() : window.darkMode.toggleLightTheme()
    }
  }
}
</script>

<style lang="less">
@import '../assets/less/darkMode.less';
  
.duckbutton {
  display: flex;
}
</style>
