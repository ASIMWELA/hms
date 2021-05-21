const {DataTypes} = require('sequelize');
const  connection  = require('../db/connection');

const Scheme = connection.define('Schemes',{

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type:DataTypes.INTEGER
  },
  benefits: {
    type:DataTypes.STRING
  },
  name: {
    type:DataTypes.STRING
  },
  medication: {
    type:DataTypes.STRING
  }

}, {
  timestamps:false
}) 
module.exports = Scheme