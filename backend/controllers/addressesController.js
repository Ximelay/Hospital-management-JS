const { Addresses }  = require("../models");

// Получение всех адресов
const getAllAddresses = async (req, res) => {
    try {
        const addresses = await Addresses.findAll();
        if (!addresses || addresses.length === 0) {
            return res.status(200).json({ message: "Адреса не найдены" });
        }
        res.status(200).json(addresses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при получении адресов", error: err });
    }
};

// Создание нового адреса
const createAddress = async (req, res) => {
    try {
        const { FullAddress, Patients_PatientID, AddressesTypes_idAddressType } = req.body;
        const newAddress = await Addresses.create({
            FullAddress, Patients_PatientID, AddressesTypes_idAddressType
        });
        res.status(201).json(newAddress);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при создании адреса", error: err });
    }
};

// Обновление адреса
const updateAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const { FullAddress, Patients_PatientID, AddressesTypes_idAddressType } = req.body;

        const address = await Addresses.findByPk(id);
        if (!address) {
            return res.status(404).json({ message: "Адрес не найден" });
        }

        address.FullAddress = FullAddress;
        address.Patients_PatientID = Patients_PatientID;
        address.AddressesTypes_idAddressType = AddressesTypes_idAddressType;

        await address.save();
        res.status(200).json(address);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при обновлении адреса", error: err });
    }
};

// Удаление адреса
const deleteAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const address = await Addresses.findByPk(id);
        if (!address) {
            return res.status(404).json({ message: "Адрес не найден" });
        }

        await address.destroy();
        res.status(200).json({ message: "Адрес удален" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при удалении адреса", error: err });
    }
};

module.exports = {
    getAllAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
};
