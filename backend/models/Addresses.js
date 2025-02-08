const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Addresses = sequelize.define("Addresses", {
    idAddress: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    FullAddress: { type: DataTypes.STRING(255), allowNull: false },
    Patients_PatientID: { type: DataTypes.INTEGER },
    AddressesTypes_idAddressType: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Addresses;
