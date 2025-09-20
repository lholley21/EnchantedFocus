const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

// Store multiple windows in a Map
let windows = new Map();

function createWindow(pageName, width, height) {
  // Create a new window instance
  const newWindow = new BrowserWindow({
    width,
    height,
    frame: false, // native OS frame
    resizable: false, // optional
    backgroundColor: "#2b1a2f", // match your cozy witch background
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  newWindow.loadFile(path.join(__dirname, "pages", `${pageName}.html`));

  // Show window when ready to prevent visual flash
  newWindow.once("ready-to-show", () => {
    newWindow.show();
  });

  // Store the window reference
  windows.set(newWindow.id, newWindow);

  // Remove from map when window closes
  newWindow.on("closed", () => {
    windows.delete(newWindow.id);
  });

  return newWindow;
}

// close/minimize buttons
ipcMain.on("window-control", (event, action) => {
  // Get the window that sent the event
  const senderWindow = BrowserWindow.fromWebContents(event.sender);
  if (!senderWindow) return;
  
  if (action === "close") senderWindow.close();
  if (action === "minimize") senderWindow.minimize();
});
ipcMain.on("open-page", (event, pageName) => {
  try {
    switch (pageName) {
      case "index":
        createWindow("index", 400, 600);
        break;
      case "mainpage":
        createWindow("mainpage", 600, 700);
        break;
      case "goals":
        createWindow("goals", 800, 800);
        break;
      default:
        console.error("Unknown page:", pageName);
        // Send error back to renderer if needed
        event.reply("page-error", `Unknown page: ${pageName}`);
        return;
    }
    console.log(`Successfully opened page: ${pageName}`);
  } catch (error) {
    console.error("Error opening page:", error);
    event.reply("page-error", error.message);
  }
});

ipcMain.on("open-page-and-close", (event, pageName) => {
  try {
    // Get the window that sent the event
    const senderWindow = BrowserWindow.fromWebContents(event.sender);
    
    // Create the new window first
    switch (pageName) {
      case "index":
        createWindow("index", 400, 600);
        break;
      case "mainpage":
        createWindow("mainpage", 600, 700);
        break;
      case "goals":
        createWindow("goals", 800, 800);
        break;
      default:
        console.error("Unknown page:", pageName);
        event.reply("page-error", `Unknown page: ${pageName}`);
        return;
    }
    
    // Close the current window after creating the new one
    if (senderWindow) {
      senderWindow.close();
    }
    
    console.log(`Successfully opened page: ${pageName} and closed previous window`);
  } catch (error) {
    console.error("Error opening page and closing current:", error);
    event.reply("page-error", error.message);
  }
});

app.whenReady().then(() => {
  createWindow("index", 400, 600);
});

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// On macOS, re-create window when dock icon is clicked
app.on('activate', () => {
  if (windows.size === 0) {
    createWindow('index', 400, 600);
  }
});
