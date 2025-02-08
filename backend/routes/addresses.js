const express = require("express");
const router = express.Router();
const {
    getAllAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
} = require("../controllers/addressesController");

router.get("/", getAllAddresses);  // Получить все адреса
router.post("/", createAddress);  // Создать новый адрес
router.put("/:id", updateAddress);  // Обновить адрес
router.delete("/:id", deleteAddress);  // Удалить адрес

module.exports = router;
