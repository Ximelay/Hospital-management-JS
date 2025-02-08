const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Patients = require("./Patients");

const Passport = sequelize.define("Passport", {
    idPassport: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    SeriesNumber: DataTypes.STRING(45),
    IssueDate: DataTypes.DATE,
    Patients_PatientID: {
        type: DataTypes.INTEGER,
        references: { model: Patients, key: "idPatient" },
    },
});

Patients.hasOne(Passport, { foreignKey: "Patients_PatientID" });
Passport.belongsTo(Patients, { foreignKey: "Patients_PatientID" });

module.exports = Passport;
