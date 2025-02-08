const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Patients = require("./Patients");

const MedicalCards = sequelize.define("MedicalCards", {
    idMedicalCard: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    MedicalCardIssueDate: DataTypes.DATE,
    Patients_idPatient: {
        type: DataTypes.INTEGER,
        references: {
            model: Patients,
            key: "idPatient",
        },
    },
});

Patients.hasOne(MedicalCards, { foreignKey: "Patients_idPatient" });
MedicalCards.belongsTo(Patients, { foreignKey: "Patients_idPatient" });

module.exports = MedicalCards;
