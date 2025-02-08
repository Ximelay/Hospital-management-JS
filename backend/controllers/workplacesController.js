const  Workplaces  = require("../models/Workplaces");

// Получение всех рабочих мест
const getAllWorkplaces = async (req, res) => {
    try {
        const workplaces = await Workplaces.findAll();
        if (!workplaces || workplaces.length === 0) {
            return res.status(200).json({ message: "Рабочие места не найдены" });
        }
        res.status(200).json(workplaces);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при получении рабочих мест", error: err });
    }
};

// Создание нового рабочего места
const createWorkplace = async (req, res) => {
    try {
        const { WorkplaceName } = req.body;
        const newWorkplace = await Workplaces.create({ WorkplaceName });
        res.status(201).json(newWorkplace);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при создании рабочего места", error: err });
    }
};

// Обновление рабочего места
const updateWorkplace = async (req, res) => {
    try {
        const { id } = req.params;
        const { WorkplaceName } = req.body;

        const workplace = await Workplaces.findByPk(id);
        if (!workplace) {
            return res.status(404).json({ message: "Рабочее место не найдено" });
        }

        workplace.WorkplaceName = WorkplaceName;
        await workplace.save();
        res.status(200).json(workplace);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при обновлении рабочего места", error: err });
    }
};

// Удаление рабочего места
const deleteWorkplace = async (req, res) => {
    try {
        const { id } = req.params;
        const workplace = await Workplaces.findByPk(id);
        if (!workplace) {
            return res.status(404).json({ message: "Рабочее место не найдено" });
        }

        await workplace.destroy();
        res.status(200).json({ message: "Рабочее место удалено" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при удалении рабочего места", error: err });
    }
};

module.exports = {
    getAllWorkplaces,
    createWorkplace,
    updateWorkplace,
    deleteWorkplace,
};
