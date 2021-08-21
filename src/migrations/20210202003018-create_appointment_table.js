"use strict";
const { date } = require("joi");
const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     */
    await queryInterface.createTable("appointments", {
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
    await queryInterface.dropTable("appointments");
  },
};
