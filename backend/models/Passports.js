const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Passports = sequelize.define("Passports", {
    idPassport: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    SeriesNumber: {
        type: DataTypes.STRING(45),
    },
    IssueDate: {
        type: DataTypes.DATE,
    },
    Patients_idPatient: {
        type: DataTypes.INTEGER,
        allowNull: false,  // Связь с Patients, но уже без FOREIGN KEY (он в `index.js`)
    },
});

module.exports = Passports;
