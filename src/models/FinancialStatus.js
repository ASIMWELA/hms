"use strict";
const { DataTypes } = require("sequelize");
const connection = require("../db/connection");
const Scheme = require("./Scheme");

const FinancialStatus = connection.define(
  "FinancialStatuses",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    onScheme: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: false,
  }
);

//finacial status
Scheme.hasMany(FinancialStatus, {
  onUpdate: "CASCADE",
  onDelete: "NO ACTION",
});
FinancialStatus.belongsTo(Scheme);

module.exports = FinancialStatus;
