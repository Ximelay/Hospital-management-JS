const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const AddressesTypes = sequelize.define("AddressesTypes", {
    idAddressType: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    NameOfAddessrType: { type: DataTypes.STRING(45), allowNull: true },
});

module.exports = AddressesTypes;
