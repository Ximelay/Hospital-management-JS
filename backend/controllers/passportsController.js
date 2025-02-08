const Passports = require("../models/Passport");

// Получение всех паспортов
const getAllPassports = async (req, res) => {
    try {
        const passports = await Passports.findAll();
        if (!passports || passports.length === 0) {
            return res.status(200).json({ message: "Паспорта не найдены" });
        }
        res.status(200).json(passports);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при получении паспортов", error: err });
    }
};

// Создание нового паспорта
const createPassport = async (req, res) => {
    try {
        const { SeriesNumber, IssueDate, Patients_PatientID } = req.body;
        const newPassport = await Passports.create({
            SeriesNumber, IssueDate, Patients_PatientID
        });
        res.status(201).json(newPassport);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при создании паспорта", error: err });
    }
};

// Обновление паспорта
const updatePassport = async (req, res) => {
    try {
        const { id } = req.params;
        const { SeriesNumber, IssueDate, Patients_PatientID } = req.body;

        const passport = await Passports.findByPk(id);
        if (!passport) {
            return res.status(404).json({ message: "Паспорт не найден" });
        }

        passport.SeriesNumber = SeriesNumber;
        passport.IssueDate = IssueDate;
        passport.Patients_PatientID = Patients_PatientID;

        await passport.save();
        res.status(200).json(passport);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при обновлении паспорта", error: err });
    }
};

// Удаление паспорта
const deletePassport = async (req, res) => {
    try {
        const { id } = req.params;
        const passport = await Passports.findByPk(id);
        if (!passport) {
            return res.status(404).json({ message: "Паспорт не найден" });
        }

        await passport.destroy();
        res.status(200).json({ message: "Паспорт удален" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при удалении паспорта", error: err });
    }
};

module.exports = {
    getAllPassports,
    createPassport,
    updatePassport,
    deletePassport,
};
