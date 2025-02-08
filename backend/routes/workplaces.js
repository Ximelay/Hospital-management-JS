const express = require("express");
const router = express.Router();
const {
    getAllWorkplaces,
    createWorkplace,
    updateWorkplace,
    deleteWorkplace,
} = require("../controllers/workplacesController");

router.get("/", getAllWorkplaces);  // Получить все рабочие места
router.post("/", createWorkplace);  // Создать новое рабочее место
router.put("/:id", updateWorkplace);  // Обновить рабочее место
router.delete("/:id", deleteWorkplace);  // Удалить рабочее место

module.exports = router;
