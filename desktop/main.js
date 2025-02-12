const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const axios = require("axios");

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    mainWindow.loadFile("renderer/index.html");
});

ipcMain.handle("get-hospitalizations", async () => {
    const response = await axios.get("http://localhost:3000/api/hospitalizations");
    return response.data;
});

ipcMain.handle("add-hospitalization", async (event, data) => {
    const response = await axios.post("http://localhost:3000/api/hospitalizations", data);
    return response.data;
});

ipcMain.handle("discharge-patient", async (event, id) => {
    await axios.delete(`http://localhost:3000/api/hospitalizations/${id}`);
    return { success: true };
});
