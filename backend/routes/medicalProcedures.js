const express = require("express");
const router = express.Router();
const {
    getAllMedicalProcedures,
    createMedicalProcedure,
    updateMedicalProcedure,
    deleteMedicalProcedure,
} = require("../controllers/medicalProceduresController");

router.get("/", getAllMedicalProcedures);  // Получить все медицинские процедуры
router.post("/", createMedicalProcedure);  // Создать новую медицинскую процедуру
router.put("/:id", updateMedicalProcedure);  // Обновить медицинскую процедуру
router.delete("/:id", deleteMedicalProcedure);  // Удалить медицинскую процедуру

module.exports = router;
