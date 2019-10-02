var express = require('express');
var mongoose = require('mongoose'); // mongoose
var jwt = require('jsonwebtoken');// for  web token 
var router = express.Router();
var ExpressJoi = require('express-joi-validator'); // joi  for express valiation
require('../models/userModel');
var UserModel = mongoose.model('user');
var Joi = require('joi');
var bodySchema = { // validate schema for req body 
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required()
    }
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//get user with mail and return user and webtoken
router.post('/login', ExpressJoi(bodySchema),function(req, res, next) {
  console.log(req.body)
  UserModel.findOne({ email: req.body.email}, function(err, user) {
      if(err){
          console.log(err);
          return;
      }
      if(user == null){
          res.json({err:"Email Not Found",status:false});
      }else {
          if(req.body.password === user.password)
          {
              const jsontoken = jwt.sign({user: user},'userSecret-key');
              res.json({ user: user, token:jsontoken ,status:true});
          }else {
            res.json({err:"password not valid",status:false});
          }
      }
  });
});

router.post('/addUser', ExpressJoi(bodySchema),function(req, res, next) {
  console.log(req.body)
  var newUser=new UserModel({
   
    email:req.body.email,
    password:req.body.password,

    });
    newUser.save(function(err,doc){
 if(err) 
 res.json(err);

 res.json(doc);
})    
});

module.exports = router;
