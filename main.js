const { app, BrowserWindow } = require('electron')
const path = require('path'); // Importing the path module

const createWindow = () => {
  app.setAppUserModelId("Multi Timer"); // 
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    alwaysOnTop: true, 
    autoHideMenuBar: true, // Hides the menu bar
    minWidth: 300, // Set minimum width
    minHeight: 200, // Set minimum width
    packagerConfig: {
      icon:  path.join(__dirname, 'dist', 'multi-countdown-app', 'assets', 'icon.ico'),
      extraResource: [
        path.join(__dirname, 'dist', 'multi-countdown-app', 'assets', 'icon.ico'), // Add the ICNS file as an extra resource
      ]}
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
