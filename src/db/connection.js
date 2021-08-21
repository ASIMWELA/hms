const { Sequelize } = require("sequelize");
require("dotenv").config();
const connection = new Sequelize(process.env.DATABASE_URL,{
  dialect:"postgres"
});
// connection.sync({ force: false });

module.exports = connection;
