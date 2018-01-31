var mongoose = require('mongoose');
var Schema = mongoose.Schema;
StateSchema = require('../model/State.js');

// create a schema
var ExposedpermitSchema = new Schema({
    permitNumber  : String,
    state:  { type: Schema.Types.ObjectId, ref: 'State' },
    expirationDate:  String,
    calibers  : String,
    notes  : String
});

var Exposedpermit = mongoose.model('Exposedpermit', ExposedpermitSchema);

module.exports = Exposedpermit;