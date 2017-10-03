const { app, BrowserWindow, dialog, ipcMain: ipc, fs } = require('electron');
const path = require('path');
let mainWindow;

app.on('ready', function() {
  mainWindow = new BrowserWindow();
  mainWindow.loadURL('file://' + path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  ipc.on('show-dialog', (event, {type}) => {
    console.log("hi");
    dialog.showMessageBox(mainWindow, {
      type: type,
      buttons: [],
      message: 'Hello, how are you?'
    });
  });

  // dialog.showOpenDialog((fileNames) => {
  //   if(fileNames === undefined) {
  //     console.log("No file selected");
  //     return;
  //   }

  //   fs.readFile(filepath, 'utf-8', (err, data) => {
  //     if(err) {
  //       alert("An error ocurred read the file :" + err.message);
  //       return;
  //     }

  //     // Change how to handle the file content
  //     console.log("The file content is : " + data);
  //   });
  // });
});
