const { DataTypes } = require('sequelize');
const connection = require("../db/connection");


const Medication = connection.define('Medications', {
  // Model attributes are defined here
id:{
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true,
  allowNull:false
},
  uuid:{
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
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
},

{
  timestamps:false
});




///define patient's relations

module.exports = Medication