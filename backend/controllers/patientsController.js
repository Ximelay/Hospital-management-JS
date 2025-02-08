const { Patients, Workplaces, Passports, Addresses, AddressesTypes } = require("../models");

// ✅ Получение всех пациентов (с местом работы, паспортом и адресом)
const getAllPatients = async (req, res) => {
    try {
        console.log("Запрос на получение пациентов");

        const patients = await Patients.findAll({
            include: [
                { model: Workplaces, attributes: ["WorkplaceName"] },
                { model: Passports, attributes: ["SeriesNumber", "IssueDate"] },
                {
                    model: Addresses,
                    attributes: ["FullAddress"],
                    include: [{ model: AddressesTypes, attributes: ["NameOfAddressType"] }]
                }
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

        const {
            FirstName, LastName, MiddleName, BirthDate, Gender,
            InsurancePolicyNumber, TelephoneNumber, EmailAddress,
            Workplace, PassportData, PassportIssueDate, Address, AddressType
        } = req.body;

        if (!FirstName || !LastName || !BirthDate || !Gender || !InsurancePolicyNumber || !TelephoneNumber || !PassportIssueDate) {
            return res.status(400).json({ message: "Пожалуйста, заполните все обязательные поля." });
        }

        // 🔹 1. Проверяем или создаем место работы
        let workplaceRecord = await Workplaces.findOne({ where: { WorkplaceName: Workplace } });
        if (!workplaceRecord) {
            workplaceRecord = await Workplaces.create({ WorkplaceName: Workplace });
        }

        // 🔹 2. Проверяем или создаем тип адреса
        let addressTypeRecord = await AddressesTypes.findOne({ where: { NameOfAddressType: AddressType } });
        if (!addressTypeRecord) {
            return res.status(400).json({ message: "Некорректный тип адреса." });
        }

        // 🔹 3. Создаём пациента
        const newPatient = await Patients.create({
            FirstName, LastName, MiddleName, BirthDate, Gender,
            InsurancePolicyNumber, TelephoneNumber, EmailAddress,
            Workplaces_idWorkplaces: workplaceRecord.idWorkplaces
        });

        // 🔹 4. Добавляем паспортные данные с датой выдачи
        let passportRecord = null;
        if (PassportData) {
            passportRecord = await Passports.create({
                SeriesNumber: PassportData,
                IssueDate: PassportIssueDate,  // ✅ Теперь заполняем дату, введённую пользователем
                Patients_idPatient: newPatient.idPatient
            });
        }

        // 🔹 5. Добавляем адрес
        let addressRecord = null;
        if (Address) {
            addressRecord = await Addresses.create({
                FullAddress: Address,
                AddressesTypes_idAddressType: addressTypeRecord.idAddressType,
                Patients_idPatient: newPatient.idPatient
            });
        }

        // 🔹 6. Обновляем пациента с ID паспорта и ID адреса
        await newPatient.update({
            Passports_idPassport: passportRecord ? passportRecord.idPassport : null,
            Addresses_idAddress: addressRecord ? addressRecord.idAddress : null
        });

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
            await patient.update({ Workplaces_idWorkplaces: workplaceRecord.idWorkplaces });
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
            let addressRecord = await Addresses.findOne({ where: { Patients_idPatient: id } });

            let addressTypeRecord = await AddressesTypes.findOne({ where: { NameOfAddressType: AddressType } });
            if (!addressTypeRecord) {
                return res.status(400).json({ message: "Некорректный тип адреса." });
            }

            if (addressRecord) {
                await addressRecord.update({
                    FullAddress: Address,
                    AddressesTypes_idAddressType: addressTypeRecord.idAddressType,
                });
            } else {
                await Addresses.create({
                    FullAddress: Address,
                    AddressesTypes_idAddressType: addressTypeRecord.idAddressType,
                    Patients_idPatient: id
                });
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
