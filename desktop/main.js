const { app, BrowserWindow, ipcMain } = require('electron');
const axios = require('axios');
const path = require("path");


function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),  // Абсолютный путь к preload.js
        }
    });

    // Используем абсолютный путь для загрузки index.html
    win.loadFile(path.join(__dirname, 'renderer', 'index.html'));
    win.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    });
});

// Получение госпитализаций
ipcMain.handle('get-hospitalizations', async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/hospitalizations');
        console.log("Данные о госпитализациях, полученные с сервера:", response.data); // Логируем ответ с сервера
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении госпитализаций: ', error);
        return []
    }
});

ipcMain.handle('get-patients-for-hospitalization', async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/patients/patients-for-hospitalisation')
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении пациентов для госпитализации:", error);
        return []
    }
})

// Получение причин госпитализации
ipcMain.handle('get-hospitalization-reasons', async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/hospitalizationreasons');
        console.log("Данные о причинах госпитализации, полученные с сервера:", response.data); // Логируем ответ с сервера
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении причин госпитализации: ', error);
        return [];
    }
});

// Добавление госпитализаций
ipcMain.handle('add-hospitalization', async (event, hospitalizationData) => {
    try {
        const response = await axios.post('http://localhost:3000/api/hospitalizations', hospitalizationData)
        return response.data
    } catch (error) {
        console.error('Ошибка при добавлении госпитализации: ', error)
        return null
    }
})

// Обновление состояния госпитализации
ipcMain.handle('update-hospitalization', async (event, { id, newConditionDescription }) => {
    try {
        const response = await axios.put(`http://localhost:3000/api/hospitalizations/${id}`, { conditionDescription: newConditionDescription })
        return response.data
    } catch (error) {
        console.error('Ошибка при обновлении госпитализации:', error);
        return null
    }
})

// Выписка пациента
ipcMain.handle('discharge-patient', async (event, { id, dischargeReason }) => {
    try {
        const response = await axios.put(`http://localhost:3000/api/hospitalizations/${id}/discharge`, { dischargeReason })
        return response.data
    } catch (error) {
        console.error('Ошибка при выписке пациента: ', error)
        return null;
    }
})

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
})