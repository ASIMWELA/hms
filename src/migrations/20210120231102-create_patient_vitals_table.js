"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("patientVitals", {
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
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now(),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now(),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("patientVitals");
  },
};
