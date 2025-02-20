const express = require("express");
const router = express.Router();
const {
    getAllPatients,
    createPatient,
    updatePatient,
    deletePatient,
    getPatientByMedicalCard,
    generateQRCode, saveOrUpdatePatient
} = require("../controllers/patientsController");

router.get("/", getAllPatients);  // Получить всех пациентов
router.get("/medical-card/:idMedicalCard", getPatientByMedicalCard);
router.get("/qr/:medicalCardNumber", generateQRCode);
router.get("/patients/medical-card/:medicalCardNumber", getPatientByMedicalCard);
router.post("/", createPatient);  // Создать нового пациента
router.post('/save-or-update', saveOrUpdatePatient)
router.put("/:id", updatePatient);  // Обновить пациента
router.delete("/:id", deletePatient);  // Удалить пациента

module.exports = router;
