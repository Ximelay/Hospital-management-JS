const express = require("express");
const router = express.Router();
const {
    getAllMedicalCards,
    createMedicalCard,
    updateMedicalCard,
    deleteMedicalCard,
} = require("../controllers/medicalCardsController");

router.get("/", getAllMedicalCards);  // Получить все медицинские карты
router.post("/", createMedicalCard);  // Создать новую медицинскую карту
router.put("/:id", updateMedicalCard);  // Обновить медицинскую карту
router.delete("/:id", deleteMedicalCard);  // Удалить медицинскую карту

module.exports = router;
