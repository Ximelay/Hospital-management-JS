const express = require("express");
const router = express.Router();
const {
    getAllProcedureTypes,
    createProcedureType,
    updateProcedureType,
    deleteProcedureType,
} = require("../controllers/procedureTypesController");

router.get("/", getAllProcedureTypes);  // Получить все типы процедур
router.post("/", createProcedureType);  // Создать новый тип процедуры
router.put("/:id", updateProcedureType);  // Обновить тип процедуры
router.delete("/:id", deleteProcedureType);  // Удалить тип процедуры

module.exports = router;
