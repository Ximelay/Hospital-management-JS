const express = require("express");
const router = express.Router();
const {
    getAllDiagnoses,
    createDiagnosis,
    updateDiagnosis,
    deleteDiagnosis,
} = require("../controllers/diagnosesController");

router.get("/", getAllDiagnoses);  // Получить все диагнозы
router.post("/", createDiagnosis);  // Создать новый диагноз
router.put("/:id", updateDiagnosis);  // Обновить диагноз
router.delete("/:id", deleteDiagnosis);  // Удалить диагноз

module.exports = router;
