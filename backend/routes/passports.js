const express = require("express");
const router = express.Router();
const {
    getAllPassports,
    createPassport,
    updatePassport,
    deletePassport,
} = require("../controllers/passportsController");

router.get("/", getAllPassports);  // Получить все паспорта
router.post("/", createPassport);  // Создать новый паспорт
router.put("/:id", updatePassport);  // Обновить паспорт
router.delete("/:id", deletePassport);  // Удалить паспорт

module.exports = router;
