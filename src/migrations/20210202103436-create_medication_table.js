'use strict';
const { DataTypes } = require('sequelize');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * */
      await queryInterface.createTable('Medications', {
        id:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull:false
        },
          uuid:{
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull:false
         },
          name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          brand: {
            type: DataTypes.STRING,
            allowNull: false
          },
           description: {
            type: DataTypes.TEXT,
            allowNull: true
          },
          price:{
            type: DataTypes.STRING,
            allowNull: false
          }
        
      });
     
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
     await queryInterface.dropTable('Medications');
    
  }
};
