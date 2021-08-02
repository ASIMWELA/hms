const { Sequelize } = require("sequelize");
require("dotenv").config();

const connectionString = `postgres://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const connection = new Sequelize(connectionString);

connection.sync({ force: true });

module.exports = connection;
