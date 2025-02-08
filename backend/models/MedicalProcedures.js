const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Doctors = require("./Doctors");
const MedicalHistory = require("./MedicalHistory");
const ProcedureTypes = require("./ProcedureTypes");

const MedicalProcedures = sequelize.define("MedicalProcedures", {
    idMedicalProcedure: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ProcedureDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    ProcedureName: {
        type: DataTypes.STRING(255),
    },
    Results: {
        type: DataTypes.STRING(45),
    },
    Recommendations: {
        type: DataTypes.STRING(1000),
    },
    Doctors_idDoctor: {
        type: DataTypes.INTEGER,
        references: {
            model: Doctors,
            key: "idDoctor",
        },
    },
    MedicalHistory_idMedicalHistory: {
        type: DataTypes.INTEGER,
        references: {
            model: MedicalHistory,
            key: "idMedicalHistory",
        },
    },
    ProcedureTypes_idProcedureType: {
        type: DataTypes.INTEGER,
        references: {
            model: ProcedureTypes,
            key: "idProcedureType",
        },
    },
});

module.exports = MedicalProcedures;
