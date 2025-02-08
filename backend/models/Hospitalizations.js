const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Patients = require("./Patients");
const HospitalizationReasons = require("./HospitalizationReasons");

const Hospitalizations = sequelize.define("Hospitalizations", {
    idHospitalization: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    HospitalizationDate: DataTypes.DATE,
    ConditionDescription: DataTypes.STRING(500),
    Patients_idPatient: {
        type: DataTypes.INTEGER,
        references: {
            model: Patients,
            key: "idPatient",
        },
    },
    HospitalizationReasons_idHospitalizationReasons: {
        type: DataTypes.INTEGER,
        references: {
            model: HospitalizationReasons,
            key: "idHospitalizationReasons",
        },
    },
});

Hospitalizations.belongsTo(Patients, { foreignKey: "Patients_idPatient" });
Hospitalizations.belongsTo(HospitalizationReasons, { foreignKey: "HospitalizationReasons_idHospitalizationReasons" });

module.exports = Hospitalizations;
