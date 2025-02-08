const HospitalizationReasons = require("../models/HospitalizationReasons");

// Получение всех причин госпитализации
const getAllHospitalizationReasons = async (req, res) => {
    try {
        const reasons = await HospitalizationReasons.findAll();
        if (!reasons || reasons.length === 0) {
            return res.status(200).json({ message: "Причины госпитализации не найдены" });
        }
        res.status(200).json(reasons);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при получении причин госпитализации", error: err });
    }
};

// Создание новой причины госпитализации
const createHospitalizationReason = async (req, res) => {
    try {
        const { ReasonName } = req.body;
        const newReason = await HospitalizationReasons.create({ ReasonName });
        res.status(201).json(newReason);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при создании причины госпитализации", error: err });
    }
};

// Обновление причины госпитализации
const updateHospitalizationReason = async (req, res) => {
    try {
        const { id } = req.params;
        const { ReasonName } = req.body;

        const reason = await HospitalizationReasons.findByPk(id);
        if (!reason) {
            return res.status(404).json({ message: "Причина госпитализации не найдена" });
        }

        reason.ReasonName = ReasonName;
        await reason.save();
        res.status(200).json(reason);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при обновлении причины госпитализации", error: err });
    }
};

// Удаление причины госпитализации
const deleteHospitalizationReason = async (req, res) => {
    try {
        const { id } = req.params;
        const reason = await HospitalizationReasons.findByPk(id);
        if (!reason) {
            return res.status(404).json({ message: "Причина госпитализации не найдена" });
        }

        await reason.destroy();
        res.status(200).json({ message: "Причина госпитализации удалена" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при удалении причины госпитализации", error: err });
    }
};

module.exports = {
    getAllHospitalizationReasons,
    createHospitalizationReason,
    updateHospitalizationReason,
    deleteHospitalizationReason,
};
