const Hospitalizations  = require("../models/Hospitalizations");

// Получение всех госпитализаций
const getAllHospitalizations = async (req, res) => {
    try {
        const hospitalizations = await Hospitalizations.findAll();
        if (!hospitalizations || hospitalizations.length === 0) {
            return res.status(200).json({ message: "Госпитализации не найдены" });
        }
        res.status(200).json(hospitalizations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при получении госпитализаций", error: err });
    }
};

// Создание новой госпитализации
const createHospitalization = async (req, res) => {
    try {
        const { PatientId, DateOfHospitalization, ReasonForHospitalization, Description, DischargeDate } = req.body;
        const newHospitalization = await Hospitalizations.create({
            PatientId, DateOfHospitalization, ReasonForHospitalization, Description, DischargeDate
        });
        res.status(201).json(newHospitalization);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при создании госпитализации", error: err });
    }
};

// Обновление госпитализации
const updateHospitalization = async (req, res) => {
    try {
        const { id } = req.params;
        const { PatientId, DateOfHospitalization, ReasonForHospitalization, Description, DischargeDate } = req.body;

        const hospitalization = await Hospitalizations.findByPk(id);
        if (!hospitalization) {
            return res.status(404).json({ message: "Госпитализация не найдена" });
        }

        hospitalization.PatientId = PatientId;
        hospitalization.DateOfHospitalization = DateOfHospitalization;
        hospitalization.ReasonForHospitalization = ReasonForHospitalization;
        hospitalization.Description = Description;
        hospitalization.DischargeDate = DischargeDate;

        await hospitalization.save();
        res.status(200).json(hospitalization);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при обновлении госпитализации", error: err });
    }
};

// Удаление госпитализации
const deleteHospitalization = async (req, res) => {
    try {
        const { id } = req.params;
        const hospitalization = await Hospitalizations.findByPk(id);
        if (!hospitalization) {
            return res.status(404).json({ message: "Госпитализация не найдена" });
        }

        await hospitalization.destroy();
        res.status(200).json({ message: "Госпитализация удалена" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при удалении госпитализации", error: err });
    }
};

module.exports = {
    getAllHospitalizations,
    createHospitalization,
    updateHospitalization,
    deleteHospitalization,
};
