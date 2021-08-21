"use strict";

const { DataTypes } = require("sequelize");
const Patient = require("../models/Patient");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("diagnoses", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      date_entered: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      date_discharged: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      admission: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      Patient_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("diagnoses");
  },
};
