const Validator = require("../utils/DataValidation");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

const { ErrorHandler } = require("../utils/ErrorHandler");

const Patient = require("../models/Patient");
const Address = require("../models/Address");
const PatientVitals = require("../models/PatientVitals");

module.exports = {
  /*****************************************
   * Save a new Patient
   * ***************************************/
  async savePatient(req, res, next) {
    const saltRounds = 10;

    //generate the salt
    const salt = bcrypt.genSaltSync(saltRounds);
    try {
      //validate using the schema
      const { error, value } = Validator.patientValidation(req.body);

      if (error) {
        next(
          new ErrorHandler(422, "Validation Error: " + error.details[0].message)
        );
      }

      //check if userName or email is already taken
      const patientExists = await Patient.findOne({
        where: {
          [Op.or]: [{ userName: value.userName }, { email: value.email }],
        },
      });

      //check if the new patients name or email already exist in the db
      if (patientExists !== null) {
        next(new ErrorHandler(409, "Username or password already taken"));
      }

      //hash the password
      const hash = bcrypt.hashSync(value.password, saltRounds);

      //override old password with the hashed one
      const newPatient = { ...value, password: hash };

      //save the patient
      await Patient.create(newPatient);

      res.status(201).json({
        success: 1,
        message: "Patient saved succesfully",
      });
    } catch (err) {
      next(new ErrorHandler(500, err.message));
    }
  },

  /*************************************** *
   * Get all the patients
   * **************************************/
  async getAllPatients(req, res, next) {
    try {
      const allPatients = await Patient.findAll({
        attributes: [
          "firstName",
          "lastName",
          "middleName",
          "userName",
          "email",
          "sex",
          "uuid",
          "phoneNumber",
        ],
      });

      patients = {
        patients: allPatients,
      };

      res.json(patients);
    } catch (err) {
      next(new ErrorHandler(500, err.message));
    }
  },

  /*****************************************
   * Get a single Pattient
   ****************************************/
  async getPatient(req, res, next) {
    try {
      const uuid = req.params.uuid;

      const attributesTwo = [
        "firstName",
        "lastName",
        "userName",
        "email",
        "sex",
        "uuid",
        "phoneNumber",
      ];
      const patient = await Patient.findOne({
        where: {
          uuid,
        },
        attributes: attributesTwo,
        include: [
          {
            model: Address,
            attributes: ["homeVillage", "nationality", "homeDistrict"],
          },
          {
            model: PatientVitals,
            attributes: [
              "height",
              "weight",
              "bloodPressure",
              "pulse",
              "respiratoryRate",
              "temperature",
            ],
          },
        ],
      });

      if (patient === null) {
        next(new ErrorHandler(404, "No patient found with uuid" + uuid));
      }

      res.json({
        data: patient,
      });
    } catch (err) {
      next(new ErrorHandler(500, err.message));
    }
  },

  /*****************************************
   * Updating a patient by adding the address details
   **************** *************************/
  async addPatientAddress(req, res, next) {
    try {
      const userName = req.params.userName;

      if (!userName) {
        next(new ErrorHandler(400, "provide user name"));
      }

      const patient = await Patient.findOne({
        where: {
          userName,
        },
      });

      if (patient === null) {
        next(
          new ErrorHandler(404, `No patient found with user name ${userName}`)
        );
      }

      // const {homeVillage, homeDistrict, nationality} = req.body

      //const address = {homeVillage, homeDistrict, nationality}

      const { error, value } = Validator.addressValidator(req.body);

      if (!error) {
        value.PatientId = patient.id;

        await Address.create(value);

        res.status(201).json({
          status: "ok",
          message: "patient address created",
        });
      } else {
        next(
          new ErrorHandler(422, "Validation Error: " + error.details[0].message)
        );
      }
    } catch (err) {
      next(new ErrorHandler(500, err.message));
    }
  },

  /****************************************************
   * Record Patient Vitals
   ****************************************************/
  async addPatientVitals(req, res, next) {
    try {
      const userName = req.params.userName;

      if (!userName) {
        next(new ErrorHandler(400, "Provide the name for the user"));
      }

      const patient = await Patient.findOne({
        where: {
          userName,
        },
      });

      //const{height, weight, temperature, bloodPressure, pulse, respiratoryRate} = req.body
      if (!patient) {
        next(
          new ErrorHandler(
            404,
            "No patient record found with the userName provided"
          )
        );
      }

      const { error, value } = Validator.patientVitalsValidator(req.body);

      if (!error) {
        value.PatientId = patient.id;

        await PatientVitals.create(value);

        res.status(201).json({
          success: true,
          message: "patient Vitals created",
        });
      } else {
        next(
          new ErrorHandler(422, "Validation Error: " + error.details[0].message)
        );
      }
    } catch (err) {
      next(new ErrorHandler(500, err.message));
    }
  },

  async scheduleAnAppointment(req, res, next) {
    try {
      const { patientName } = req.params.patientName;

      if (!patientName) {
        next(new ErrorHandler(404, "No patient with the given Name"));
      }
    } catch (err) {
      console.log(err.response);
    }
  },
};
