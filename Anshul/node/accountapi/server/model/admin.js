var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
  	firstname: String,
  	lastname: String,
  	custoken:String,
  	username: { type: String, required: true, unique: true },
  	email: { type: String, required: true, unique: true },
  	password: { type: String, required: true },
  	status: { type: Boolean, default: true },
});

var admin = mongoose.model('admin', adminSchema);
module.exports = admin;