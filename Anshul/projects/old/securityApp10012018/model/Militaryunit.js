var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var MilitaryunitSchema = new Schema({
	__v: {type: Number, select: false},
    unitName: { type: String, trim: true, required: true, unique: true },
    timestamp: { type: Number}
});

var Militaryunit = mongoose.model('Militaryunit', MilitaryunitSchema);

module.exports = Militaryunit;