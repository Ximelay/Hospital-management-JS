const { Hospitalizations, Patients  , HospitalizationReasons, MedicalCards } = require("../models");  // Добавляем модель Patients

// Получение всех госпитализаций
const getAllHospitalizations = async (req, res) => {
    try {
        const hospitalizations = await Hospitalizations.findAll({
            include: [
                {
                    model: Patients,
                    attributes: ['FirstName', 'LastName', 'MiddleName'],
                    include: [{  // Включаем MedicalCards через Patients
                        model: MedicalCards,
                        attributes: ['CardNumber']  // Только номер карты
                    }]
                },
                {
                    model: HospitalizationReasons,
                    attributes: ['ReasonName'],
                },
            ],
        });

        // Логируем полученные данные
        console.log("Загруженные госпитализации:", hospitalizations);

        if (!hospitalizations || hospitalizations.length === 0) {
            return res.status(200).json({ message: "Госпитализации не найдены" });
        }
        res.status(200).json(hospitalizations);
    } catch (err) {
        console.error("Ошибка при получении госпитализаций:", err);
        res.status(500).json({ message: "Ошибка при получении госпитализаций", error: err });
    }
};

// Создание новой госпитализации
const createHospitalization = async (req, res) => {
    try {
        const { patientId, medicalCardNumber, hospitalizationDate, conditionDescription, hospitalizationReasonId } = req.body;

        // Проверка на обязательные поля
        if (!patientId || !medicalCardNumber || !hospitalizationDate || !conditionDescription || !hospitalizationReasonId) {
            return res.status(400).json({ message: "Все поля обязательны для заполнения." });
        }

        // Создаем запись о госпитализации
        const newHospitalization = await Hospitalizations.create({
            Patients_idPatient: patientId,  // Здесь должен быть корректный patientId
            MedicalCardNumber: medicalCardNumber,
            HospitalizationDate: hospitalizationDate,
            ConditionDescription: conditionDescription,
            HospitalizationReasons_idHospitalizationReasons: hospitalizationReasonId  // Добавляем причину госпитализации
        });

        res.status(201).json(newHospitalization);
    } catch (err) {
        console.error('Ошибка при создании госпитализации:', err);
        res.status(500).json({ message: "Ошибка при добавлении госпитализации", error: err });
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
