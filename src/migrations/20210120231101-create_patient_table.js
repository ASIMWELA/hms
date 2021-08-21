"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("patients", {
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
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sex: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      middleName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          min: 4,
          max: 90,
        },
        // allowNull defaults to true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          min: 4,
          max: 90,
          isEmail: true,
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          max: 12,
          min: 8,
        },
      },
      dateOfBirth: {
        type: DataTypes.DATE,
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          min: 5,
        },
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * */
    await queryInterface.dropTable("patients");
  },
};
