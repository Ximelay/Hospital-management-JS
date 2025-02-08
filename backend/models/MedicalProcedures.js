const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

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
    },
    MedicalHistory_idMedicalHistory: {
        type: DataTypes.INTEGER,
    },
    ProcedureTypes_idProcedureType: {
        type: DataTypes.INTEGER,
    },
});

module.exports = MedicalProcedures;
