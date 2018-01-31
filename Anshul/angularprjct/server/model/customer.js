var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
    firstname: String,
    lastname: String,
    phonenumber: String,
    dob: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email_token: { type: String },
    status: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

var customer = mongoose.model('customer', customerSchema);
module.exports = customer;