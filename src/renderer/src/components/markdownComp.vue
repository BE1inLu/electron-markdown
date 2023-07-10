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
      <el-row>
        <el-dropdown
          split-button
          style="margin-left: 10px"
          type="primary"
          size="small"
          @click="savebylocal()"
        >
          Save
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="savefilebydatabase()">save by database</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <el-dropdown
          split-button
          type="info"
          size="small"
          style="margin-left: 20px"
          @click="loadfilebylocal()"
        >
          Read
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-row>
    </div>
  </div>
  <el-dialog :v-model="dialogcontrol" title="input your filetitle" width="20%">
    <el-form v-model="formtitle">
      <el-form-item label="title">
        <el-input v-model="filetitle" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="savetitle">Create</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import gfm from '@bytemd/plugin-gfm'
import heighlight from '@bytemd/plugin-highlight'
import emoji from '@bytemd/plugin-gemoji'
import { Editor } from '@bytemd/vue-next'
import '../assets/css/byteMD.css'
import { ElMessage } from 'element-plus'
const plugins = [gfm(), heighlight(), emoji()]
export default {
  components: { Editor },
  // eslint-disable-next-line vue/require-prop-types
  props:["content"]
  ,
  data() {
    return {
      value: '',
      plugins,
      filetitle: '',
      dialogcontrol: false,
    }
  },
  updated() {
    this.value=this.content[0]
  },
  methods: {
    handleChange(v) {
      this.value = v
      window.addEventListener('keyup', this.handleKeyPress, true)
    },
    handleKeyPress(event) {
      if (event.ctrlKey && event.keyCode == 83) {
        window.control.savefile(this.value)
      }
    },
    savebylocal() {
      if (this.value != null) {
        try {
          window.control.savefile(this.value)
          ElMessage({
            message: 'save file success',
            type: 'success'
          })
        } catch (err) {
          ElMessage.error('save file error')
        }
      }
    },
    async loadfilebylocal() {
      try {
        var savedata = await window.control.openFile()
        this.value = savedata
        ElMessage({
          message: 'load file success',
          type: 'success'
        })
      } catch (err) {
        ElMessage.error('open file error')
        console.log(err)
      }
    },
    async savefilebydatabase() {
      if (this.value != null) {
        try {
          await window.control.savefilebysql(this.value)
          ElMessage({
            message: 'save file by sql success',
            type: 'success'
          })
        } catch (err) {
          ElMessage.error('save file error')
          console.log(err)
        }
      } else {
        ElMessage.error('save file error')
      }
    },
    // TODO
    async loadfilebydatabase() {}
  }
}
</script>

<style lang="less">
@import '../assets/less/markdownComp.less';
.buttonbar {
  padding-top: 5px;
}
</style>