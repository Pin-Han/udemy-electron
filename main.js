// Modules
const { app, BrowserWindow } = require("electron");

setTimeout(() => {
  console.log("Checking ready: " + app.isReady());
}, 2000);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      // --- !! IMPORTANT !! ---
      // Disable 'contextIsolation' to allow 'nodeIntegration'
      // 'contextIsolation' defaults to "true" as from Electron v12
      contextIsolation: false,
      nodeIntegration: true,
    },
    titleBarStyle: "hidden",
    // show: false,
    backgroundColor: "#24ceb9",
    frame: false,
  });

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile("index.html");

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools();

  // secondaryWindow.once("ready-to-show", secondaryWindow.show);

  // Listen for window being closed
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  // secondaryWindow.on("closed", () => {
  //   secondaryWindow = null;
  // });
}

app.on("browser-window-blur", (e) => {
  console.log("App unfocus");
  // setTimeout(() => {
  //   app.quit();
  // }, 3000);
});

// app.on("browser-window-focus", (e) => {
//   console.log("App focused");
// });

app.on("before-quit", (e) => {
  console.log("Preventing app from quitting");
  e.preventDefault();
});

// Electron `app` is ready
app.on("ready", () => {
  console.log(app.getPath("desktop"));
  console.log(app.getPath("music"));
  console.log(app.getPath("temp"));
  console.log(app.getPath("userData"));
  console.log("App is ready");
  createWindow();
});

// Quit when all windows are closed - (Not macOS - Darwin)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
