
'use strict';
const {DataTypes} = require('sequelize');
const connection = require('../db/connection');
const Sequelize = require('sequelize')
const Appointment = require('./Appointment')
const Role = require('./Role')

  const Doctor = connection.define('Doctors',{
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
           firstName:{
             type: DataTypes.STRING,
             allowNull:false
          },
           lastName:{
             type: DataTypes.STRING,
             allowNull: false
           },
           specialization:{
             type: DataTypes.STRING,
             allowNull: false
           },
           phoneNumber:{
             type: DataTypes.STRING,
             allowNull: false
           },
           email:{
             type: DataTypes.STRING,
             allowNull: false,
             unique:true,
             validate:{
               min:4,
               max:90,
               isEmail : true
             }
           },
           workingHours: {
             type: DataTypes.STRING,
             allowNull: false,
             unique:true,
           },
           sex:{
             type: DataTypes.STRING,
             allowNull: false
           }
    }, 
  {
    timestamps:true
  });

  Doctor.hasMany(Appointment,{
    onDelete:'NO ACTION',
    onUpdate:'CASCADE'
  })
  Appointment.belongsTo(Doctor)
  
  Doctor.hasOne(Role,{
    onDelete:'NO ACTION',
    onUpdate:'CASCADE'
  })
  Role.belongsTo(Doctor)

module.exports = Doctor