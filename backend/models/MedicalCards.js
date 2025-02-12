const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const MedicalCards = sequelize.define("MedicalCards", {
    idMedicalCard: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    CardNumber: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true
    },
    MedicalCardIssueDate: DataTypes.DATE,
    Patients_idPatient: {
        type: DataTypes.INTEGER,
    },
});

module.exports = MedicalCards;
