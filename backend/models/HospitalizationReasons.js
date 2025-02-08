const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const HospitalizationReasons = sequelize.define("HospitalizationReasons", {
    idHospitalizationReasons: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    ReasonName: { type: DataTypes.STRING(255), allowNull: false },
});

module.exports = HospitalizationReasons;
