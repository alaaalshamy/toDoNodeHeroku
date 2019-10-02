
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var user = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    email: String,
    password: String,
});
//Register Model..
mongoose.model("user",user);

 

