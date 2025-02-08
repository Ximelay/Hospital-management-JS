const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Doctors = sequelize.define("Doctors", {
    idDoctor: {
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
    Specializations_SpecializationID: {
        type: DataTypes.INTEGER,
    },
});

module.exports = Doctors;