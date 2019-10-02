const electron = require('electron')
const isDev = require('electron-is-dev')
const electronOauth2 = require('electron-oauth2')
const path = require('path')
require('electron-reload')(__dirname)
const fs = require('fs')

const myApp = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow

const windowParams = {
  width: 900,
  height: 680,
  alwaysOnTop: true,
  autoHideMenuBar: true,
  webPreferences: {
    nodeIntegration: true,
    webIntegration: true
  }
}

function createWindow() {
  mainWindow = new BrowserWindow(windowParams)

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )

  mainWindow.on('closed', () => (mainWindow = null))
}

myApp.on('ready', createWindow)

myApp.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    myApp.quit()
  }
})

myApp.on('activate', () => mainWindow !== null && createWindow())
