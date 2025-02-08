const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Hospitalizations = sequelize.define("Hospitalizations", {
    idHospitalization: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    HospitalizationDate: DataTypes.DATE,
    ConditionDescription: DataTypes.STRING(500),
    Patients_idPatient: {
        type: DataTypes.INTEGER,
    },
    HospitalizationReasons_idHospitalizationReasons: {
        type: DataTypes.INTEGER,
    },
});

module.exports = Hospitalizations;
