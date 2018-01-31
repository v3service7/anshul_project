var mongoose = require('mongoose');
var Schema = mongoose.Schema;
StateSchema = require('../model/State.js');
WeaponSchema = require('../model/Weapon.js');

// create a schema
var CcwsSchema = new Schema({
    ccwNumber:String,
    state:{ type: Schema.Types.ObjectId, ref: 'State' },
    issuingAgency:String,
    issueDate:String,
    expirationDate:String,
    notes:String,
    weapons:[{ type: Schema.Types.ObjectId, ref: 'Weapon' }]


});

var Ccws = mongoose.model('Ccws', CcwsSchema);

module.exports = Ccws;