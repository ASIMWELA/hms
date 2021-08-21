const jwt = require("jsonwebtoken");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const bcrypt = require("bcrypt");
const { ErrorHandler } = require("../utils/ErrorHandler");

require("dotenv").config();

class AuthController {
  //generating token
  static generateToken = (role) => {
    return jwt.sign({ data: role }, process.env.TOKEN_SECRET, {
      expiresIn: 60 * 60,
    });
  };

  //login
  static login = async (req, res, next) => {
    try {
      const { userName, password } = req.body;

      const patient = await Patient.findOne({
        where: {
          userName,
        },
      });

      // const doctor = await Doctor.findOne({
      //   where: {
      //     email: userName,
      //   },
      // });
      if (patient === null) {
        next(new ErrorHandler(401, "Wrong credentials"));
      }

      const validPassword = bcrypt.compareSync(password, patient.password);

      if (validPassword) {
        const token = this.generateToken(patient.role);
        res.status(200).json({
          token,
          data: patient,
        });
      } else {
        next(new ErrorHandler(401, "Wrong credentials"));
      }
    } catch (err) {
      next(new ErrorHandler(500, err.message));
    }
  };

  //validating token
  static validateToken = (req, res, next) => {
    // Gather the jwt access token from the request header
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if (token == null)
      return res.status(401).json({ message: "Unauthenticated" }); // if there isn't any token
    jwt.verify(token, process.env.TOKEN_SECRET, (err, authData) => {
      if (err) next(new ErrorHandler(403, err.message));
      req.role = authData.data;
      next(); // pass the execution off to whatever request the client intended
    });
  };
  static preAuthorize = (...role) => {
    return (req, res, next) => {
      if (!role.includes(req.role)) {
        next(
          new ErrorHandler(
            403,
            "You do not have permision to permom this action"
          )
        );
      }
      next();
    };
  };
}
const { login, validateToken, preAuthorize } = AuthController;

module.exports = {
  login,
  validateToken,
  preAuthorize,
};
