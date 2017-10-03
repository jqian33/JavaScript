const { ipcRenderer: ipc, remote } = require('electron');
require('devtron').install();

var fs = require('fs');

document.querySelector('#btn').addEventListener('click', () => {
  ipc.send('show-dialog', {
    type: 'info'
  });
});

document.querySelector('#btn2').addEventListener('click', () => {
  remote.dialog.showMessageBox(remote.getCurrentWindow(), {
    type: 'info',
    buttons: [],
    message: 'Hello, how are you?'
  });
});

document.querySelector('#chooseFile').addEventListener('change', () => {
  var file = document.querySelector('#chooseFile').files[0];
  console.log(file);
  var reader = new FileReader();
  var data = reader.readAsText(file);
  console.log("lala");
  console.log(data);
});
