const { DataTypes } = require("sequelize");
const connection = require("../db/connection");

const Address = connection.define(
  "addresses",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //track nationality
    homeDistrict: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    homeVillage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Address;
