const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const MedicalHistory = sequelize.define("MedicalHistory", {
    idMedicalHistory: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    PatientLastVisitDate: DataTypes.DATE,
    PatientNextVisitDate: DataTypes.DATE,
    MedicalCards_idMedicalCard: {
        type: DataTypes.INTEGER,
    },
    Diagnoses_idDiagnosis: {
        type: DataTypes.INTEGER,
    },
});

module.exports = MedicalHistory;
