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

// diagnosis foreign key Association
// Diagnosis.hasOne(VisitHistory,{
//   onUpdate:"CASCADE",
//   onDelete:"CASCADE"
// })
// VisitHistory.belongsTo(Diagnosis,{foreignKey:'diagnosisId'});

Diagnosis.hasOne(Medication);
Medication.belongsTo(Diagnosis);

module.exports = Diagnosis;
