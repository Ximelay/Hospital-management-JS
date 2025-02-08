const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Specializations = sequelize.define("Specializations", {
    SpecializationID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Specialization: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
});

module.exports = Specializations;
