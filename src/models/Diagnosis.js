const { DataTypes } = require("sequelize");
const connection = require("../db/connection");
const Medication = require("./Medication");

const Diagnosis = connection.define(
  "Diagnoses",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    dateEntered: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dateDischarged: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    admission: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Diagnosis.hasOne(Medication);
Medication.belongsTo(Diagnosis);

module.exports = Diagnosis;
