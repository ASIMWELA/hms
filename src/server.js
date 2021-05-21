const express = require('express');
const app = express();
const   { handleError } = require('./utils/ErrorHandler')
require('dotenv').config();

//import routes
const PatientRoutes = require('./routes/PatientRoutes')
const AuthRoutes = require('./routes/AuthRoutes')

//get middlewares
const logger = require("morgan")
const helmet = require("helmet")

//use middlewares
app.use(logger("common"))
app.use(helmet())
app.use(express.json())


//use routes

app.use('/api/patients', PatientRoutes)
app.use('/api/auth', AuthRoutes)


//error handling
app.use((err, req, res, next) => {
    handleError(err, res);
  });


app.listen(process.env.PORT, ()=>{
    console.log(`Server listening on port ${process.env.PORT}`)
});