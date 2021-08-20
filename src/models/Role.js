const { DataTypes } = require("sequelize");
const connection = require("../db/connection");

const Role = connection.define("Roles", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    min: 3,
    max: 30,
  },
},
  {
    timestamps: true
  }
);



module.exports = Role;