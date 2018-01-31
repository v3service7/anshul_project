var mongoose = require('mongoose');
var Schema = mongoose.Schema;
StateSchema = require('../model/State.js');

// create a schema
var GuardcardSchema = new Schema({
    guardCardNumber  : String,
    expirationDate:  String,
    state:  { type: Schema.Types.ObjectId, ref: 'State' }
});

var Guardcard = mongoose.model('Guardcard', GuardcardSchema);

module.exports = Guardcard;