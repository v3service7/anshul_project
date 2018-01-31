var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var staffSchema = new Schema({
  	firstname: String,
  	lastname: String,
  	phonenumber: String,
  	qualification:String,
  	percentage:String,
  	dob: String,
  	email: { type: String, required: true, unique: true },
  	password: { type: String, required: true },
  	status: { type: Boolean, default: true },
});

var staff = mongoose.model('staff', staffSchema);
module.exports = staff;