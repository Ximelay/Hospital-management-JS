const Patients  = require("../models/Patients");

// Получение всех пациентов
const getAllPatients = async (req, res) => {
    try {
        console.log("Запрос на получение пациентов");  // Добавь лог перед запросом
        const patients = await Patients.findAll();
        console.log("Пациенты получены:", patients);  // Логируем результат

        if (!patients || patients.length === 0) {
            return res.status(200).json({ message: "Пациенты не найдены" });
        }
        res.status(200).json(patients);
    } catch (err) {
        console.error(err);  // Логируем ошибку
        res.status(500).json({ message: "Ошибка при получении пациентов", error: err });
    }
};

// Создание нового пациента
const createPatient = async (req, res) => {
    try {
        console.log("Данные, полученные от клиента:", req.body); // Логируем входные данные
        // Логируем входящие данные
        console.log(req.body);

        const { firstName, lastName, middleName, insurancePolicyNumber, birthDate, email, phoneNumber, passportData, workplace, address, photo, qrCode } = req.body;

        if (!firstName || !lastName || !birthDate || !phoneNumber || !insurancePolicyNumber) {
            return res.status(400).json({ message: "Пожалуйста, заполните все обязательные поля." });
        }

        const newPatient = await Patients.create({
            FirstName: firstName,
            LastName: lastName,
            MiddleName: middleName,
            InsurancePolicyNumber: insurancePolicyNumber,
            BirthDate: birthDate,
            EmailAddress: email,
            TelephoneNumber: phoneNumber,
            PassportData: passportData,
            Workplace: workplace,
            Address: address,
            Photo: photo,
            QrCode: qrCode,
        });

        res.status(201).json(newPatient);
    } catch (err) {
        console.error("Ошибка при создании пациента:", err);
        res.status(500).json({ message: "Ошибка при создании пациента", error: err });
    }
};

// Обновление информации о пациенте
const updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const { FirstName, LastName, MiddleName, BirthDate, Gender, InsurancePolicyNumber, TelephoneNumber, EmailAddress, Workplaces_idWorkplaces } = req.body;

        const patient = await Patients.findByPk(id);
        if (!patient) {
            return res.status(404).json({ message: "Пациент не найден" });
        }

        patient.FirstName = FirstName;
        patient.LastName = LastName;
        patient.MiddleName = MiddleName;
        patient.BirthDate = BirthDate;
        patient.Gender = Gender;
        patient.InsurancePolicyNumber = InsurancePolicyNumber;
        patient.TelephoneNumber = TelephoneNumber;
        patient.EmailAddress = EmailAddress;
        patient.Workplaces_idWorkplaces = Workplaces_idWorkplaces;

        await patient.save();
        res.status(200).json(patient);
    } catch (err) {
        res.status(500).json({ message: "Ошибка при обновлении пациента", error: err });
    }
};

// Удаление пациента
const deletePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patients.findByPk(id);
        if (!patient) {
            return res.status(404).json({ message: "Пациент не найден" });
        }

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
