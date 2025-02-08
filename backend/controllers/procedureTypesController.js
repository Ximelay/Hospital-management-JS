const ProcedureTypes = require("../models/ProcedureTypes");

// Получение всех типов процедур
const getAllProcedureTypes = async (req, res) => {
    try {
        const types = await ProcedureTypes.findAll();
        if (!types || types.length === 0) {
            return res.status(200).json({ message: "Типы процедур не найдены" });
        }
        res.status(200).json(types);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при получении типов процедур", error: err });
    }
};

// Создание нового типа процедуры
const createProcedureType = async (req, res) => {
    try {
        const { TypeName } = req.body;
        const newType = await ProcedureTypes.create({ TypeName });
        res.status(201).json(newType);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при создании типа процедуры", error: err });
    }
};

// Обновление типа процедуры
const updateProcedureType = async (req, res) => {
    try {
        const { id } = req.params;
        const { TypeName } = req.body;

        const type = await ProcedureTypes.findByPk(id);
        if (!type) {
            return res.status(404).json({ message: "Тип процедуры не найден" });
        }

        type.TypeName = TypeName;
        await type.save();
        res.status(200).json(type);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при обновлении типа процедуры", error: err });
    }
};

// Удаление типа процедуры
const deleteProcedureType = async (req, res) => {
    try {
        const { id } = req.params;
        const type = await ProcedureTypes.findByPk(id);
        if (!type) {
            return res.status(404).json({ message: "Тип процедуры не найден" });
        }

        await type.destroy();
        res.status(200).json({ message: "Тип процедуры удален" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при удалении типа процедуры", error: err });
    }
};

module.exports = {
    getAllProcedureTypes,
    createProcedureType,
    updateProcedureType,
    deleteProcedureType,
};
