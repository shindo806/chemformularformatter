const electron = require('electron');

const {
  app,
  BrowserWindow
} = require('electron');

// Print to PDF
const path = require('path');
const fs = require('fs');
const os = require('os');
const ipc = electron.ipcMain;
const shell = electron.shell;


// Menu.setApplicationMenu(null)
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
    show: false,
    width: 1920,
    height: 1080,
    fullscreenWindowTitle: true,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.once('ready-to-show', () => {
    win.show()
  })
  // win.removeMenu();
  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/index.html`);
  // Close the developer tools
  // win.webContents.on("devtools-opened", () => {
  //   win.webContents.closeDevTools();
  // });
  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// // Open print page
ipc.on('print-to-pdf', function (event) {
  // const win = BrowserWindow.fromWebContents(event.sender);
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false
  });
  win.loadURL(`file://${__dirname}/print.html`);
  win.webContents.on('did-finish-load', () => {
    let filename = win.getTitle();
    const pdfPath = path.join(os.tmpdir(), `${filename}.pdf`);
    win.webContents.printToPDF({}, function (error, data) {
      if (error) return console.log(error.message);

      fs.writeFile(pdfPath, data, function (error) {
        if (error) return console.log(error.message);
        shell.openExternal(pdfPath);
        // Đóng cửa sổ trang in sau khi xuất file pdf
        win.close();
      })
    })
  })
})