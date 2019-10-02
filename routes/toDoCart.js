var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); // mongoose
var ExpressJoi = require('express-joi-validator'); // joi  for express valiation
require('../models/toDoCarts');
var token = require('../middleware/webTokentValidate');
var toDoCartModel = mongoose.model('toDoCart');
var Joi = require('joi');
var bodySchema = { // validate schema for req body 
    body: {
        cartTitle: Joi.string(),
        cartBody: Joi.string(),
        cartDate:Joi.date(),
        postedBy:Joi.string(),
        active:Joi.number(),
    }
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//get user To Do lost with user id and return user and webtoken
router.post('/getUserCarts/:token', [token.verifyToken],function(req, res, next) {
  console.log(req.body)
  toDoCartModel.find({ postedBy: req.body.postedBy}, function(err, toDoList) {
      if(err){
          console.log(err);
          return;
      }
        if(toDoList == null){
          console.log("No Carts  Found ")

          res.json([{err:"No Carts  Found "},false]);
      }else {
              console.log(toDoList)
              res.json( toDoList);
          }
  });});
router.post('/addNewCart/:token', [token.verifyToken,ExpressJoi(bodySchema)],function(req, res, next) {
  console.log(req.body)
  var newCart=new toDoCartModel({
        cartTitle:req.body.cartTitle,
        cartBody:req.body.cartBody,
        postedBy:req.body.postedBy,
        active:1,
    });
    newCart.save(function(err,doc){
    if(err) {
        res.json([{err:"No Carts can't be added"},false]);
    }
    else if(doc){
     res.json(doc);
    }
});
});

module.exports = router;
