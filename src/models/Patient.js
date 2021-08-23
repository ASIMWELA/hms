const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");
const connection = require("../db/connection");

//const db = require('./index')

const Address = require("./Address");
const Appointment = require("./Appointment");
const FinancialStatus = require("./FinancialStatus");
const VisitHistory = require("./VisitHistory");
const Diagnosis = require("./Diagnosis");
const Room = require("./Room");
const Procedure = require("./Procedure");
const PatientVitals = require("./PatientVitals");

const Patient = connection.define(
  "patients",
  {
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
    middleName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false,
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
      allowNull: false,
      unique: true,
      validate: {
        min: 8,
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 5,
      },
    },
  },

  {
    timestamps: true,
  }
);

// /define patient's relations

Patient.hasMany(Procedure, {
  onDelete: "NO ACTION",
  onUpdate: "CASCADE",
});
Procedure.belongsTo(Patient);

Patient.hasOne(Address, {
  onDelete: "NO ACTION",
  onUpdate: "CASCADE",
});
Address.belongsTo(Patient);

Appointment.belongsTo(Patient);

// //diagnosis
Patient.hasMany(Diagnosis, {
  onDelete: "NO ACTION",
  onUpdate: "CASCADE",
});
Diagnosis.belongsTo(Patient);

Patient.hasMany(Room, {
  onDelete: "NO ACTION",
  onUpdate: "CASCADE",
});

Room.belongsTo(Patient);

/// financial_status association
Patient.hasOne(FinancialStatus, {
  onDelete: "NO ACTION",
  onUpdate: "CASCADE",
});
FinancialStatus.belongsTo(Patient);

// //appointments association

Patient.hasMany(Appointment, {
  onDelete: "NO ACTION",
  onUpdate: "CASCADE",
});
Appointment.belongsTo(Patient);

Patient.hasMany(VisitHistory, {
  onUpdate: "NO ACTION",
  onDelete: "CASCADE",
});
VisitHistory.belongsTo(Patient);

//procedure
Patient.hasMany(Procedure, {
  onDelete: "NO ACTION",
  onUpdate: "CASCADE",
});
Procedure.belongsTo(Patient);

//patient vitals associations

Patient.hasOne(PatientVitals);
PatientVitals.belongsTo(Patient, {
  onDelete: "NO ACTION",
  onUpdate: "CASCADE",
});

module.exports = Patient;
