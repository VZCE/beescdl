const os = require ('os');
const username = os.userInfo ().username;
const { app, BrowserWindow, ipcRenderer, ipcMain } = require('electron')
const $ = require ('jquery');
const ipc = ipcMain;
const path = require("path");


const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 350,
      icon: 'src/public/icon.png',
      frame: false,
      resizable: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        devTools: true,
      }
    })

    win.setMenuBarVisibility(false)
  
    win.loadFile('src/index.html')

// DOWNLOAD SONG
const scdl = require('js-scdl')
const Soundcloud = new scdl.SoundCloud();
ipc.on('downloadSong', () => {
console.log('Downloading song...')
Soundcloud.download('https://soundcloud.com/velcroo/velcro-lightspeed-quantum', 'D:/VNCE/Téléchargements')
console.log('Song downloaded!')
});

// ipc.on('downloadSong', () => {

// client.getSongInfo(URLinput)
//     .then(async song => {
//         const stream = await song.downloadProgressive();
//         const writer = stream.pipe(fs.createWriteStream(`./${song.title}.mp3`));
//         writer.on("finish", () => {
//           console.log("Finished writing song!")
//           process.exit(1);
//         });
//     })
//     .catch(console.error);
// });

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
      
