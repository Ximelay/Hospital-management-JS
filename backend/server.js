const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const sequelize = require("./config/database");

// Подключение маршрутов
const patientsRoutes = require("./routes/patients");
const doctorsRoutes = require("./routes/doctors");
const workplacesRoutes = require("./routes/workplaces");
const specializationsRoutes = require("./routes/specializations");
const hospitalizationsRoutes = require("./routes/hospitalizations");
const addressesRoutes = require("./routes/addresses");
const passportsRoutes = require("./routes/passports");
const addressesTypesRoutes = require("./routes/addressesTypes");
const hospitalizationReasonsRoutes = require("./routes/hospitalizationReasons");
const medicalProceduresRoutes = require("./routes/medicalProcedures");
const medicalHistoryRoutes = require("./routes/medicalHistory");
const medicalCardsRoutes = require("./routes/medicalCards");
const procedureTypesRoutes = require("./routes/procedureTypes");
const diagnosesRoutes = require("./routes/diagnoses");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Подключение API маршрутов
app.use("/api/patients", patientsRoutes);
app.use("/api/doctors", doctorsRoutes);
app.use("/api/workplaces", workplacesRoutes);
app.use("/api/specializations", specializationsRoutes);
app.use("/api/hospitalizations", hospitalizationsRoutes);
app.use("/api/addresses", addressesRoutes);
app.use("/api/passports", passportsRoutes);
app.use("/api/addressesTypes", addressesTypesRoutes);
app.use("/api/hospitalizationReasons", hospitalizationReasonsRoutes);
app.use("/api/medicalProcedures", medicalProceduresRoutes);
app.use("/api/medicalHistory", medicalHistoryRoutes);
app.use("/api/medicalCards", medicalCardsRoutes);
app.use("/api/procedureTypes", procedureTypesRoutes);
app.use("/api/diagnoses", diagnosesRoutes);

// Запуск сервера после синхронизации с БД
sequelize.sync({ force: false })  // false, чтобы не удалять таблицы при каждом запуске
    .then(() => {
        app.listen(3000, () => {
            console.log("Server is running on http://localhost:3000");
        });
    })
    .catch((err) => {
        console.error("Error connecting to the database:", err);
    });
