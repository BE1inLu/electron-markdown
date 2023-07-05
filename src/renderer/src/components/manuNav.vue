<template>
  <div class="menudiv">
    <el-row class="MainMenuNav">
      <el-col :span="2">
      </el-col>
      <el-col :span="2">
      </el-col>
      <el-col :span="2">
      </el-col>
      <el-col :span="2">
      </el-col>

      <el-col :span="11"></el-col>
      <el-col :span="1" class="darkModeByMenuItem">
        <dark-switch></dark-switch>
      </el-col>
      <el-col :span="4" class="windowcontrol">
        <el-button-group style="padding-right: 10px">
          <el-button id="minbtn" text size="small" plain="true" @click="windowminswitch()">
            <el-icon id="min" size="20">
              <SemiSelect />
            </el-icon>
          </el-button>
          <el-button id="maxbtn" v-model="windowmax" text size="small" @click="windowmaxswitch()">
            <el-icon id="max" size="20">
              <FullScreen />
            </el-icon>
          </el-button>
          <el-button
            id="closebtn"
            v-model="windowclose"
            text
            size="small"
            type="danger"
            @click="windowcloseswitch()"
          >
            <el-icon id="close" size="20">
              <CloseBold />
            </el-icon> </el-button
        ></el-button-group>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import darkSwitch from './darkSwitch.vue'
export default {
  name: 'MenuNavComponent',
  components: { darkSwitch },
  data() {
    return {
      windowmax: false,
      windowclose: false
    }
  },
  methods: {
    windowminswitch() {
      document.getElementById('minbtn').blur()
      window.control.minwindow()
    },
    windowmaxswitch() {
      console.log('click windowmax')
      window.control.maxwindow()
      document.getElementById('maxbtn').blur()
    },
    windowcloseswitch() {
      console.log('click windowclose')
      window.control.closewindow()
    }
  }
}
</script>

<style lang="css">
.MainMenuNav {
  padding: 4px;
  -webkit-app-region: drag;
}

.darkModeByMenuItem{
  display:flex;
  justify-content: flex-end;
  -webkit-app-region: no-drag;
}

.windowcontrol {
  display: flex;
  justify-content: flex-end;
  -webkit-app-region: no-drag;
}
</style>