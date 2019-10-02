
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var toDoCart = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    cartTitle:String,
    cartBody: String,
    cartDate:{type:Date ,default: Date.now},
    postedBy:   [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user'}],
    active:Number,
});
//Register Model..
mongoose.model("toDoCart",toDoCart);

 

