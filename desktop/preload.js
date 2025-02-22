const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    getHospitalizations: () => ipcRenderer.invoke('get-hospitalizations'),
    getPatientsForHospitalization: () => ipcRenderer.invoke('get-patients-for-hospitalization'),
    getHospitalizationReasons: () => ipcRenderer.invoke('get-hospitalization-reasons'),  // Новый метод
    addHospitalization: (data) => ipcRenderer.invoke('add-hospitalization', data),
    updateHospitalization: (id, newConditionDescription) => ipcRenderer.invoke('update-hospitalization', { id, newConditionDescription }),
    dischargePatient: (id, dischargeReason) => ipcRenderer.invoke('discharge-patient', { id, dischargeReason }),
});
