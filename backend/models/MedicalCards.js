const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const MedicalCards = sequelize.define("MedicalCards", {
    idMedicalCard: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    CardNumber: {  // Добавляем поле для номера карты
        type: DataTypes.STRING(45),  // Тип поля, можно изменить длину если нужно
        allowNull: false,
        unique: true  // Обеспечим уникальность номера карты
    },
    MedicalCardIssueDate: DataTypes.DATE,
    Patients_idPatient: {
        type: DataTypes.INTEGER,
    },
});

module.exports = MedicalCards;
