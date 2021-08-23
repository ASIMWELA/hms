const { DataTypes } = require("sequelize");
const connection = require("../db/connection");

const PatientVitals = connection.define(
  "patient_vitals",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    height: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    weight: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    temperature: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    bloodPressure: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pulse: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    respiratoryRate: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = PatientVitals;
