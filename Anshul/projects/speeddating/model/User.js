var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
  firstname: String,
  lastname: String,
  gender: String,
  username: { type: String, required: true, unique: true },
  age: String,
  phone: Number,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: Boolean, default: true },
  created_at: Date,
  updated_at: Date
});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', userSchema);

module.exports = User;