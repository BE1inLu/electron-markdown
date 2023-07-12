import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer
const api = {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}

// test1:实现 dark mode
try {
  contextBridge.exposeInMainWorld('darkMode', {
    toggleDarkTheme: () => ipcRenderer.invoke("toggle-theme:dark"),
    toggleLightTheme: () => ipcRenderer.invoke("toggle-theme:light")
  })
} catch (error) {
  console.log(error);
}

try {
  contextBridge.exposeInMainWorld('control', {
    // test2:实现窗口控制
    minwindow: () => ipcRenderer.send('min-window'),
    maxwindow: () => ipcRenderer.send('max-window'),
    closewindow: () => ipcRenderer.send('close-window'),
    // test3:实现文件保存功能
    savefile: (msg) => ipcRenderer.send('open-save-chart-dialog', msg),// 外部保存
    savefilebysql: (msg) => ipcRenderer.invoke('save-file-by-db', msg),// 数据库保存
    // test4:实现文件读取功能
    openFile: () => ipcRenderer.invoke('dialog-openfile'),// 外部读取
  })
} catch (error) {
  console.log(error);
}

// db ipc通信 方法
try {
  contextBridge.exposeInMainWorld('dbcontrol', {
    createdb: () => ipcRenderer.invoke('create-db'),
    loaddbdata: () => ipcRenderer.invoke('load-db-data'),
    loaddbcontent: (uuid) => ipcRenderer.invoke('load-db-dada-by-uuid', uuid),
    savedbdatabyuuid: (content) => ipcRenderer.invoke('save-db-data-by-uuid', content),
    deletefilebydb: (uuid) => ipcRenderer.invoke('delete-db-file-by-uuid', uuid)
  })
} catch (err) {
  console.log(err);
}
