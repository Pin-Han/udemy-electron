// Modules
const { app, BrowserWindow } = require("electron");
// const windowStateKeeper = require("electron-window-state");

setTimeout(() => {
  console.log("Checking ready: " + app.isReady());
}, 2000);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Create a new BrowserWindow when `app` is ready
function createWindow() {
  // window state manager

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    x: 100,
    y: 100,
    minWidth: 300,
    minHeight: 150,
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

  // secondaryWindow = new BrowserWindow({
  //   width: 700,
  //   height: 800,
  //   webPreferences: {
  //     // --- !! IMPORTANT !! ---
  //     // Disable 'contextIsolation' to allow 'nodeIntegration'
  //     // 'contextIsolation' defaults to "true" as from Electron v12
  //     contextIsolation: false,
  //     nodeIntegration: true,
  //   },
  // });
  // Load index.html into the new BrowserWindow
  // mainWindow.loadFile("index.html");
  mainWindow.loadURL("https://httpbin.org/basic-auth/user/passwd");

  // secondaryWindow.loadFile("index.html");

  // Open DevTools - Remove for PRODUCTION!
  // mainWindow.webContents.openDevTools();

  // secondaryWindow.once("ready-to-show", secondaryWindow.show);

  let wc = mainWindow.webContents;
  console.log(wc);

  wc.on("login", (e, request, authInfo, callback) => {
    console.log("Logged in:");
    callback("user", "passwd");
  });
  wc.on("did-navigate", (e, url, statusCode, message) => {
    console.log(`navigated to ${url}`);
    console.log(statusCode);
  });
  // wc.on("before-input-event", (e, input) => {
  //   console.log(input.key, input.type);
  // });
  // wc.on("new-window", (e, url) => {
  //   e.preventDefault()
  //   console.log(`open new window ${url}`);
  // });
  // wc.on("did-finish-load", () => {
  //   console.log("Content fully loaded");
  // });
  // wc.on("dom-ready", () => {
  //   console.log("Dom Load");
  // });
  // Listen for window being closed
  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  mainWindow.on("focus", () => {
    console.log("Main win focused");
  });

  // secondaryWindow.on("closed", () => {
  //   mainWindow.maximize();
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
