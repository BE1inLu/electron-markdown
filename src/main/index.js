import { app, shell, BrowserWindow, ipcMain, nativeTheme } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.jpg?asset'
import { savemarkdownfile, loadmarkdownfile } from './filecontrol/fileControl.js';
import { createmdfilebydb, readallabdata, loaddb, loaddbdatabyuuid, deletefilebydb } from './dbcontrol/index.js'
import { log } from 'console';
// import { storefunc } from './store/idnex';

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 650,
    minHeight: 650,
    minWidth: 1000,
    frame: false,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  // store use
  // const store = storefunc()

  darkmode()
  windowcontrol(mainWindow)
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}
app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  readfilemsg()

  dbcontrol()

  createWindow()

  savemsg()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

function darkmode() {
  ipcMain.handle('toggle-theme:dark', () => {
    nativeTheme.themeSource = 'dark'
  })

  ipcMain.handle('toggle-theme:light', () => {
    nativeTheme.themeSource = 'light'
  })
}

function windowcontrol(mainWindow) {
  ipcMain.on('min-window', () => {
    mainWindow.minimize()
  })
  ipcMain.on('max-window', () => {
    mainWindow.isMaximized() ? mainWindow.restore() : mainWindow.maximize()
  })
  ipcMain.on('close-window', () => {
    mainWindow.close()
  })
}

// 实现接收回传的文件信息
function savemsg() {
  ipcMain.on('open-save-chart-dialog', (event, msg) => {
    savemarkdownfile(msg)
  })
}

function readfilemsg() {
  ipcMain.handle('dialog-openfile', loadmarkdownfile);
}

// 数据库读取 or 初始化
function dbcontrol() {
  ipcMain.handle('create-db', async () => {
    var msg = await loaddb()
    log(msg)
  })

  // markdown 数据库持久化读取
  // eslint-disable-next-line no-unused-vars
  ipcMain.handle('load-db-data', async (event) => {
    log("load-db-data")
    const alldbdata = await readallabdata()
    return alldbdata
  })

  // markdown 数据库持久化存储
  ipcMain.handle('save-file-by-db', async (event, content) => {
    log('save-file-by-db')
    await createmdfilebydb(content)
  })

  // markdown 数据库持久化读取 content
  ipcMain.handle('load-db-dada-by-uuid', async (event, uuid) => {
    log('load-db-dada-by-uuid')
    const data = await loaddbdatabyuuid(uuid)
    log(data)
    return data
  })

  ipcMain.handle('delete-db-file-by-uuid', async (event, uuid) => {
    log('delete-db-file-by-uuid')
    log("uuid: ")
    log(uuid)
    const localbool = await deletefilebydb(uuid)
    log("localbool: ",localbool)
    return localbool
  })

}