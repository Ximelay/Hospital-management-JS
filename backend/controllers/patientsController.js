const { Patients, Workplaces, Passports, Addresses, AddressesTypes, MedicalCards } = require("../models");
const QRCode = require("qrcode");

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
                },
                { model: MedicalCards, attributes: ["idMedicalCard", "MedicalCardIssueDate"] } // ✅ Добавляем медицинскую карту
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

const getPatientsForHospitalization = async (req, res) => {
    try {
        const patients = await Patients.findAll({
            attributes: ['idPatient', 'FirstName', 'LastName', 'MiddleName']
        });

        if (!patients || patients.length === 0) {
            return res.status(200).json({ message: "Пациенты не найдены" });
        }

        res.status(200).json(patients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка при получении пациентов для госпитализации", error: error })
    }
}

const getPatientByMedicalCard = async (req, res) => {
    try {
        const { idMedicalCard } = req.params;

        // Проверка на пустое значение
        if (!idMedicalCard) {
            return res.status(400).json({ message: "Номер медицинской карты не указан." });
        }

        const medicalCard = await MedicalCards.findOne({
            where: { CardNumber: idMedicalCard },  // Используется CardNumber
            include: [
                {
                    model: Patients,
                    attributes: ["FirstName", "LastName", "MiddleName", "BirthDate", "Gender", "InsurancePolicyNumber", "TelephoneNumber", "EmailAddress"],
                    include: [
                        {
                            model: Workplaces,
                            attributes: ["WorkplaceName"], // Данные о месте работы
                        },
                        {
                            model: Passports,
                            attributes: ["SeriesNumber", "IssueDate"], // Данные о паспорте
                        },
                        {
                            model: Addresses,
                            attributes: ["FullAddress"],
                            include: [
                                {
                                    model: AddressesTypes,
                                    attributes: ["NameOfAddressType"], // Тип адреса
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        if (!medicalCard) {
            return res.status(404).json({ message: "Пациент с таким номером медкарты не найден." });
        }

        res.status(200).json(medicalCard);
    } catch (err) {
        console.error("Ошибка при поиске пациента:", err);
        res.status(500).json({ message: "Ошибка при поиске пациента", error: err });
    }
};




const generateQRCode = async (req, res) => {
    try {
        const { medicalCardNumber } = req.params;

        if (!medicalCardNumber) {
            return res.status(400).json({ message: "Номер медицинской карты не указан." });
        }

        const medicalCard = await MedicalCards.findOne({
            where: { CardNumber: medicalCardNumber },
            include: [{ model: Patients, attributes: ["FirstName", "LastName"] }]
        });

        if (!medicalCard) {
            return res.status(404).json({ message: "Медицинская карта не найдена." });
        }

        // Генерируем QR-код
        const qrData = `Медкарта: ${medicalCard.CardNumber}\nФИО: ${medicalCard.Patient.FirstName} ${medicalCard.Patient.LastName}`;
        const qrImage = await QRCode.toDataURL(qrData);

        res.status(200).json({ qrImage });
    } catch (err) {
        console.error("Ошибка при генерации QR-кода:", err);
        res.status(500).json({ message: "Ошибка при генерации QR-кода", error: err });
    }
};


// ✅ Создание нового пациента (с местом работы, паспортом и адресом)
const createPatient = async (req, res) => {
    try {
        const {
            FirstName, LastName, MiddleName, BirthDate, Gender,
            InsurancePolicyNumber, TelephoneNumber, EmailAddress,
            Workplace, PassportData, PassportIssueDate, Address, AddressType,
            MedicalCardNumber
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

        // 🔹 4. Добавляем паспортные данные
        let passportRecord = null;
        if (PassportData) {
            passportRecord = await Passports.create({
                SeriesNumber: PassportData,
                IssueDate: PassportIssueDate,
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

        // 🔹 6. Генерируем случайный номер карты, если он не передан
        const generatedCardNumber = MedicalCardNumber || `MC${Date.now()}`;

        // 🔹 7. Создаём медицинскую карту
        const newMedicalCard = await MedicalCards.create({
            CardNumber: generatedCardNumber,
            MedicalCardIssueDate: new Date(),
            Patients_idPatient: newPatient.idPatient
        });

        // 🔹 8. Обновляем пациента с ID паспорта, ID адреса и ID мед. карты
        await newPatient.update({
            Passports_idPassport: passportRecord ? passportRecord.idPassport : null,
            Addresses_idAddress: addressRecord ? addressRecord.idAddress : null,
            MedicalCards_idMedicalCard: newMedicalCard.idMedicalCard
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

            // Обновляем медицинскую карту, если передана дата
            if (req.body.MedicalCardIssueDate) {
                let medicalCardRecord = await MedicalCards.findOne({ where: { Patients_idPatient: id } });

                if (medicalCardRecord) {
                    await medicalCardRecord.update({ MedicalCardIssueDate: req.body.MedicalCardIssueDate });
                }
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
        await MedicalCards.destroy({ where: { Patients_idPatient: id } });

        // Удаляем пациента
        await patient.destroy();
        res.status(200).json({ message: "Пациент удален" });
    } catch (err) {
        res.status(500).json({ message: "Ошибка при удалении пациента", error: err });
    }
};

const saveOrUpdatePatient = async (req, res) => {
    try {
        const {
            FirstName, LastName, MiddleName, BirthDate, Gender,
            InsurancePolicyNumber, TelephoneNumber, EmailAddress,
            Workplace, PassportData, PassportIssueDate, Address, AddressType,
            MedicalCardNumber
        } = req.body;

        if (!FirstName || !LastName || !BirthDate || !Gender || !InsurancePolicyNumber || !TelephoneNumber) {
            return res.status(400).json({ message: "Пожалуйста, заполните все обязательные поля." });
        }

        // 🔍 Найти пациента по номеру медицинской карты
        const medicalCard = await MedicalCards.findOne({
            where: { CardNumber: MedicalCardNumber },
            include: [{ model: Patients }]
        });

        if (medicalCard && medicalCard.Patient) {
            // ✅ Пациент существует - обновляем данные
            const patient = medicalCard.Patient;

            // Обновляем данные пациента
            await patient.update({
                FirstName,
                LastName,
                MiddleName,
                BirthDate,
                Gender,
                InsurancePolicyNumber,
                TelephoneNumber,
                EmailAddress
            });

            // Обновляем место работы
            if (Workplace) {
                let workplaceRecord = await Workplaces.findOne({ where: { WorkplaceName: Workplace } });
                if (!workplaceRecord) {
                    workplaceRecord = await Workplaces.create({ WorkplaceName: Workplace });
                }
                await patient.update({ Workplaces_idWorkplaces: workplaceRecord.idWorkplaces });
            }

            // Обновляем паспорт
            if (PassportData) {
                const passportRecord = await Passports.findOne({ where: { Patients_idPatient: patient.idPatient } });
                if (passportRecord) {
                    await passportRecord.update({
                        SeriesNumber: PassportData,
                        IssueDate: PassportIssueDate
                    });
                } else {
                    await Passports.create({
                        SeriesNumber: PassportData,
                        IssueDate: PassportIssueDate,
                        Patients_idPatient: patient.idPatient
                    });
                }
            }

            // Обновляем адрес
            if (Address) {
                const addressRecord = await Addresses.findOne({ where: { Patients_idPatient: patient.idPatient } });
                const addressType = await AddressesTypes.findOne({ where: { NameOfAddressType: AddressType } });

                if (!addressType) {
                    return res.status(400).json({ message: "Некорректный тип адреса." });
                }

                if (addressRecord) {
                    await addressRecord.update({
                        FullAddress: Address,
                        AddressesTypes_idAddressType: addressType.idAddressType
                    });
                } else {
                    await Addresses.create({
                        FullAddress: Address,
                        AddressesTypes_idAddressType: addressType.idAddressType,
                        Patients_idPatient: patient.idPatient
                    });
                }
            }

            return res.status(200).json({ message: "Данные пациента успешно обновлены." });
        } else {
            // ❌ Пациента нет, создаем нового
            let workplaceRecord = await Workplaces.findOne({ where: { WorkplaceName: Workplace } });
            if (!workplaceRecord) {
                workplaceRecord = await Workplaces.create({ WorkplaceName: Workplace });
            }

            const addressType = await AddressesTypes.findOne({ where: { NameOfAddressType: AddressType } });
            if (!addressType) {
                return res.status(400).json({ message: "Некорректный тип адреса." });
            }

            const newPatient = await Patients.create({
                FirstName,
                LastName,
                MiddleName,
                BirthDate,
                Gender,
                InsurancePolicyNumber,
                TelephoneNumber,
                EmailAddress,
                Workplaces_idWorkplaces: workplaceRecord.idWorkplaces
            });

            if (PassportData) {
                await Passports.create({
                    SeriesNumber: PassportData,
                    IssueDate: PassportIssueDate,
                    Patients_idPatient: newPatient.idPatient
                });
            }

            if (Address) {
                await Addresses.create({
                    FullAddress: Address,
                    AddressesTypes_idAddressType: addressType.idAddressType,
                    Patients_idPatient: newPatient.idPatient
                });
            }

            const generatedCardNumber = MedicalCardNumber || `MC${Date.now()}`;
            await MedicalCards.create({
                CardNumber: generatedCardNumber,
                MedicalCardIssueDate: new Date(),
                Patients_idPatient: newPatient.idPatient
            });

            return res.status(201).json({ message: "Новый пациент успешно создан." });
        }
    } catch (error) {
        console.error("Ошибка при сохранении/обновлении пациента:", error);
        return res.status(500).json({ message: "Ошибка на сервере", error });
    }
};

module.exports = {
    getAllPatients,
    getPatientByMedicalCard,
    getPatientsForHospitalization,
    createPatient,
    updatePatient,
    deletePatient,
    generateQRCode,
    saveOrUpdatePatient
};