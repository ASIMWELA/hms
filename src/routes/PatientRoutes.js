const express = require("express");

const PatientController = require("../controllers/PatientController");

const {
  validateToken,
  preAuthorize,
} = require("../controllers/AuthController");
const { PATIENT, ADMIN } = require("../utils/roles");

const router = express.Router();

//get single patient details
router.get("/:uuid", PatientController.getPatient);

//get all patients
router.get(
  "/",
  validateToken,
  preAuthorize(ADMIN, PATIENT),
  PatientController.getAllPatients
);

//add a patient
router.post("/", PatientController.savePatient);

//record patient address
router.put("/:userName/address", PatientController.addPatientAddress);

//record patient vitals
router.put("/:userName/vitals", PatientController.addPatientVitals);

module.exports = router;
