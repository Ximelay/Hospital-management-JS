const express = require("express");
const router = express.Router();
const {
    getAllAddressesTypes,
    createAddressesType,
    updateAddressesType,
    deleteAddressesType,
} = require("../controllers/addressesTypesController");

router.get("/", getAllAddressesTypes);  // Получить все типы адресов
router.post("/", createAddressesType);  // Создать новый тип адреса
router.put("/:id", updateAddressesType);  // Обновить тип адреса
router.delete("/:id", deleteAddressesType);  // Удалить тип адреса

module.exports = router;
