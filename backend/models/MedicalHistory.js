const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const MedicalCards = require("./MedicalCards");
const Diagnoses = require("./Diagnoses");

const MedicalHistory = sequelize.define("MedicalHistory", {
    idMedicalHistory: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    PatientLastVisitDate: DataTypes.DATE,
    PatientNextVisitDate: DataTypes.DATE,
    MedicalCards_idMedicalCard: {
        type: DataTypes.INTEGER,
        references: {
            model: MedicalCards,
            key: "idMedicalCard",
        },
    },
    Diagnoses_idDiagnosis: {
        type: DataTypes.INTEGER,
        references: {
            model: Diagnoses,
            key: "idDiagnosis",
        },
    },
});

MedicalHistory.belongsTo(MedicalCards, { foreignKey: "MedicalCards_idMedicalCard" });
MedicalHistory.belongsTo(Diagnoses, { foreignKey: "Diagnoses_idDiagnosis" });

module.exports = MedicalHistory;
