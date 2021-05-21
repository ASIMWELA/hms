const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient')
const bcrypt = require('bcrypt');
const{ErrorHandler} = require('../utils/ErrorHandler')

require('dotenv').config();

module.exports={
  
    //login
    async login(req, res, next){
        try{
         const{userName, password} = req.body
     
         const patient =  await Patient.findOne({
               where:{
                   userName
               }
           });
       
           if(patient === null){
               next(new ErrorHandler(401, 'Wrong credentials'))
           }
       
          const validPassword =  bcrypt.compareSync(password, patient.password);
       
          if(validPassword){
               const token = this.generateToken(patient.userName)
               res.status(200).json({
                   token,
                   data:patient
               });
          }else{
              next(new ErrorHandler(401, "Wrong credentials"))
          }
       
        }catch(err){
            next(new ErrorHandler(500, err.message))
        }
     },


     //generating token
      generateToken(userName){
        return jwt.sign({data:userName}, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 })
    },

    //validating token
     validateToken(req, res, next){
        // Gather the jwt access token from the request header
        const authHeader = req.headers['authorization']
      
        const token = authHeader && authHeader.split(' ')[1]
        
        if (token == null) return res.status(401).json({'message':'Unauthenticated'}) // if there isn't any token
      
        jwt.verify(token, process.env.TOKEN_SECRET , (err, user) => {
          
          if (err) next(new ErrorHandler(403, err.message))
         
          req.userName = user
         
          next() // pass the execution off to whatever request the client intended
        })
      }


}