"use strict";

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //associate a patient to address
    return await queryInterface
      .addColumn("Addresses", "PatientId", {
        type: DataTypes.INTEGER,
        references: {
          model: "Patients", // name of Target model
          key: "id", // key in Target model that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
      })
      .then(async () => {
        return await queryInterface.addColumn("FinancialStatuses", "SchemeId", {
          type: DataTypes.INTEGER,
          references: {
            model: "Schemes", // name of Target model
            key: "id", // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
        });
      })
      .then(async () => {
        return await queryInterface.addColumn("Appointments", "PatientId", {
          type: DataTypes.INTEGER,
          references: {
            model: "Patients", // name of Target model
            key: "id", // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
        });
      })
      .then(async () => {
        return await queryInterface.addColumn("Procedures", "PatientId", {
          type: DataTypes.INTEGER,
          references: {
            model: "Patients", // name of Target model
            key: "id", // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
        });
      })
      .then(async () => {
        return await queryInterface.addColumn("Diagnoses", "PatientId", {
          type: DataTypes.INTEGER,
          references: {
            model: "Patients", // name of Target model
            key: "id", // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
        });
      })
      .then(async () => {
        return await queryInterface.addColumn("Rooms", "PatientId", {
          type: DataTypes.INTEGER,
          references: {
            model: "Patients", // name of Target model
            key: "id", // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
        });
      })
      .then(async () => {
        return await queryInterface.addColumn(
          "FinancialStatuses",
          "PatientId",
          {
            type: DataTypes.INTEGER,
            references: {
              model: "Patients", // name of Target model
              key: "id", // key in Target model that we're referencing
            },
            onUpdate: "CASCADE",
            onDelete: "NO ACTION",
          }
        );
      })
      .then(async () => {
        return await queryInterface.addColumn("VisitHistories", "PatientId", {
          type: DataTypes.INTEGER,
          references: {
            model: "Patients", // name of Target model
            key: "id", // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
        });
      })
      .then(async () => {
        return await queryInterface.addColumn("Medications", "DiagnosisId", {
          type: DataTypes.INTEGER,
          references: {
            model: "Diagnoses", // name of Target model
            key: "id", // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
        });
      })
      .then(async () => {
        return await queryInterface.addColumn("Appointments", "DoctorId", {
          type: DataTypes.INTEGER,
          references: {
            model: "Doctors", // name of Target model
            key: "id", // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
        });
      })
      .then(async () => {
        return await queryInterface.createTable("DoctorAttended", {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          DoctorId: {
            type: DataTypes.INTEGER,
            references: {
              model: "Doctors",
              key: "id",
            },
            allowNull: false,
          },
          VisitHistoryId: {
            type: DataTypes.INTEGER,
            references: {
              model: "VisitHistories",
              key: "id",
            },
            allowNull: false,
          },
        });
      })
      .then(async () => {
        return await queryInterface.addColumn("VisitHistories", "DiagnosisId", {
          type: DataTypes.INTEGER,
          references: {
            model: "Diagnoses", // name of Target model
            key: "id", // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
        });
      })
      .then(async () => {
        return await queryInterface.addColumn("VisitHistories", "RoomId", {
          type: DataTypes.INTEGER,
          references: {
            model: "Rooms", // name of Target model
            key: "id", // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
        });
      })
      .then(async () => {
        return await queryInterface.addColumn("PatientVitals", "PatientId", {
          type: DataTypes.INTEGER,
          references: {
            model: "Patients", // name of Target model
            key: "id", // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
        });
      });
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface
      .removeColumn("Addresses", "PatientId")
      .then(async () => {
        return await queryInterface.removeColumn("Appointments", "PatientId");
      })
      .then(async () => {
        return await queryInterface.removeColumn("Procedures", "PatientId");
      })
      .then(async () => {
        return await queryInterface.removeColumn("Diagnoses", "PatientId");
      })
      .then(async () => {
        return await queryInterface.removeColumn("Rooms", "PatientId");
      })
      .then(async () => {
        return await queryInterface.removeColumn(
          "FinancialStatuses",
          "PatientId"
        );
      })
      .then(async () => {
        return await queryInterface.removeColumn("VisitHistories", "PatientId");
      })
      .then(async () => {
        return await queryInterface.removeColumn("Medications", "DiagnosisId");
      })
      .then(async () => {
        return await queryInterface.removeColumn("Appointments", "DoctorId");
      })
      .then(async () => {
        return await queryInterface.dropTable("DoctorAttended");
      })
      .then(async () => {
        return await queryInterface.removeColumn(
          "VisitHistories",
          "DiagnosisId"
        );
      })
      .then(async () => {
        return await queryInterface.removeColumn("VisitHistories", "RoomId");
      })
      .then(async () => {
        return await queryInterface.removeColumn("PatientVitals", "PatientId");
      });
  },
};
