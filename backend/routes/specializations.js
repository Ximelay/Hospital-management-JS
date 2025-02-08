const express = require("express");
const router = express.Router();
const {
    getAllSpecializations,
    createSpecialization,
    updateSpecialization,
    deleteSpecialization,
} = require("../controllers/specializationsController");

router.get("/", getAllSpecializations);  // Получить все специализации
router.post("/", createSpecialization);  // Создать новую специализацию
router.put("/:id", updateSpecialization);  // Обновить специализацию
router.delete("/:id", deleteSpecialization);  // Удалить специализацию

module.exports = router;
