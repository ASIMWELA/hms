const { DataTypes } = require("sequelize");
const Room = require("./Room");
const Doctor = require("./Doctor");
const Patient = require("./Patient");
const Diagnosis = require("./Diagnosis");
const connection = require("../db/connection");

const VisitHistory = connection.define("visit_history", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  period: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalBilling: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
});

VisitHistory.belongsToMany(Doctor, {
  onDelete: "NO ACTION",
  through: "doctor_attended",
});

Doctor.belongsToMany(VisitHistory, {
  through: "doctor_attended",
});

Diagnosis.hasOne(VisitHistory, {
  onUpdate: "CASCADE",
  onDelete: "NO ACTION",
});
VisitHistory.belongsTo(Diagnosis);

Room.hasMany(VisitHistory, {
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
VisitHistory.belongsTo(Room);

module.exports = VisitHistory;
