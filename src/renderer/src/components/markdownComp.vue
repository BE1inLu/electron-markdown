<template>
  <div>
    <Editor
      mode="auto"
      :value="value"
      :plugins="plugins"
      :fullscreen="true"
      max-length="100"
      @change="handleChange"
    />
    <div class="buttonbar">
      <el-row style="padding-left: 10px">
        <el-button type="primary" size="small" @click="buttonclick()">Save</el-button>
        <el-button type="info" size="small" style="padding-left: 10px" @click="loadfileclick()"
          >Read</el-button
        >
      </el-row>
    </div>
  </div>
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
      console.log(v)
    },
    handleKeyPress(event) {
      if (event.ctrlKey && event.keyCode == 83) {
        window.control.savefile(this.value)
      }
    },
    buttonclick() {
      if (this.value != null) {
        console.log('按钮触发')
        console.log(this.value)
        window.control.savefile(this.value)
      }
    },
    async loadfileclick() {
      var savedata = await window.control.openFile()
      console.log('savedata:')
      console.log(savedata)
      this.value = savedata
    }

    // TODO:弹出提示窗口 & msgbox 提示信息

  }
}
</script>

<style lang="less">
@import '../assets/less/markdownComp.less';
.buttonbar {
  padding-top: 5px;
}
</style>