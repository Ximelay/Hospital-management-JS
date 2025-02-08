const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Patients = sequelize.define("Patients", {
    idPatient: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    FirstName: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    LastName: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    MiddleName: {
        type: DataTypes.STRING(45),
    },
    BirthDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Gender: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    InsurancePolicyNumber: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    TelephoneNumber: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    EmailAddress: {
        type: DataTypes.STRING(45),
    },
    Workplaces_idWorkplaces: {
        type: DataTypes.INTEGER,
    },
    Passports_idPassport: {
        type: DataTypes.INTEGER,
    },
    Addresses_idAddress: {
        type: DataTypes.INTEGER,
    },
});

module.exports = Patients;
