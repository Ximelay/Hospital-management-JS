const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Workplaces = sequelize.define("Workplaces", {
    idWorkplaces: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    WorkplaceName: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
});

module.exports = Workplaces;