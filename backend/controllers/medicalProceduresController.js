const MedicalProcedures = require("../models/MedicalProcedures");

// Получение всех медицинских процедур
const getAllMedicalProcedures = async (req, res) => {
    try {
        const procedures = await MedicalProcedures.findAll();
        if (!procedures || procedures.length === 0) {
            return res.status(200).json({ message: "Медицинские процедуры не найдены" });
        }
        res.status(200).json(procedures);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при получении медицинских процедур", error: err });
    }
};

// Создание новой медицинской процедуры
const createMedicalProcedure = async (req, res) => {
    try {
        const { ProcedureName, ProcedureDescription, Patients_idPatient } = req.body;
        const newProcedure = await MedicalProcedures.create({
            ProcedureName, ProcedureDescription, Patients_idPatient
        });
        res.status(201).json(newProcedure);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при создании медицинской процедуры", error: err });
    }
};

// Обновление медицинской процедуры
const updateMedicalProcedure = async (req, res) => {
    try {
        const { id } = req.params;
        const { ProcedureName, ProcedureDescription, Patients_idPatient } = req.body;

        const procedure = await MedicalProcedures.findByPk(id);
        if (!procedure) {
            return res.status(404).json({ message: "Медицинская процедура не найдена" });
        }

        procedure.ProcedureName = ProcedureName;
        procedure.ProcedureDescription = ProcedureDescription;
        procedure.Patients_idPatient = Patients_idPatient;

        await procedure.save();
        res.status(200).json(procedure);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при обновлении медицинской процедуры", error: err });
    }
};

// Удаление медицинской процедуры
const deleteMedicalProcedure = async (req, res) => {
    try {
        const { id } = req.params;
        const procedure = await MedicalProcedures.findByPk(id);
        if (!procedure) {
            return res.status(404).json({ message: "Медицинская процедура не найдена" });
        }

        await procedure.destroy();
        res.status(200).json({ message: "Медицинская процедура удалена" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при удалении медицинской процедуры", error: err });
    }
};

module.exports = {
    getAllMedicalProcedures,
    createMedicalProcedure,
    updateMedicalProcedure,
    deleteMedicalProcedure,
};
