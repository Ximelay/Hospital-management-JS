const sequelize = require("../config/database");

// 🔹 Импортируем все модели **без связей**
const AddressesTypes = require("./AddressesTypes");
const Patients = require("./Patients");
const Doctors = require("./Doctors");
const Workplaces = require("./Workplaces");
const Passports = require("./Passports");
const Addresses = require("./Addresses");
const MedicalCards = require("./MedicalCards");
const MedicalHistory = require("./MedicalHistory");
const Specializations = require("./Specializations");
const MedicalProcedures = require("./MedicalProcedures");
const HospitalizationReasons = require("./HospitalizationReasons");
const Hospitalizations = require("./Hospitalizations");
const ProcedureTypes = require("./ProcedureTypes");
const Diagnoses = require("./Diagnoses");

// ==================== ✅ УСТАНОВКА СВЯЗЕЙ ==================== //

// 🔹 Пациент и место работы
Patients.belongsTo(Workplaces, { foreignKey: "Workplaces_idWorkplaces" });
Workplaces.hasMany(Patients, { foreignKey: "Workplaces_idWorkplaces" });

// 🔹 Пациент и паспорт
Patients.hasOne(Passports, { foreignKey: "Patients_idPatient" });
Passports.belongsTo(Patients, { foreignKey: "Patients_idPatient" });

// 🔹 Пациент и адрес
Patients.hasOne(Addresses, { foreignKey: "Patients_idPatient" });
Addresses.belongsTo(Patients, { foreignKey: "Patients_idPatient" });

// 🔹 Адрес и тип адреса
Addresses.belongsTo(AddressesTypes, { foreignKey: "AddressesTypes_idAddressType" });
AddressesTypes.hasMany(Addresses, { foreignKey: "AddressesTypes_idAddressType" });

// 🔹 Пациент и медицинская карта
Patients.hasOne(MedicalCards, { foreignKey: "Patients_idPatient" });
MedicalCards.belongsTo(Patients, { foreignKey: "Patients_idPatient" });

// 🔹 Медицинская карта и медицинская история
MedicalCards.hasMany(MedicalHistory, { foreignKey: "MedicalCards_idMedicalCard" });
MedicalHistory.belongsTo(MedicalCards, { foreignKey: "MedicalCards_idMedicalCard" });

// 🔹 Медицинская история и диагнозы (исправлено)
MedicalHistory.belongsTo(Diagnoses, { foreignKey: "Diagnoses_idDiagnosis" });
Diagnoses.hasMany(MedicalHistory, { foreignKey: "Diagnoses_idDiagnosis" });

// 🔹 Медицинская карта и процедуры
MedicalCards.hasMany(MedicalProcedures, { foreignKey: "MedicalCards_idMedicalCard" });
MedicalProcedures.belongsTo(MedicalCards, { foreignKey: "MedicalCards_idMedicalCard" });

// 🔹 Медицинские процедуры и их типы
MedicalProcedures.belongsTo(ProcedureTypes, { foreignKey: "ProcedureTypes_idProcedureType" });
ProcedureTypes.hasMany(MedicalProcedures, { foreignKey: "ProcedureTypes_idProcedureType" });

// 🔹 Медицинские процедуры и доктора
MedicalProcedures.belongsTo(Doctors, { foreignKey: "Doctors_idDoctor" });
Doctors.hasMany(MedicalProcedures, { foreignKey: "Doctors_idDoctor" });

// 🔹 Доктора и специализации
Doctors.belongsTo(Specializations, { foreignKey: "Specializations_SpecializationID" });
Specializations.hasMany(Doctors, { foreignKey: "Specializations_SpecializationID" });

// 🔹 Госпитализация и пациент
Hospitalizations.belongsTo(Patients, { foreignKey: "Patients_idPatient" });
Patients.hasMany(Hospitalizations, { foreignKey: "Patients_idPatient" });

// 🔹 Госпитализация и причины госпитализации
Hospitalizations.belongsTo(HospitalizationReasons, { foreignKey: "HospitalizationReasons_idHospitalizationReasons" });
HospitalizationReasons.hasMany(Hospitalizations, { foreignKey: "HospitalizationReasons_idHospitalizationReasons" });

// ==================== ✅ ЭКСПОРТ ВСЕХ МОДЕЛЕЙ ==================== //
module.exports = {
    sequelize,
    Patients,
    Workplaces,
    Passports,
    Addresses,
    MedicalCards,
    MedicalHistory,
    MedicalProcedures,
    ProcedureTypes,
    Diagnoses,
    AddressesTypes,
    Specializations,
    HospitalizationReasons,
    Hospitalizations,
    Doctors
};
