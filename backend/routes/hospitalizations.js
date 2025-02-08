const express = require("express");
const router = express.Router();
const {
    getAllHospitalizations,
    createHospitalization,
    updateHospitalization,
    deleteHospitalization,
} = require("../controllers/hospitalizationsController");

router.get("/", getAllHospitalizations);  // Получить все госпитализации
router.post("/", createHospitalization);  // Создать новую госпитализацию
router.put("/:id", updateHospitalization);  // Обновить госпитализацию
router.delete("/:id", deleteHospitalization);  // Удалить госпитализацию

module.exports = router;
