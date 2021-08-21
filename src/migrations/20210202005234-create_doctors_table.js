"use strict";
const DataTypes = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("doctors", {
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
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      specialization: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          min: 4,
          max: 90,
        },
      },
      workingHours: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      sex: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now(),
      },
      updateAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now(),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("doctors");
  },
};
