const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Patients = require("./Patients");
const AddressesTypes = require("./AddressesTypes");

const Addresses = sequelize.define("Addresses", {
    idAddress: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    AddressType: { type: DataTypes.STRING(45), allowNull: false },
    FullAddress: { type: DataTypes.STRING(255), allowNull: false },
    Patients_PatientID: {
        type: DataTypes.INTEGER,
        references: { model: Patients, key: "idPatient" },
    },
    AddressesTypes_idAddressType: {
        type: DataTypes.INTEGER,
        references: { model: AddressesTypes, key: "idAddressType" },
    },
});

Addresses.belongsTo(Patients, { foreignKey: "Patients_PatientID" });
Patients.hasMany(Addresses, { foreignKey: "Patients_PatientID" });

Addresses.belongsTo(AddressesTypes, { foreignKey: "AddressesTypes_idAddressType" });
AddressesTypes.hasMany(Addresses, { foreignKey: "AddressesTypes_idAddressType" });

module.exports = Addresses;
