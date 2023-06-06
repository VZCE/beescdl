const { ipcRenderer } = require('electron');
const ipc = ipcRenderer;

closeBtn.addEventListener('click', () => {
    ipc.send('closeApp');
});

minimizeBtn.addEventListener('click', () => {
    ipc.send('minimizeApp');
});

dlbtn.addEventListener('click', () => {
    ipc.send('downloadSong');
});

URLinput.addEventListener('click', (e) => {
    ipc.send('URLinput');
});