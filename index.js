const { app, BrowserWindow, ipcRenderer, ipcMain } = require('electron')
const ipc = ipcMain;
const path = require("path");
const fs = require("fs");


const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 350,
      icon: 'src/public/icon.png',
      frame: false,
      resizable: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        devTools: false,
      }
    })

    win.setMenuBarVisibility(false)

    win.loadFile('src/index.html')
    

// DOWNLOAD SONG
const youtubedl = require('youtube-dl-exec')

ipc.on('downloadSong', (event, url) => {
  console.log('Downloading song from: ' + url)

youtubedl(url, {
  noCheckCertificates: true,
  ["add-metadata"]: true,
  ["embed-metadata"]: true,
  ["embed-thumbnail"]: true,
  ["parse-metadata"]: 'title:%(album)s',
  ["parse-metadata"]: 'uploader:%(album_artist)s',
  ["output"]: '~/Desktop/%(uploader)s/%(title)s.%(ext)s',
  noWarnings: true,
  preferFreeFormats: true,

}).then(output => console.log(output))

});


// CLOSE APP
    ipc.on('closeApp', () => {
    console.log('App closed by user')
    win.close()
    });


// MINIMIZE APP
    ipc.on('minimizeApp', () => {
    console.log('App minimized by user')
    win.minimize()
    });
  }


    app.whenReady().then(createWindow);

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
      })
      
