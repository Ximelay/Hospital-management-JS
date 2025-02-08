const express = require("express");
const router = express.Router();
const {
    getAllMedicalHistory,
    createMedicalHistory,
    updateMedicalHistory,
    deleteMedicalHistory,
} = require("../controllers/medicalHistoryController");

router.get("/", getAllMedicalHistory);  // Получить всю медицинскую историю
router.post("/", createMedicalHistory);  // Создать запись медицинской истории
router.put("/:id", updateMedicalHistory);  // Обновить запись медицинской истории
router.delete("/:id", deleteMedicalHistory);  // Удалить запись медицинской истории

module.exports = router;
