const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Diagnoses = sequelize.define("Diagnoses", {
    idDiagnosis: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    DiagnosisName: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
});

module.exports = Diagnoses;
