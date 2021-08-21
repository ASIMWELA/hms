const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");
const connection = require("../db/connection");

const Appointment = connection.define(
  "appointments",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = Appointment;
