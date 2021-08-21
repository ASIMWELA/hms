const Joi = require("joi");

class Validator {
  static patientValidation = (patientData) => {
    const schema = Joi.object({
      userName: Joi.string().required(),

      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      email: Joi.string().email().required(),
      lastName: Joi.string().min(4).required(),
      firstName: Joi.string().required(),
      role: Joi.string().required(),
      sex: Joi.string().required(),
      dateOfBirth: Joi.date().required(),
      phoneNumber: Joi.string().min(8).required(),
      middleName: Joi.string(),
    });

    return schema.validate(patientData);
  };

  static addressValidator = (address) => {
    const schema = Joi.object({
      homeVillage: Joi.string().required(),
      homeDistrict: Joi.string().required(),
      nationality: Joi.string().required(),
    });
    return schema.validate(address);
  };

  static patientVitalsValidator = (patientVitals) => {
    const schema = Joi.object({
      height: Joi.number().required(),
      weight: Joi.number().required(),
      temperature: Joi.number().required(),
      bloodPressure: Joi.string().required(),
      pulse: Joi.string().required(),
      respiratoryRate: Joi.number().required(),
    });

    return schema.validate(patientVitals);
  };
}

module.exports = Validator;
