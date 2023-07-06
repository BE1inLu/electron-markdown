<template>
  <Editor mode="tab" :value="value" :plugins="plugins" :fullscreen="true" @change="handleChange" />
</template>

<script>
import gfm from '@bytemd/plugin-gfm'
import heighlight from '@bytemd/plugin-highlight'
import emoji from '@bytemd/plugin-gemoji'
import { Editor } from '@bytemd/vue-next'
import '../assets/css/byteMD.css'
const plugins = [gfm(), heighlight(), emoji()]
export default {
  components: { Editor },
  data() {
    return {
      value: '',
      plugins
    }
  },
  methods: {
    handleChange(v) {
      this.value = v
      window.addEventListener('keyup', this.handleKeyPress, true)
    },
    handleKeyPress(event) {
      if (event.ctrlKey && event.keyCode == 83) {
        window.control.savefile(this.value);
      }
    }
  }
}
</script>

<style lang="less">
@import '../assets/less/markdownComp.less';
</style>