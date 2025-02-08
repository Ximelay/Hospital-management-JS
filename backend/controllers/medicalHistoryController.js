const MedicalHistory = require("../models/MedicalHistory");

// Получение всей медицинской истории
const getAllMedicalHistory = async (req, res) => {
    try {
        const history = await MedicalHistory.findAll();
        if (!history || history.length === 0) {
            return res.status(200).json({ message: "Медицинская история не найдена" });
        }
        res.status(200).json(history);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при получении медицинской истории", error: err });
    }
};

// Создание новой записи медицинской истории
const createMedicalHistory = async (req, res) => {
    try {
        const { Diagnosis, TreatmentPlan, Patients_idPatient } = req.body;
        const newHistory = await MedicalHistory.create({
            Diagnosis, TreatmentPlan, Patients_idPatient
        });
        res.status(201).json(newHistory);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при создании медицинской истории", error: err });
    }
};

// Обновление записи медицинской истории
const updateMedicalHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const { Diagnosis, TreatmentPlan, Patients_idPatient } = req.body;

        const history = await MedicalHistory.findByPk(id);
        if (!history) {
            return res.status(404).json({ message: "Медицинская история не найдена" });
        }

        history.Diagnosis = Diagnosis;
        history.TreatmentPlan = TreatmentPlan;
        history.Patients_idPatient = Patients_idPatient;

        await history.save();
        res.status(200).json(history);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при обновлении медицинской истории", error: err });
    }
};

// Удаление записи медицинской истории
const deleteMedicalHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const history = await MedicalHistory.findByPk(id);
        if (!history) {
            return res.status(404).json({ message: "Медицинская история не найдена" });
        }

        await history.destroy();
        res.status(200).json({ message: "Медицинская история удалена" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при удалении медицинской истории", error: err });
    }
};

module.exports = {
    getAllMedicalHistory,
    createMedicalHistory,
    updateMedicalHistory,
    deleteMedicalHistory,
};
