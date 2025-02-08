const Specializations  = require("../models/Specializations");

// Получение всех специализаций
const getAllSpecializations = async (req, res) => {
    try {
        const specializations = await Specializations.findAll();
        if (!specializations || specializations.length === 0) {
            return res.status(200).json({ message: "Специализации не найдены" });
        }
        res.status(200).json(specializations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при получении специализаций", error: err });
    }
};

// Создание новой специализации
const createSpecialization = async (req, res) => {
    try {
        const { Specialization } = req.body;
        const newSpecialization = await Specializations.create({ Specialization });
        res.status(201).json(newSpecialization);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при создании специализации", error: err });
    }
};

// Обновление специализации
const updateSpecialization = async (req, res) => {
    try {
        const { id } = req.params;
        const { Specialization } = req.body;

        const specialization = await Specializations.findByPk(id);
        if (!specialization) {
            return res.status(404).json({ message: "Специализация не найдена" });
        }

        specialization.Specialization = Specialization;
        await specialization.save();
        res.status(200).json(specialization);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при обновлении специализации", error: err });
    }
};

// Удаление специализации
const deleteSpecialization = async (req, res) => {
    try {
        const { id } = req.params;
        const specialization = await Specializations.findByPk(id);
        if (!specialization) {
            return res.status(404).json({ message: "Специализация не найдена" });
        }

        await specialization.destroy();
        res.status(200).json({ message: "Специализация удалена" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при удалении специализации", error: err });
    }
};

module.exports = {
    getAllSpecializations,
    createSpecialization,
    updateSpecialization,
    deleteSpecialization,
};
