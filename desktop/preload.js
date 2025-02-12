const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    getHospitalizations: () => ipcRenderer.invoke("get-hospitalizations"),
    addHospitalization: (data) => ipcRenderer.invoke("add-hospitalization", data),
    dischargePatient: (id) => ipcRenderer.invoke("discharge-patient", id),
});
