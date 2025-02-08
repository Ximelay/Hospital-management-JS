const { Patients, Workplaces, Passports, Addresses } = require("../models");

// ✅ Получение всех пациентов (с местом работы, паспортом и адресом)
const getAllPatients = async (req, res) => {
    try {
        console.log("Запрос на получение пациентов");

        const patients = await Patients.findAll({
            include: [
                { model: Workplaces, attributes: ["WorkplaceName"] },
                { model: Passports, attributes: ["SeriesNumber", "IssueDate"] },
                { model: Addresses, attributes: ["FullAddress", "AddressType"] } // ❌ Убираем несуществующие поля
            ]
        });

        if (!patients || patients.length === 0) {
            return res.status(200).json({ message: "Пациенты не найдены" });
        }
        res.status(200).json(patients);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при получении пациентов", error: err });
    }
};

// ✅ Создание нового пациента (с местом работы, паспортом и адресом)
const createPatient = async (req, res) => {
    try {
        console.log("Данные, полученные от клиента:", req.body);

        const { FirstName, LastName, MiddleName, BirthDate, Gender, InsurancePolicyNumber, TelephoneNumber, EmailAddress, Workplace, PassportData, Address, AddressType } = req.body;

        if (!FirstName || !LastName || !BirthDate || !Gender || !InsurancePolicyNumber || !TelephoneNumber) {
            return res.status(400).json({ message: "Пожалуйста, заполните все обязательные поля." });
        }

        // 🔹 Проверяем или создаем новое место работы
        let workplaceRecord = await Workplaces.findOne({ where: { WorkplaceName: Workplace } });
        if (!workplaceRecord) {
            workplaceRecord = await Workplaces.create({ WorkplaceName: Workplace });
        }

        // 🔹 Создаем пациента
        const newPatient = await Patients.create({
            FirstName,
            LastName,
            MiddleName,
            BirthDate,
            Gender,
            InsurancePolicyNumber,
            TelephoneNumber,
            EmailAddress,
            Workplaces_idWorkplaces: workplaceRecord.idWorkplaces,
        });

        // 🔹 Добавляем паспортные данные
        if (PassportData) {
            await Passports.create({
                SeriesNumber: PassportData,
                Patients_PatientID: newPatient.idPatient,
            });
        }

        // 🔹 Добавляем адрес (ТЕПЕРЬ ПРАВИЛЬНО)
        if (Address) {
            await Addresses.create({
                FullAddress: Address,
                AddressType: AddressType || "Домашний", // По умолчанию "Домашний"
                Patients_PatientID: newPatient.idPatient,
            });
        }

        res.status(201).json(newPatient);
    } catch (err) {
        console.error("Ошибка при создании пациента:", err);
        res.status(500).json({ message: "Ошибка при создании пациента", error: err });
    }
};

// ✅ Обновление информации о пациенте
const updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const { FirstName, LastName, MiddleName, BirthDate, Gender, InsurancePolicyNumber, TelephoneNumber, EmailAddress, Workplace, PassportData, Address, AddressType } = req.body;

        const patient = await Patients.findByPk(id);
        if (!patient) {
            return res.status(404).json({ message: "Пациент не найден" });
        }

        // Обновляем данные пациента
        await patient.update({
            FirstName,
            LastName,
            MiddleName,
            BirthDate,
            Gender,
            InsurancePolicyNumber,
            TelephoneNumber,
            EmailAddress,
        });

        // Обновляем место работы
        if (Workplace) {
            let workplaceRecord = await Workplaces.findOne({ where: { WorkplaceName: Workplace } });
            if (!workplaceRecord) {
                workplaceRecord = await Workplaces.create({ WorkplaceName: Workplace });
            }
            patient.Workplaces_idWorkplaces = workplaceRecord.idWorkplaces;
            await patient.save();
        }

        // Обновляем паспортные данные
        if (PassportData) {
            let passportRecord = await Passports.findOne({ where: { Patients_PatientID: id } });
            if (passportRecord) {
                await passportRecord.update({ SeriesNumber: PassportData });
            } else {
                await Passports.create({ SeriesNumber: PassportData, Patients_PatientID: id });
            }
        }

        // Обновляем адрес
        if (Address) {
            let addressRecord = await Addresses.findOne({ where: { Patients_PatientID: id } });
            if (addressRecord) {
                await addressRecord.update({ FullAddress: Address, AddressType: AddressType || "Домашний" });
            } else {
                await Addresses.create({ FullAddress: Address, AddressType: AddressType || "Домашний", Patients_PatientID: id });
            }
        }

        res.status(200).json(patient);
    } catch (err) {
        res.status(500).json({ message: "Ошибка при обновлении пациента", error: err });
    }
};

// ✅ Удаление пациента (вместе с паспортом и адресом)
const deletePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patients.findByPk(id);
        if (!patient) {
            return res.status(404).json({ message: "Пациент не найден" });
        }

        // Удаляем зависимые данные (паспорт, адрес)
        await Passports.destroy({ where: { Patients_PatientID: id } });
        await Addresses.destroy({ where: { Patients_PatientID: id } });

        // Удаляем пациента
        await patient.destroy();
        res.status(200).json({ message: "Пациент удален" });
    } catch (err) {
        res.status(500).json({ message: "Ошибка при удалении пациента", error: err });
    }
};

module.exports = {
    getAllPatients,
    createPatient,
    updatePatient,
    deletePatient,
};
