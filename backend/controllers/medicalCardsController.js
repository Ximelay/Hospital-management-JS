const MedicalCards = require("../models/MedicalCards");

// Получение всех медицинских карт
const getAllMedicalCards = async (req, res) => {
    try {
        const cards = await MedicalCards.findAll();
        if (!cards || cards.length === 0) {
            return res.status(200).json({ message: "Медицинские карты не найдены" });
        }
        res.status(200).json(cards);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при получении медицинских карт", error: err });
    }
};

// Создание новой медицинской карты
const createMedicalCard = async (req, res) => {
    try {
        const { CardNumber, IssueDate, Patients_idPatient } = req.body;
        const newCard = await MedicalCards.create({
            CardNumber, IssueDate, Patients_idPatient
        });
        res.status(201).json(newCard);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при создании медицинской карты", error: err });
    }
};

// Обновление медицинской карты
const updateMedicalCard = async (req, res) => {
    try {
        const { id } = req.params;
        const { CardNumber, IssueDate, Patients_idPatient } = req.body;

        const card = await MedicalCards.findByPk(id);
        if (!card) {
            return res.status(404).json({ message: "Медицинская карта не найдена" });
        }

        card.CardNumber = CardNumber;
        card.IssueDate = IssueDate;
        card.Patients_idPatient = Patients_idPatient;

        await card.save();
        res.status(200).json(card);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при обновлении медицинской карты", error: err });
    }
};

// Удаление медицинской карты
const deleteMedicalCard = async (req, res) => {
    try {
        const { id } = req.params;
        const card = await MedicalCards.findByPk(id);
        if (!card) {
            return res.status(404).json({ message: "Медицинская карта не найдена" });
        }

        await card.destroy();
        res.status(200).json({ message: "Медицинская карта удалена" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при удалении медицинской карты", error: err });
    }
};

module.exports = {
    getAllMedicalCards,
    createMedicalCard,
    updateMedicalCard,
    deleteMedicalCard,
};
