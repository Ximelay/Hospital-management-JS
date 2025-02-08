const AddressesTypes = require("../models/AddressesTypes");

// Получение всех типов адресов
const getAllAddressesTypes = async (req, res) => {
    try {
        const addressesTypes = await AddressesTypes.findAll();
        if (!addressesTypes || addressesTypes.length === 0) {
            return res.status(200).json({ message: "Типы адресов не найдены" });
        }
        res.status(200).json(addressesTypes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при получении типов адресов", error: err });
    }
};

// Создание нового типа адреса
const createAddressesType = async (req, res) => {
    try {
        const { TypeName } = req.body;
        const newAddressesType = await AddressesTypes.create({ TypeName });
        res.status(201).json(newAddressesType);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при создании типа адреса", error: err });
    }
};

// Обновление типа адреса
const updateAddressesType = async (req, res) => {
    try {
        const { id } = req.params;
        const { TypeName } = req.body;

        const addressesType = await AddressesTypes.findByPk(id);
        if (!addressesType) {
            return res.status(404).json({ message: "Тип адреса не найден" });
        }

        addressesType.TypeName = TypeName;
        await addressesType.save();
        res.status(200).json(addressesType);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при обновлении типа адреса", error: err });
    }
};

// Удаление типа адреса
const deleteAddressesType = async (req, res) => {
    try {
        const { id } = req.params;
        const addressesType = await AddressesTypes.findByPk(id);
        if (!addressesType) {
            return res.status(404).json({ message: "Тип адреса не найден" });
        }

        await addressesType.destroy();
        res.status(200).json({ message: "Тип адреса удален" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при удалении типа адреса", error: err });
    }
};

module.exports = {
    getAllAddressesTypes,
    createAddressesType,
    updateAddressesType,
    deleteAddressesType,
};
