const Diagnoses = require("../models/Diagnoses");

// Получение всех диагнозов
const getAllDiagnoses = async (req, res) => {
    try {
        const diagnoses = await Diagnoses.findAll();
        if (!diagnoses || diagnoses.length === 0) {
            return res.status(200).json({ message: "Диагнозы не найдены" });
        }
        res.status(200).json(diagnoses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при получении диагнозов", error: err });
    }
};

// Создание нового диагноза
const createDiagnosis = async (req, res) => {
    try {
        const { DiagnosisName } = req.body;
        const newDiagnosis = await Diagnoses.create({ DiagnosisName });
        res.status(201).json(newDiagnosis);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при создании диагноза", error: err });
    }
};

// Обновление диагноза
const updateDiagnosis = async (req, res) => {
    try {
        const { id } = req.params;
        const { DiagnosisName } = req.body;

        const diagnosis = await Diagnoses.findByPk(id);
        if (!diagnosis) {
            return res.status(404).json({ message: "Диагноз не найден" });
        }

        diagnosis.DiagnosisName = DiagnosisName;
        await diagnosis.save();
        res.status(200).json(diagnosis);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при обновлении диагноза", error: err });
    }
};

// Удаление диагноза
const deleteDiagnosis = async (req, res) => {
    try {
        const { id } = req.params;
        const diagnosis = await Diagnoses.findByPk(id);
        if (!diagnosis) {
            return res.status(404).json({ message: "Диагноз не найден" });
        }

        await diagnosis.destroy();
        res.status(200).json({ message: "Диагноз удален" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при удалении диагноза", error: err });
    }
};

module.exports = {
    getAllDiagnoses,
    createDiagnosis,
    updateDiagnosis,
    deleteDiagnosis,
};
