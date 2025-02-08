const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Addresses = sequelize.define("Addresses", {
    idAddress: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    AddressType: { type: DataTypes.STRING(45), allowNull: false },
    FullAddress: { type: DataTypes.STRING(255), allowNull: false },
    Patients_PatientID: {
        type: DataTypes.INTEGER,
    },
    AddressesTypes_idAddressType: {
        type: DataTypes.INTEGER,
    },
});

module.exports = Addresses;
