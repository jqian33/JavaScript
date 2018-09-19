const { app, BrowserWindow, fs } = require('electron');
const path = require('path');
let mainWindow;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        width: 875,
        resizable: false
    });
    mainWindow.loadURL('file://' + path.join(__dirname, 'index.html'));

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    mainWindow.on('closed', () => {
        mainWIndow = null
    });
});