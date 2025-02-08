const express = require("express");
const router = express.Router();
const {
    getAllDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor,
} = require("../controllers/doctorsController");

router.get("/", getAllDoctors);  // Получить всех врачей
router.post("/", createDoctor);  // Создать нового врача
router.put("/:id", updateDoctor);  // Обновить врача
router.delete("/:id", deleteDoctor);  // Удалить врача

module.exports = router;
