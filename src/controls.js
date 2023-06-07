const { ipcRenderer } = require('electron');
const ipc = ipcRenderer;

closeBtn.addEventListener('click', () => {
    ipc.send('closeApp');
});

minimizeBtn.addEventListener('click', () => {
    ipc.send('minimizeApp');
});

dlbtn.addEventListener('click', () => {
    const url = document.getElementById('URLinput').value;
    ipc.send('downloadSong', url);
});
