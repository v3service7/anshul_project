const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


// User Schema
const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  phonenumber: String,
  dob: String,
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  username: { type: String, trim: true, required: true, unique: true },
  password: { type: String, required: true, trim: true },
  email_token: { type: String },
  status: { type: Boolean, default: false },
  role : {type: String, enum: ['Admin', 'User'], default: 'User'},
  created_at: { type: Date, default: Date.now }
});

// Created a model using it
const User = mongoose.model('User', UserSchema);

// make this available to Node applications
module.exports = User;

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username}
  User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) return err;
    callback(null, isMatch);
  });
}