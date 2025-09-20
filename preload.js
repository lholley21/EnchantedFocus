const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  windowControl: (action) => ipcRenderer.send("window-control", action),
  openPage: (pageName) => ipcRenderer.send("open-page", pageName),
  openPageAndClose: (pageName) => ipcRenderer.send("open-page-and-close", pageName),
  onPageError: (callback) => ipcRenderer.on("page-error", callback),
});
