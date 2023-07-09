import { app, shell, BrowserWindow, ipcMain, nativeTheme } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.jpg?asset'
import { savemarkdownfile, loadmarkdownfile } from './filecontrol/fileControl.js';
import { createmdfilebydb, readallabdata, readdb } from './dbcontrol/index.js'
import { log } from 'console';

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

  darkmode()

  windowcontrol(mainWindow)

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  readfilemsg()

  dbcontrol()

  createWindow()

  savemsg()



  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.


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

// dbcontrol
function dbcontrol() {
  ipcMain.handle('create-db', async () => {
    console.log("main :");
    console.log(app.getPath('appData'));
    var msg = await readdb()
    log(msg)
  })

  // markdown 数据库持久化读取
  // eslint-disable-next-line no-unused-vars
  ipcMain.handle('load-db-data', async (event) => {
    log("load-db-data")
    const alldbdata=await readallabdata()
    log("alldbdata")
    log(alldbdata)
    return alldbdata
  })

  // markdown 数据库持久化存储
  ipcMain.handle('save-file-by-db', async (event, content) => {
    log('save-file-by-db')
    log(content)
    await createmdfilebydb(content)
  })

}