const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ProcedureTypes = sequelize.define("ProcedureTypes", {
    idProcedureType: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    NameProcedureType: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
});

module.exports = ProcedureTypes;
