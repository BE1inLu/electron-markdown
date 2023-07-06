import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer
const api = {}

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
    savefile:(value)=>ipcRenderer.send('open-save-chart-dialog',value),
  })
} catch (error) {
  console.log(error);
}
