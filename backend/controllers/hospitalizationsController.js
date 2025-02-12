const { Hospitalizations, HospitalizationReasons, Patients } = require("../models");  // Добавляем модель Patients

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
        const { medicalCardNumber, hospitalizationDate, reasonId, conditionDescription } = req.body;

        // Ищем пациента через номер медкарты
        const medicalCard = await MedicalCards.findOne({
            where: { CardNumber: medicalCardNumber },  // Используем номер медкарты
            include: [{ model: Patients, attributes: ["FirstName", "LastName"] }]
        });

        if (!medicalCard) {
            return res.status(400).json({ message: "Пациент с таким номером мед. карты не найден." });
        }

        const hospitalizationReason = await HospitalizationReasons.findByPk(reasonId);
        if (!hospitalizationReason) {
            return res.status(400).json({ message: "Причина госпитализации не найдена." });
        }

        const newHospitalization = await Hospitalizations.create({
            HospitalizationDate: hospitalizationDate,
            ConditionDescription: conditionDescription,
            Patients_idPatient: medicalCard.Patients_idPatient,  // Используем PatientId из медицинской карты
            HospitalizationReasons_idHospitalizationReasons: hospitalizationReason.idHospitalizationReasons
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
