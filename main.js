const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  app.setAppUserModelId("Multi Timer"); // ✅ Fix "Electron App" issue
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    alwaysOnTop: true, 
    autoHideMenuBar: true, // Hides the menu bar
    minWidth: 300, // Set minimum width
    minHeight: 200, // Set minimum width
  })

  win.loadFile('dist/multi-countdown-app/index.html');

}

app.whenReady().then(() => {
  createWindow();
  popupWindow.focus();

  if(Notification.permission !== "granted"){
    Notification.requestPermission();
  }
  showNotification();
});
