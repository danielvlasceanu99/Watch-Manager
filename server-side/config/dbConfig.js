const Sequelize = require("sequelize");

const username = "root";
const password = "";

const sequelize = new Sequelize("watch_manager", username, password, {
    dialect: "mysql",
    host: "localhost",
    define: {
        timestamp: true,
    },
});

module.exports = sequelize;
