const Doctors  = require("../models/Doctors");

// Получение всех врачей
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctors.findAll();
        res.status(200).json(doctors);
    } catch (err) {
        res.status(500).json({ message: "Ошибка при получении врачей", error: err });
    }
};

// Создание нового врача
const createDoctor = async (req, res) => {
    try {
        const { FirstName, LastName, MiddleName, Specializations_SpecializationID } = req.body;
        const newDoctor = await Doctors.create({
            FirstName, LastName, MiddleName, Specializations_SpecializationID
        });
        res.status(201).json(newDoctor);
    } catch (err) {
        res.status(500).json({ message: "Ошибка при создании врача", error: err });
    }
};

// Обновление информации о враче
const updateDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const { FirstName, LastName, MiddleName, Specializations_SpecializationID } = req.body;

        const doctor = await Doctors.findByPk(id);
        if (!doctor) {
            return res.status(404).json({ message: "Врач не найден" });
        }

        doctor.FirstName = FirstName;
        doctor.LastName = LastName;
        doctor.MiddleName = MiddleName;
        doctor.Specializations_SpecializationID = Specializations_SpecializationID;

        await doctor.save();
        res.status(200).json(doctor);
    } catch (err) {
        res.status(500).json({ message: "Ошибка при обновлении врача", error: err });
    }
};

// Удаление врача
const deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await Doctors.findByPk(id);
        if (!doctor) {
            return res.status(404).json({ message: "Врач не найден" });
        }

        await doctor.destroy();
        res.status(200).json({ message: "Врач удален" });
    } catch (err) {
        res.status(500).json({ message: "Ошибка при удалении врача", error: err });
    }
};

module.exports = {
    getAllDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor,
};
