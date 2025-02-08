const express = require("express");
const router = express.Router();
const {
    getAllPatients,
    createPatient,
    updatePatient,
    deletePatient,
} = require("../controllers/patientsController");

router.get("/", getAllPatients);  // Получить всех пациентов
router.post("/", createPatient);  // Создать нового пациента
router.put("/:id", updatePatient);  // Обновить пациента
router.delete("/:id", deletePatient);  // Удалить пациента

module.exports = router;
