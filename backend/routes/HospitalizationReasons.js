const express = require("express");
const router = express.Router();
const {
    getAllHospitalizationReasons,
    createHospitalizationReason,
    updateHospitalizationReason,
    deleteHospitalizationReason,
} = require("../controllers/hospitalizationReasonsController");

router.get("/", getAllHospitalizationReasons);  // Получить все причины госпитализации
router.post("/", createHospitalizationReason);  // Создать новую причину госпитализации
router.put("/:id", updateHospitalizationReason);  // Обновить причину госпитализации
router.delete("/:id", deleteHospitalizationReason);  // Удалить причину госпитализации

module.exports = router;
