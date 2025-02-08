const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "hospitalmanagment",  // Имя базы данных
    "root",                // Имя пользователя
    "",                    // Пустой пароль
    {
        host: "localhost",  // Хост базы данных
        dialect: "mysql",   // Тип базы данных
        define: {
            timestamps: false, // Отключаем createdAt, updatedAt
        },
    }
);

module.exports = sequelize;
